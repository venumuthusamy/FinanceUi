import { Component, HostListener, OnInit } from '@angular/core';
import { PurchaseRequisitionService } from './purchase-requisition.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/masters/department/department/departmet-service';
import { ItemService } from 'src/app/masters/item/item-service';
import { ChartOfAccountService } from 'src/app/financial/coa/coa-service';
import { UomService } from 'src/app/masters/uom/uom/uom-service';
import { LocationService } from 'src/app/masters/location/location-service';

@Component({
  selector: 'app-purchase-requisition',
  templateUrl: './purchase-requisition.component.html',
  styleUrls: ['./purchase-requisition.component.css']
})
export class PurchaseRequisitionComponent implements OnInit {
  prStep = 0;
  prSteps = ['Header', 'Lines', 'Review'];

  hover = false;
  selectedRequest: any = null;
  showEditForm: boolean = false;
selectedDepartmentID: string = ''; // binds to the dropdown
allPurchaseRequests: any[] = [];   // store all PRs

  prHeader: any = {
    requester: '',
    departmentID: 0,
    neededBy: null,
    description: '',
    multiLoc: false,
    oversea: false
  };

  prLines: any[] = [];
 


  purchaseRequests: any[] = []; // List to display from API
isEditMode = false;
departments: any[] = [];

activeDropdown: string | null = null;
dropdownOpen = false;
searchText: string = '';
filteredDepartments = [...this.departments];
parentHeadList:any;
accountHeads: any;
 itemsList : any = []
 uomList : any = []
public prid:any;
  locationList: any;
  minDate: string = '';
  constructor(private purchaseService: PurchaseRequisitionService,private router: Router,private route:ActivatedRoute,
    private deptService: DepartmentService,
  private itemService : ItemService,
private chartOfAccountService : ChartOfAccountService,
private uomService: UomService,
private locationService : LocationService) {}
 @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
 
    // if the click is NOT inside the main wrapper (div.relative)
    if (!target.closest('.relative')) {
      this.dropdownOpen = false;
    }
  }
 gridColsClass(cols: number) {
    return {
      'grid grid-cols-1 gap-3': true,
      'md:grid-cols-1': cols === 1,
      'md:grid-cols-2': cols === 2,
      'md:grid-cols-3': cols === 3,
      'md:grid-cols-4': cols === 4,
      'md:grid-cols-5': cols === 5,
      'md:grid-cols-6': cols === 6,
    };
  }
    badgeClass(color: string) {
    return `px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`;
  }
  ngOnInit() {
    this.mindate();
    this.loadRequests();
    this.loadDepartments();
    this.loadItems();
    this.loadUom();
    this.loadLocation();
  this.filteredDepartments = [...this.departments];
  this.route.paramMap.subscribe((params:any)=>{
    this.prid=parseInt(params.get('id'));
    if(this.prid){
      this.isEditMode = true;
      this.purchaseService.GetPurchaseById(this.prid).subscribe((data:any)=>{
       this.editRequest(data);
      this.prStep = 0;
      })
    }
  })
}
loadDepartments() {
  this.deptService.getDepartment().subscribe((data: any) => {
    this.departments = data;           // full list
    this.filteredDepartments = data;   // initialize filtered list
  });
}
 
    loadItems() {
  this.chartOfAccountService.getChartOfAccount().subscribe((data) => {
    this.accountHeads = data;
    this.parentHeadList = this.accountHeads.map((head:any)=> ({
      value: head.id,
      label: this.buildFullPath(head)
    }));
    this.itemService.getItem().subscribe((data :any) => {
            this.itemsList = data
            this.itemsList = this.itemsList.map((item: any) => {
            const matched = this.parentHeadList.find(
              (head: any) => head.value == item.budgetLineId
            );

            return {
              ...item,
              label: matched ? matched.label : null   // add the label if found
            };
          });
         
    });  
    
  });
  }
   loadUom() {
    debugger
    this.uomService.getUom().subscribe((data :any) => {
            this.uomList = data
            console.log("uom",this.uomList)
      });
     
  }
  loadLocation(){
     this.locationService.getLocation().subscribe((data :any) => {
            this.locationList = data
    }); 
    console.log("locationlist",this.locationList)
  }
   buildFullPath(item:any): string {
    let path = item.headName;
    let current = this.accountHeads.find((x:any) => x.id === item.parentHead);
    while (current) {
      path = `${current.headName} >> ${path}`;
      current = this.accountHeads.find((x:any) => x.id === current.parentHead);
    }
    return path;
  }
prAddLine() {
  this.prLines.push({
    // Standard fields
    item: '',
    qty: 0,
    uom: '',
    location: '',
    budget: '',
    remarks: '',

    
  });
}



  // ➤ Remove a line
  prRemoveLine(index: number) {
    this.prLines.splice(index, 1);
  }

  // ➤ Navigate between steps
  prGo(step: number) {
    this.prStep += step;
  }

  // ➤ TrackBy for ngFor
  trackByIndex(index: number): number {
    return index;
  }
mindate(){
   const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0!
    const dd = String(today.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`;
}
  // ➤ Create new PR
 saveRequest() {
  const payload = {
    requester: this.prHeader.requester,
    departmentID: this.prHeader.departmentID,
    deliveryDate: this.prHeader.neededBy,
    description: this.prHeader.description,
    multiLoc: this.prHeader.multiLoc,
    oversea: this.prHeader.oversea,
    PurchaseRequestNo :"",
    prLines: JSON.stringify(this.prLines)
  };

  if (this.prHeader.id && this.prHeader.id > 0) {
    // 🔹 Update request
    this.purchaseService.update(this.prHeader.id, payload).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          text: res.message || 'Purchase request updated successfully.',
          confirmButtonColor: '#0e3a4c'
        });
        this.loadRequests();
        this.resetForm();
         this.router.navigateByUrl(`/purchases/PRList`)
      },
      error: (err: any) => {
        console.error('Error updating request', err);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Error while updating purchase request.',
          confirmButtonColor: '#d33'
        });
      }
    });
  } else {
    // 🔹 Create request
    this.purchaseService.create(payload).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Created',
          text: res.message || 'Your purchase request has been created.',
          confirmButtonColor: '#0e3a4c'
        });
        this.loadRequests();
        this.resetForm();
        this.router.navigateByUrl(`/purchases/PRList`)
      },
      error: (err: any) => {
        console.error('Error saving request', err);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Error while saving purchase request.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}


  // ➤ Load all PRs
  loadRequests() {
    this.purchaseService.getAll().subscribe({
      next: (res: any) => {
        this.purchaseRequests = res.data.map((req: any) => {
          return {
            ...req,
            prLines: req.prLines ? JSON.parse(req.prLines) : []
          };
        });
      },
      error: (err: any) => console.error('Error loading list', err)
    });
  }

  // ➤ Reset form after create
  resetForm() {
  // Reset header
  this.prHeader = {
    requester: '',
    departmentID: 0,   // reset ID
    neededBy: null,
    description: '',
    multiLoc: false,
    oversea: false
  };

  // Reset department input and dropdown
  this.searchText = '';         // clear input field
  this.filteredDepartments = []; // clear filtered list
  this.dropdownOpen = false;    // close dropdown

  // Reset lines and step
  this.prLines = [];
  this.prStep = 0;
}


editRequest(res: any) {
  const data = res.data;

  this.prHeader = {
    id: data.id,
    requester: data.requester,
    departmentID: data.departmentID,
    neededBy: data.deliveryDate ? data.deliveryDate.split('T')[0] : null,
    description: data.description,
    multiLoc: data.multiLoc,
    oversea: data.oversea,
    purchaseRequestNo: data.purchaseRequestNo
  };

  // Set department name for UI
  this.searchText = this.departments.find(d => d.id === data.departmentID)?.departmentName || '';

  // Parse prLines
  this.prLines = data.prLines ? JSON.parse(data.prLines) : [];
}


  // ➤ Update PR
  updateRequest() {
    if (!this.selectedRequest) return;

    this.purchaseService.update(this.selectedRequest.id, this.selectedRequest).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          text: 'Purchase request updated successfully.',
          confirmButtonColor: '#0e3a4c'
        });
        this.loadRequests();
        this.showEditForm = false;
        this.selectedRequest = null;
      },
      error: (err) => console.error('Error updating request', err)
    });
  }

  // ➤ Delete PR
  deleteRequest(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the purchase request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.purchaseService.delete(id).subscribe({
          next: () => {
            this.loadRequests();
            Swal.fire('Deleted!', 'Purchase request has been deleted.', 'success');
          },
          error: (err) => console.error('Error deleting request', err)
        });
      }
    });
  }
  toggleLines(req: any) {
  // Toggle showLines only for the clicked PR
  req.showLines = !req.showLines;
}

filterDepartments() {
  const query = this.searchText.toLowerCase();
  this.filteredDepartments = this.departments.filter(d =>
    d.departmentName.toLowerCase().includes(query)
  );
}
toggleDropdown(force?: boolean) {
  this.dropdownOpen = force !== undefined ? force : !this.dropdownOpen;
}

selectDepartment(dept: any) {
  this.prHeader.departmentID = dept.id;
  this.searchText = dept.departmentName;
  this.dropdownOpen = false;
}

onItemFocus(i: number) {
  this.prLines[i].dropdownOpen = true;
  this.prLines[i].filteredItems = [...this.itemsList]; // show all
}

filterItems(i: number) {
  const query = this.prLines[i].itemSearch.toLowerCase();
  this.prLines[i].filteredItems = this.itemsList.filter(
    (item:any) =>
      item.itemName.toLowerCase().includes(query) ||
      item.itemCode.toLowerCase().includes(query)
  );
}

selectItem(index: number, item: any) {
  // Set item name & code
  this.prLines[index].itemSearch = item.itemName;
  this.prLines[index].itemName = item.itemName;
  this.prLines[index].itemCode = item.itemCode;

  // Auto-fill UOM
  this.prLines[index].uom = item.uomName;        // save for backend
  this.prLines[index].uomSearch = item.uomName;  // show in input

  // Auto-fill Budget Line
  this.prLines[index].budget = item.label || ''; 

  // Close dropdown
  this.prLines[index].dropdownOpen = false;
}


// Open dropdown
onLocationFocus(index: number) {
  this.prLines[index].filteredLocations = [...this.locationList];
  this.prLines[index].locationDropdownOpen = true;
}

// Filter locations by name
filterLocations(index: number) {
  const search = this.prLines[index].locationSearch?.toLowerCase() || '';
  this.prLines[index].filteredLocations = this.locationList.filter(
    (loc: any) => loc.name.toLowerCase().includes(search)
  );
  this.prLines[index].locationDropdownOpen = true; // keep dropdown open
}

// Select location
selectLocation(index: number, location: any) {
  this.prLines[index].locationSearch = location.name; // show in input
  this.prLines[index].location = location.name;         // save ID to model
  this.prLines[index].locationDropdownOpen = false;   // close dropdown
}

onUomFocus(index: number) {
  this.prLines[index].filteredUoms = [...this.uomList]; // all UOMs
  this.prLines[index].uomDropdownOpen = true;
}

filterUoms(index: number) {
  const search = this.prLines[index].uomSearch?.toLowerCase() || '';
  this.prLines[index].filteredUoms = this.uomList.filter((u: any) =>
    u.name.toLowerCase().includes(search)
  );
}

selectUom(index: number, uom: any) {
  this.prLines[index].uom = uom.name;       // ✅ save the name (string only)
  this.prLines[index].uomSearch = uom.name; // ✅ also show in input field
  this.prLines[index].uomDropdownOpen = false;
}


}
