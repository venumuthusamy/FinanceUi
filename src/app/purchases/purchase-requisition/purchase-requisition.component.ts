import { Component, OnInit } from '@angular/core';
import { PurchaseRequisitionService } from './purchase-requisition.service';
import Swal from 'sweetalert2';

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
 uomList = ['KG', 'Litre', 'Piece', 'Box', 'Pack'];
  prHeader: any = {
    requester: '',
    departmentID: 0,
    neededBy: null,
    description: '',
    multiLoc: false,
    oversea: false
  };

  prLines: any[] = [];
 
  locationList = ['Warehouse 1', 'Warehouse 2']; // demo

  purchaseRequests: any[] = []; // List to display from API
isEditMode = false;
departments = [
  { id: 1, name: 'Operations' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'HR' },
  { id: 4, name: 'IT' }
];
itemsList: string[] = [
  "Laptop",
  "Monitor",
  "Keyboard",
  "Mouse",
  "Printer"
];

dropdownOpen = false;
searchText: string = '';
filteredDepartments = [...this.departments];

  constructor(private purchaseService: PurchaseRequisitionService) {}
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
  ngOnInit(): void {
    this.loadRequests();
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


 editRequest(id: number) {
  debugger
  const req = this.purchaseRequests.find((r: any) => r.id === id);

  if (req) {
    this.prHeader = {
      id: req.id, // keep id to detect update
      requester: req.requester,
      departmentID: req.departmentID,
      neededBy: req.deliveryDate ? req.deliveryDate.split('T')[0] : null,
      description: req.description,
      multiLoc: req.multiLoc,
      oversea: req.oversea,
    };

    this.prLines = [...req.prLines]; // load existing lines
  }
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
    d.name.toLowerCase().includes(query)
  );
}

toggleDropdown(force?: boolean) {
  this.dropdownOpen = force !== undefined ? force : !this.dropdownOpen;
}

selectDepartment(dept: any) {
  this.searchText = dept.name;       // show name in input
  this.prHeader.departmentID = dept.id; // save ID for payload
  this.dropdownOpen = false;         // close dropdown
}

onItemFocus(index: number) {
  this.prLines[index].filteredItems = [...this.itemsList]; // copy full list
  this.prLines[index].dropdownOpen = true;
}
filterItems(index: number) {
  const search = this.prLines[index].itemSearch?.toLowerCase() || '';
  this.prLines[index].filteredItems = this.itemsList.filter(item =>
    item.toLowerCase().includes(search)
  );
}
onLocationFocus(index: number) {
  this.prLines[index].filteredLocations = [...this.locationList]; // copy full list
  this.prLines[index].locationDropdownOpen = true;
}
selectItem(index: number, item: string) {
  this.prLines[index].itemSearch = item;
  this.prLines[index].item = item;
  this.prLines[index].filteredItems = [];
  this.prLines[index].dropdownOpen = false;
}

// Filter locations based on search input
filterLocations(index: number) {
  const search = this.prLines[index].locationSearch?.toLowerCase() || '';
  this.prLines[index].filteredLocations = this.locationList.filter(loc =>
    loc.toLowerCase().includes(search)
  );
}

// Select a location from the dropdown
selectLocation(index: number, location: string) {
  this.prLines[index].locationSearch = location;   // display selected location
  this.prLines[index].location = location;         // save in your model
  this.prLines[index].filteredLocations = [];      // hide dropdown
}
onUomFocus(index: number) {
  this.prLines[index].filteredUoms = [...this.uomList];
  this.prLines[index].uomDropdownOpen = true;
}

// Filter UOM as user types
filterUoms(index: number) {
  const search = this.prLines[index].uomSearch?.toLowerCase() || '';
  this.prLines[index].filteredUoms = this.uomList.filter(u =>
    u.toLowerCase().includes(search)
  );
}

// Select UOM
selectUom(index: number, uom: string) {
  this.prLines[index].uomSearch = uom; // show in input
  this.prLines[index].uom = uom;       // save in model
  this.prLines[index].uomDropdownOpen = false; // close dropdown
}
}
