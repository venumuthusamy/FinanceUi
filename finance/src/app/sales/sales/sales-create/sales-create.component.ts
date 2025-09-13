import { Component} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesInnerService } from '../sales.service';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CustomerService } from 'src/app/Business Partners/customer/customer-service';
import { TaxServices } from 'src/app/masters/services/service-service';


@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.css'],
  providers: [DatePipe] 
})
export class SalesCreateComponent {

  addForm!: FormGroup;
  lineItemForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  formattedDate: any;
  isEditMode = false;
  saleId: any;
  customerList :any
  paymentAccountList: any
  gstList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private salesInnerService: SalesInnerService,
    private datePipe: DatePipe,
    private toast: ToastService,
    private route: ActivatedRoute,
    private customerService : CustomerService,
    private taxServices : TaxServices,
  ) {
  
  }

  ngOnInit() {
      this.taxServices.getServices().subscribe((data :any) => {
            this.gstList = data
      });
      this.customerService.getCustomer().subscribe((data :any) => {
            this.customerList = data
      });  
      this.paymentAccountList = [
        { id: 1, name: 'Credit Payment' },
        { id: 2, name: 'Debit Payment' },
        ];   
      this.route.paramMap.subscribe((params :any)=> {
        this.saleId = parseInt(params.get('id'));
        if (this.saleId) {
          this.isEditMode = true;
          this.salesInnerService.getSalesById(this.saleId).subscribe((data :any) => {
          
            this.addForm = this.fb.group({
              customerId: [data.customerId, Validators.required],
              date: [this.datePipe.transform(new Date(data.date), 'dd-MM-yyyy'), Validators.required],
              paymentAccount: [data.paymentAccount, Validators.required],
              grandTotal:  [{ value: data.grandTotal, disabled: true }],
              discount: [data.discount, Validators.required],
              totalDiscount: [{ value: data.totalDiscount, disabled: true }],
              noTax: [0],
              gstPercentage: [data.gstPercentage],
              gst: [data.gst],
              totalTax: [{ value: data.totalTax, disabled: true }],
              shippingCost: [data.shippingCost, Validators.required],
              netTotal: [{ value: data.netTotal, disabled: true }],
              paidAmount: [data.paidAmount, Validators.required],
              due: [{ value: data.due, disabled: true }],
              change: [{ value: data.change, disabled: true }],
              details: [data.details],
              lineItems: this.fb.array([])
            });
            const lineItemFGs = data.lineItems.map((item: any) =>
            this.fb.group({
              productName: [item.productName],
              description: [item.description],
              unitName: [item.unitName],
              quantity: [item.quantity],
              rate: [item.rate],
              discount: [item.discount ? item.discount : 0],
              total: [item.total]
            })
            );
            this.addForm.setControl('lineItems', this.fb.array(lineItemFGs));
            this.addForm.valueChanges.subscribe(() => this.calculateAllValues());
          }); 
          
        } else {
          this.isEditMode = false;          
        }
      });
    
      this.addForm = this.fb.group({
        customerId: [null, Validators.required],
        date: [new Date(), Validators.required],
        paymentAccount: ['', Validators.required],
        grandTotal:  [{ value: 0.00, disabled: true }],
        discount: [0.00, Validators.required],
        totalDiscount: [{ value: 0.00, disabled: true }],
        noTax: [0],
        gstPercentage: [0],
        gst: [0],
        totalTax: [{ value: 0.00, disabled: true }],
        shippingCost: [0.00, Validators.required],
        netTotal: [{ value: 0.00, disabled: true }],
        paidAmount: [0.00, Validators.required],
        due: [{ value: 0.00, disabled: true }],
        change: [{ value: 0.00, disabled: true }],
        details: [''],
        lineItems: this.fb.array([])
      });

      this.lineItemForm = this.fb.group({
        productName: ['', Validators.required],
        description: [''],
        unitName: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        rate: [0, [Validators.required, Validators.min(0)]],
        discount: [0, [Validators.min(0), Validators.max(100)]]
      });   

      this.addForm.valueChanges.subscribe(() => this.calculateAllValues());
  }

  get lineItems(): FormArray {
    return this.addForm.get('lineItems') as FormArray;
  }
  formatDiscount(): void {
      const discountValue = this.addForm.get('discount')?.value;
      if (discountValue !== null && discountValue !== undefined) {
        this.addForm.get('discount')?.setValue(parseFloat(discountValue).toFixed(2));
      }
  }  
  formatShipping(): void {
    const shippingCostValue = this.addForm.get('shippingCost')?.value;
    if (shippingCostValue !== null && shippingCostValue !== undefined) {
      this.addForm.get('shippingCost')?.setValue(parseFloat(shippingCostValue).toFixed(2));
    }
  }  
  formatPaidAmount(): void {
    const paidAmountValue = this.addForm.get('paidAmount')?.value;
    if (paidAmountValue !== null && paidAmountValue !== undefined) {
      this.addForm.get('paidAmount')?.setValue(parseFloat(paidAmountValue).toFixed(2));
    }
  }    
  allowOnlyNumbers(event: KeyboardEvent) {
    const allowed = /[0-9.]/
    if (!allowed.test(event.key)) {
      event.preventDefault();
    }
  }
  showAddLineItemDialog() {
    this.dialogMode = 'add';
    this.lineItemForm.reset({
      quantity: 1,
      rate: 0,
      discount: 0
    });
    this.displayDialog = true;
    this.editIndex = null;
  }
  hideAddLineItemDialog() {
    this.displayDialog = false;
  }
  calculateTotal(data: any): number {
    const { quantity, rate, discount } = data;
    const subtotal = quantity * rate;
    return subtotal - (subtotal * discount) / 100;
  }
  saveLineItem() {
    if (this.lineItemForm.valid) {
      const item = { ...this.lineItemForm.value };
      item.total = this.calculateTotal(item);
      if (this.dialogMode === 'add') {
        this.lineItems.push(this.fb.group(item));
      } else if (this.dialogMode === 'edit' && this.editIndex !== null) {
        this.lineItems.setControl(this.editIndex, this.fb.group(item));
      }
      this.hideAddLineItemDialog();
      this.calculateAllValues()
      this.toast.showSuccess("Line Items added successfully")
    }else{
      this.toast.showWarning("Please Fill Mandatory Field")
    }
  }
  calculateAllValues(){
    const formValues = this.addForm.getRawValue();
    let grandTotal = 0;
    const lineItems = formValues.lineItems || [];
    lineItems.forEach((element: any) => {
      grandTotal += element.total || 0;
    });
    const discount = Number(formValues.discount || 0);
    const shipping = Number(formValues.shippingCost || 0);
    const paid = Number(formValues.paidAmount || 0);
    const totalDiscount = (grandTotal * discount) / 100;
    const taxableAmount = grandTotal - totalDiscount;
    const gstId = this.addForm.value.gstPercentage || 0;
    const gstItem = this.gstList.find((item:any) => item.id === gstId);
    const gstRate = gstItem?.tax || 0;
    const gst = (taxableAmount * gstRate) / 100;
    const netTotal = taxableAmount + gst + shipping;
    const due = netTotal - paid;
  
    // Now set values back
    this.addForm.get('grandTotal')?.setValue(grandTotal, { emitEvent: false });
    this.addForm.get('totalDiscount')?.setValue(totalDiscount, { emitEvent: false });
    this.addForm.get('gstPercentage')?.setValue(this.addForm.value.gstPercentage ? this.addForm.value.gstPercentage : 0, { emitEvent: false });
    this.addForm.get('gst')?.setValue(gst, { emitEvent: false });
    this.addForm.get('netTotal')?.setValue(netTotal, { emitEvent: false });
    this.addForm.get('due')?.setValue(due, { emitEvent: false });
  }
  removeLineItem(index: number) {
    this.lineItems.removeAt(index);
  }
  editLineItem(index: number) {
    this.dialogMode = 'edit';
    this.editIndex = index;
    const item = this.lineItems.at(index).value;
    this.lineItemForm.setValue({
      productName: item.productName,
      description: item.description,
      unitName: item.unitName,
      quantity: item.quantity,
      rate: item.rate,
      discount: item.discount
    });
    this.displayDialog = true;
  }
  onSubmit() {
    const lineItemsArray = this.addForm.get('lineItems') as FormArray;
    const rawValue = this.addForm.getRawValue()
    const DateStr = this.addForm.value.date;

    if (typeof DateStr === 'string') {
      const [day, month, year] = DateStr.split("-");
      // Create date in UTC to avoid timezone shift
      const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
      if (!isNaN(date.getTime())) {
        rawValue.date = date.toISOString();
      }
    } 
    else if (DateStr instanceof Date) {
      // Ensure we store as UTC midnight
      const date = new Date(Date.UTC(DateStr.getFullYear(), DateStr.getMonth(), DateStr.getDate()));
      rawValue.date = date.toISOString();
    }
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else if(lineItemsArray.length === 0){
      this.toast.showWarning("Please add atleast one Line Items before saving.");
      return;
    }else{
      if(!this.isEditMode){
      this.salesInnerService.insertSales(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Sales Details saved successfully")
      this.router.navigateByUrl('sales/sales');
      },(err)=>{     
      this.toast.showApiError(err)
      }); 
      }else{
      this.salesInnerService.updateSales(Number(this.saleId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Sales Details updated successfully")
      this.router.navigateByUrl('sales/sales');
      },(err)=>{     
      this.toast.showApiError(err)
      }); 
      }  
    }
  }
  backButton() {
    this.router.navigateByUrl('sales/sales');
  }

  cancel() {
    this.router.navigateByUrl('sales/sales');
  }
}





