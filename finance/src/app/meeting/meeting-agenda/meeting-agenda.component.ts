import { Component, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import {MeetingService} from 'src/app/meeting/meeting.service'

@Component({
  selector: 'app-meeting-agenda',
  templateUrl: './meeting-agenda.component.html',
  styleUrls: ['./meeting-agenda.component.css'],
  providers: [DatePipe] 
})
export class MeetingAgendaComponent {

  addForm!: FormGroup;
  attendeesForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  formattedDate: any;
  @Output() tabStatus = new EventEmitter<string>();
  @Output() addFormDetails = new EventEmitter<any>();

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
      meetingName: ['', Validators.required],
      meetingType: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      department: [''],
      location: ['', Validators.required],
      organisedBy: [''],
      reporter: [''],
      attendees: this.fb.array([])
    });
    this.attendeesForm = this.fb.group({
      attendee: ['', Validators.required],
      attendeeType: ['',Validators.required],
      attendeeStatus: ['', Validators.required],
    });
    
  }

  get attendees(): FormArray {
    return this.addForm.get('attendees') as FormArray;
  }  

  showAttendeesDialog() {
    this.dialogMode = 'add';
    this.displayDialog = true;
    this.editIndex = null;
    this.attendeesForm.reset('');
  }

  hideAttendeesDialog() {
    this.displayDialog = false;
  }

  saveAttendees() {
    if (this.attendeesForm.valid) {
      const item = { ...this.attendeesForm.value };   
      if (this.dialogMode === 'add') {
        this.attendees.push(this.fb.group(item));
      } else if (this.dialogMode === 'edit' && this.editIndex !== null) {
        this.attendees.setControl(this.editIndex, this.fb.group(item));
      }
      this.hideAttendeesDialog();  
      this.toast.showSuccess("Attendees added successfully")
    }else{
      this.toast.showWarning("Please Fill Mandatory Field")
    }
  }
 
  removeAttendees(index: number) {
    this.attendees.removeAt(index);
  }

  editAttendees(index: number) {
    this.dialogMode = 'edit';
    this.editIndex = index;
    const item = this.attendees.at(index).value;
    this.attendeesForm.setValue({
      attendee: item.attendee,
      attendeeType: item.attendeeType,
      attendeeStatus: item.attendeeStatus,
    });
    this.displayDialog = true;
  }

  onSubmit() {
    const attendeesArray = this.addForm.get('attendees') as FormArray;
    const rawValue = this.addForm.getRawValue()
    const DateStr = this.addForm.value.startDate;
    if (typeof DateStr === 'string') {
      const [day, month, year] = DateStr.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      if (!isNaN(date.getTime())) {
        rawValue.startDate = date.toISOString();
      }
    } else if (DateStr instanceof Date) {
      rawValue.startDate = DateStr.toISOString();
    }


    const enddateStr = this.addForm.value.endDate;   
    if (typeof enddateStr === 'string') {
      const [day, month, year] = enddateStr.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      if (!isNaN(date.getTime())) {
        rawValue.endDate = date.toISOString();
      }
    } else if (enddateStr instanceof Date) {
      rawValue.endDate = enddateStr.toISOString();
    } 
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else if(attendeesArray.length === 0){
      this.toast.showWarning("Please add atleast one Attendees Item before saving.");
      return;
    }else{
      this.toast.showSuccess("Meetings Details saved successfully")
      this.tabStatus.emit('1');
      this.addFormDetails.emit(rawValue)
    }    
  }
  
  backButton() {
    this.router.navigateByUrl('meeting/meetings');
  }

  cancel() {
    this.router.navigateByUrl('meeting/meetings');
  }
}








