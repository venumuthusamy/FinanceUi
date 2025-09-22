import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { PurchaseRequisitionService } from '../purchase-requisition.service';
import { PurchaseRequisitionComponent } from '../purchase-requisition.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchse-requisition-list',
  templateUrl: './purchse-requisition-list.component.html',
  styleUrls: ['./purchse-requisition-list.component.css']
})
export class PurchseRequisitionListComponent {
 @ViewChild(PurchaseRequisitionComponent) purchaseForm?: PurchaseRequisitionComponent;

    purchaseRequests: any[] = []; 
      prHeader: any = {
    requester: '',
    departmentID: 0,
    neededBy: null,
    description: '',
    multiLoc: false,
    oversea: false
  };
  prLines: any[] = [];
  hover = false;
  constructor(private purchaseService: PurchaseRequisitionService, private router: Router,) {}
   ngOnInit(): void {
    this.loadRequests();
  }
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
// editRequest(req: any) {
//   this.router.navigate(['/purchases/requisition'], { state: { request: req } });
// }

editRequest(id:any){
  this.router.navigateByUrl(`/purchases/requisition/edit/${id}`)
}

goToRequisition() {
  this.router.navigate(['/purchases/requisition']);
}

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
}
