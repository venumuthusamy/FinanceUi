import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import {MeetingService} from 'src/app/meeting/meeting.service'

@Component({
  selector: 'app-meeting-agenda-items',
  templateUrl: './meeting-agenda-items.component.html',
  styleUrls: ['./meeting-agenda-items.component.css'],
  providers: [DatePipe] 
})
export class MeetingAgendaItemsComponent {

  addForm!: FormGroup;
  agendaItemsForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  formattedDate: any;
  @Output() tabStatus = new EventEmitter<string>();
  @Output() agendaItemsDetails = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private meetingService: MeetingService,
    private datePipe: DatePipe,
    private toast: ToastService
  ) {
    
  }

  ngOnInit() {
    const date = new Date();
    this.formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    this.addForm = this.fb.group({
      agendaItems: this.fb.array([])
    });
    this.agendaItemsForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      itemTypeName: ['', Validators.required],
      requestedBy: [''],
      sequenceNo: ['', Validators.required],
    });    
  }

  get agendaItems(): FormArray {
    return this.addForm.get('agendaItems') as FormArray;
  }  

  showAgendaItemsDialog() {
    this.dialogMode = 'add';
    this.displayDialog = true;
    this.editIndex = null;
    this.agendaItemsForm.reset('');
  }

  hideAgendaItemsDialog() {
    this.displayDialog = false;
  }

  saveAgendaItems() {
    if (this.agendaItemsForm.valid) {
      const item = { ...this.agendaItemsForm.value };
      if (this.dialogMode === 'add') {
        this.agendaItems.push(this.fb.group(item));
      } else if (this.dialogMode === 'edit' && this.editIndex !== null) {
        this.agendaItems.setControl(this.editIndex, this.fb.group(item));
      }
      this.hideAgendaItemsDialog();   
      this.toast.showSuccess("Agenda Items added successfully")
    }else{
      this.toast.showWarning("Please Fill Mandatory Field")
    }
  }
 
  removeAgendaItems(index: number) {
    this.agendaItems.removeAt(index);
  }

  editAgendaItems(index: number) {
    this.dialogMode = 'edit';
    this.editIndex = index;
    const item = this.agendaItems.at(index).value;
    this.agendaItemsForm.setValue({
      title: item.title,
      description: item.description,
      itemTypeName: item.itemTypeName,
      requestedBy: item.requestedBy,
      sequenceNo: item.sequenceNo,
    });
    this.displayDialog = true;
  }

  onSubmit() {
   const agendaItemsArray = this.addForm.get('agendaItems') as FormArray;
   if(agendaItemsArray.length === 0){
      this.toast.showWarning("Please add atleast one Agenda Item before saving.");
      return;
    }else{
      this.toast.showSuccess("Agenda Items Details saved successfully")
      this.tabStatus.emit('2');
      this.agendaItemsDetails.emit(agendaItemsArray.value)
    }
  }

   cancel() {
    this.router.navigateByUrl('meeting/meetings');
  }
}








