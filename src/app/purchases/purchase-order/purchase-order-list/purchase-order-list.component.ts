import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PurchaseOrderService } from '../purchase-order-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PurchaseOrderListComponent {


  purchaseOrder: any[] = [];

  poLines: any[] = [];
  hover = false;
  constructor(private purchaseOrderService: PurchaseOrderService, private router: Router,
    private confirmationService: ConfirmationService,
    private toast: ToastService,
  ) { }
  ngOnInit(): void {
    this.loadRequests();
  }
  loadRequests() {
    this.purchaseOrderService.getPurchaseOrder().subscribe({
      next: (res: any) => {
        this.purchaseOrder = res.map((req: any) => {
          return {
            ...req,
            poLines: req.poLines ? JSON.parse(req.poLines) : []
          };
        });
      },
      error: (err: any) => this.toast.showApiError(err)
    });
  }

  editPO(id: any) {
    this.router.navigateByUrl(`/purchases/order/edit/${id}`)
  }

  createPage() {
    this.router.navigate(['/purchases/order/create']);
  }

  deletePO(id: number) {
    this.purchaseOrderService.deletePurchaseOrder(id).subscribe({
          next: () => {
            this.loadRequests();
            this.toast.showSuccess('Purchase Order deleted successfully')
          },
          error: (err) => this.toast.showApiError(err)
        });
  }
  toggleLines(req: any) {
    req.showLines = !req.showLines;
  }
  confirmdeletePurchases(item:any) {
    debugger
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deletePO(item);
          },
          reject: () => {
          }
        });
  }
}





