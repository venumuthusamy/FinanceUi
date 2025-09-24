import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseGoodreceiptServiceService } from '../purchase-goodreceipt-service.service';

@Component({
  selector: 'app-purchase-goodreceiptlist',
  templateUrl: './purchase-goodreceiptlist.component.html',
  styleUrls: ['./purchase-goodreceiptlist.component.css']
})
export class PurchaseGoodreceiptlistComponent {
 hover: boolean = false;
  purchaseRequests: any[] = []; 
    selectedImage: string | null = null;
  showImageModal = false;
constructor(private router: Router,private purchaseGoodReceiptService: PurchaseGoodreceiptServiceService)
{

}


  goToRequisition() {
  this.router.navigate(['/purchases/addreceipt']);
}

  loadRequests() {
    this.purchaseGoodReceiptService.getAll().subscribe({
      next: (res: any) => {
        this.purchaseRequests = res.map((req: any) => ({
          ...req,
          grn: req.grnJson ? JSON.parse(req.grnJson) : [],
        }));
      },
      error: (err: any) => console.error('Error loading list', err),
    });
    console.log("purchaserequest",this.purchaseRequests)
  }

    openImageModal(image: string) {
    this.selectedImage = image;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
    this.selectedImage = null;
  }


   ngOnInit() {
this.loadRequests();
  }

}
