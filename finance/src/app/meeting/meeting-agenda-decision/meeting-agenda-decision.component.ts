
import { Component,Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import {MeetingService} from 'src/app/meeting/meeting.service'
@Component({
  selector: 'app-meeting-agenda-decision',
  templateUrl: './meeting-agenda-decision.component.html',
  styleUrls: ['./meeting-agenda-decision.component.css'],
  providers: [DatePipe] 
})
export class MeetingAgendaDecisionComponent {

  addForm!: FormGroup;
  agendaDecisionForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  formattedDate: any;

   @Input() meetingDetails: any;
   @Input() meetingAgendaItems: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private meetingService: MeetingService,
    private datePipe: DatePipe,
    private toast: ToastService
  ) {
    
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      agendaDecision: this.fb.array([])
    });
    this.agendaDecisionForm = this.fb.group({
      description: ['',Validators.required],
      dueDate: [new Date()],
      assignedTo: [''],
      decisionNumber: [''],
      relatedAgendaItemTitle: [''],
      resolutionStatus: ['', Validators.required],
    });    
  }

  get agendaDecision(): FormArray {
    return this.addForm.get('agendaDecision') as FormArray;
  }  

  showAgendaDecisionDialog() {
    this.dialogMode = 'add';
    this.displayDialog = true;
    this.editIndex = null;
    this.agendaDecisionForm.reset('');
  }

  hideAgendaDecisionDialog() {
    this.displayDialog = false;
  }

  saveAgendaDecision() {
    if (this.agendaDecisionForm.valid) {
      const item = { ...this.agendaDecisionForm.value };
      if (this.dialogMode === 'add') {
        this.agendaDecision.push(this.fb.group(item));
      } else if (this.dialogMode === 'edit' && this.editIndex !== null) {
        this.agendaDecision.setControl(this.editIndex, this.fb.group(item));
      }
      this.hideAgendaDecisionDialog();   
      this.toast.showSuccess("Agenda Decision added successfully")
    }else{
      this.toast.showWarning("Please Fill Mandatory Field")
    }
  }
 
  removeAgendaDecision(index: number) {
    this.agendaDecision.removeAt(index);
  }

  editAgendaDecision(index: number) {
    this.dialogMode = 'edit';
    this.editIndex = index;
    const item = this.agendaDecision.at(index).value;
    this.agendaDecisionForm.setValue({
      description: item.description,
      dueDate: item.dueDate,
      assignedTo: item.assignedTo,
      decisionNumber: item.decisionNumber,
      relatedAgendaItemTitle: item.relatedAgendaItemTitle,
      resolutionStatus: item.resolutionStatus,
    });
    this.displayDialog = true;
  }

  onSubmit() {
    const details = this.meetingDetails
    details['meetingAgendaItems'] = this.meetingAgendaItems;   
    const agendaDecisionArray = this.addForm.get('agendaDecision') as FormArray;  
      if (Array.isArray(agendaDecisionArray)) {
      agendaDecisionArray.forEach(item => {
        if (item && item.dueDate) {
          const [day, month, year] = item.dueDate.split('-');

          // Convert to ISO format
          const dueDate = new Date(`${year}-${month}-${day}`);

          if (!isNaN(dueDate.getTime())) {
            item.dueDate = dueDate.toISOString();
          }
        }
      });
      }
    details['meetingAgendaDecisions'] = agendaDecisionArray.value; 
    if(agendaDecisionArray.length === 0){
        this.toast.showWarning("Please add atleast one Agenda Decision before saving.");
        return;
      }else{
        this.meetingService.insertMeeting(details).subscribe((res :any) => {
          this.toast.showSuccess("Agenda Decision Details saved successfully")
          this.router.navigateByUrl("meeting/meetings")      
        },(err)=>{     
         this.toast.showApiError(err)
        }); 
      
      }
  }
   cancel() {
    this.router.navigateByUrl('meeting/meetings');
  }
}












