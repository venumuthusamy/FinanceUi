import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.css']
})
export class MeetingCreateComponent {

  activeTabIndex = 0;
  isTab2Disabled: boolean = true;
  isTab3Disabled: boolean = true;
  meetingDetails: any;
  meetingAgendaItems: any;

   constructor(
      private router: Router,
    ) {
      
      }

  backButton() {
    this.router.navigateByUrl('meeting/meetings');
  }

  tabEvent(event:any) {
    if (event === 1) {
      this.isTab2Disabled = false;     // Enable Tab 2
    } else if (event === 2) {
      this.isTab3Disabled = false;     // Enable Tab 3
    }
      this.activeTabIndex = event;
  }

  addFormDetails(event:any){
    this.meetingDetails = event
  }

  agendaItemsDetails(event:any){
    this.meetingAgendaItems = event
  }
}
