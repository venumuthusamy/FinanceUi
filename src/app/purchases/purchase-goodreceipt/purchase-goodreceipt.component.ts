import { Component, ViewChild } from '@angular/core';
import { PurchaseGoodreceiptServiceService } from './purchase-goodreceipt-service.service';
import Swal from 'sweetalert2';
import SignaturePad from 'signature_pad';
import { FlagIssuesService } from 'src/app/masters/flag-issues/flag-issues.service';

type LineRow = {
   item: string | null;
  supplier: string | null;
  storageType: string;    // Frozen / Chilled / Dry
  surfaceTemp: string;
  expiry: string;         // Date string
  pestSign: string;       // Yes / No
  drySpillage: string;
  odor: string;
  plateNumber: string;
  defectLabels: string;
  damagedPackage: string;
  time: string;
  initial: string;
  remarks: string;
  createdAt: Date;
  photos: File[];

};

@Component({
  selector: 'app-purchase-goodreceipt',
  templateUrl: './purchase-goodreceipt.component.html',
  styleUrls: ['./purchase-goodreceipt.component.css']
})
export class PurchaseGoodreceiptComponent {
  hover = false;
 showInitialModal = false;
  selectedRow: any;
  activeTab: 'image' | 'signature' = 'image';
  uploadedImage: string | ArrayBuffer | null = null;
  isFlagModalOpen = false;
  selectedReason: string = '';
isPostInventoryDisabled = false;
  @ViewChild('signaturePad') signaturePadElement: any;
  signaturePad!: SignaturePad;
  selectedPO: number | null = null;
  receiptDate: string = '';
  overReceiptTolerance: number = 0;
    grnRows: LineRow[] = [
    {
      item: null,
      supplier: null,
      storageType: '',
      surfaceTemp: '',
      expiry: '',
      pestSign: '',
      drySpillage: '',
      odor: '',
      plateNumber: '',
      defectLabels: '',
      damagedPackage: '',
      time: '',
      initial: '',
      remarks: '',
      createdAt: new Date(),
      photos: []
    }
  ];

items = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' }
];
  poOptions = [
    { id: 1001 },
    { id: 1002 },
    { id: 1003 },
    { id: 1004 }
  ];
suppliers = [
  { id: 1, name: 'Supplier A' },
  { id: 2, name: 'Supplier B' }
];
  purchaseRequests: any;
  flagIssuesList: any;
constructor(private purchaseGoodReceiptService: PurchaseGoodreceiptServiceService,
  private flagIssuesService: FlagIssuesService
){

}

  ngOnInit() {
    this.loadFlagIssues();
  }

  // Add a new line with all fields initialized

saveGRN() {
  if (!this.selectedPO) {
    alert('Please select a PO.');
    return;
  }

  const grnToSave = {
    poid: this.selectedPO, // selected PO ID
    receptionDate: this.receiptDate ? new Date(this.receiptDate) : new Date(),
    overReceiptTolerance: this.overReceiptTolerance,
    grnJson: JSON.stringify(this.grnRows),
    flagIssuesID: 0
  };

  this.purchaseGoodReceiptService.create(grnToSave).subscribe({
  next: (res) => {
    Swal.fire({
      icon: 'success',
      title: 'Created',
      text: res.message || 'Your purchase GoodReceipts has been created.',
      confirmButtonColor: '#0e3a4c'
    });
    this.resetForm()
  },
  error: (err) => console.error('Save failed', err)
});

}

  openFlagModal() {
    this.isFlagModalOpen = true;
  }

  closeFlagModal() {
    this.isFlagModalOpen = false;
  }
  

 loadFlagIssues() {
  this.flagIssuesService.getFlagIssues().subscribe((data: any[]) => {
    // Only keep active issues
    this.flagIssuesList = data.filter(issue => issue.isActive === true);
  });
}


 submitFlag() {
  if (!this.selectedReason) {
    alert('Please select a reason.');
    return;
  }

  const grnToSave = {
    poid: this.selectedPO, // selected PO ID
    receptionDate: this.receiptDate ? new Date(this.receiptDate) : new Date(),
    overReceiptTolerance: this.overReceiptTolerance,
    grnJson: "",                // ✅ send as empty
    flagIssuesID: this.selectedReason
  };

  this.purchaseGoodReceiptService.create(grnToSave).subscribe({
    next: (res) => {
      Swal.fire({
        icon: 'success',
        title: 'Created',
        text: res.message || 'Flag Issue has been created.',
        confirmButtonColor: '#0e3a4c'
      });
      this.resetForm();
    },
    error: (err) => console.error('Save failed', err)
  });

  this.closeFlagModal();
}

 openInitialModal(row: any) {
    this.selectedRow = row;
    this.activeTab = 'image';
    this.uploadedImage = row.imageUrl || null;
    this.showInitialModal = true;

    setTimeout(() => {
      if (this.signaturePadElement) {
        this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
      }
    });
  }

  
  switchTab(tab: 'image' | 'signature') {
    this.activeTab = tab;
    if (tab === 'signature') {
      setTimeout(() => {
        if (this.signaturePadElement) {
          this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
        }
      });
    }
  }

  
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
    reader.onload = e => {
  this.uploadedImage = e.target?.result ?? null; // fallback to null if undefined
};

      reader.readAsDataURL(file);
    }
  }

  clearSignature() {
    if (this.signaturePad) this.signaturePad.clear();
  }

saveSignature() {
  if (this.signaturePad && !this.signaturePad.isEmpty()) {
    const dataURL = this.signaturePad.toDataURL();
    // Store signature in grnRows[0].initial
    this.grnRows[0].initial = dataURL;
    this.showInitialModal = false;
  } else {
    alert('Please provide a signature first.');
  }
}

saveImage() {
  if (this.uploadedImage) {
    if (typeof this.uploadedImage === 'string') {
      this.grnRows[0].initial = this.uploadedImage; // safe
      this.showInitialModal = false;
    } else {
      console.error('Uploaded file is not a string');
      alert('Error: Invalid image format.');
    }
  } else {
    alert('Please select an image first.');
  }
}


resetForm() {
  this.selectedPO = null;
  this.receiptDate = '';
  this.overReceiptTolerance = 0;

  this.grnRows = [
    {
      item: null,
      supplier: null,
      storageType: '',
      surfaceTemp: '',
      expiry: '',
      pestSign: '',
      drySpillage: '',
      odor: '',
      plateNumber: '',
      defectLabels: '',
      damagedPackage: '',
      time: '',
      initial: '',
      remarks: '',
      createdAt: new Date(),
      photos: []
    }
  ];
}

  // Remove a line by index
  grnRemoveRow(i: number) {
    this.grnRows = this.grnRows.filter((_, idx) => idx !== i);
  }
  // Simple notification alert
  notify(msg: string) {
    alert(msg);
  }

  

  // TrackBy function for ngFor
  trackByIndex = (i: number, _: any) => i;




}
