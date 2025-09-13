import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MeetingService } from '../meeting.service';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class MeetingListComponent {

  headervalue: any
  meetingList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchMeetingName: string = '';

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private meetingService : MeetingService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Meetings';
     this.meetingService.getMeetings().subscribe((data :any) => {
        const customerDetails = data|| '{}';
        if (customerDetails) {
            this.meetingList = customerDetails
            this.meetingService.setData(this.meetingList);
        } else {
            this.meetingList = customerDetails;
        }  
      });  
  }

  createMeeting(){
    this.router.navigateByUrl('meeting/meetings/create')
  }
  editMeeting(item : any){
    //this.router.navigateByUrl('meeting/meetings/edit')
  }

  filterEmployees() {
    let filteredList = this.meetingService.getData();
    if (this.searchMeetingName) {
      filteredList = filteredList.filter((employee: any) =>
        (!this.searchMeetingName || employee.meetingName.toLowerCase().includes(this.searchMeetingName.toLowerCase()))

      );
    }
    this.meetingList = filteredList;
    this.page = 1;
  }

  clearField(field: string) {
    if (field === 'searchMeetingName') {
      this.searchMeetingName = '';
    } 
    this.filterEmployees();
  }
  formatDate = (dateStr: string | Date): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
    };

  downloadExcel() {
    
    const data = this.meetingList.map((item: any) => ({
       ID: item.id,
      'Meeting Name': item.meetingName,
      'Meeting Type Name': item.meetingType,
      'Start Date': this.formatDate(item.startDate),
      'End Date': this.formatDate(item.endDate),
       Department: item.department,
      'Location Name': item.location,
      'Organised By': item.organisedBy,
       Reporter: item.reporter,
    }));  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Meeting Data': worksheet }, SheetNames: ['Meeting Data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); 
    const blobData: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blobData, 'MeetingData.xlsx');
  }
  
  downloadPDF() {
    const doc = new jsPDF('l');
    const head = [[
      'ID', 'Meeting Name', 'Meeting Type Name', 'Start Date', 'End Date', 
      'Department', 'Location Name', 'Organised By', 'Reporter', 
    ]];
    const data = this.meetingList.map((item:any)=> [
      item.id, item.meetingName,item.meetingType,this.formatDate(item.startDate),
      this.formatDate(item.endDate),item.department,item.location, item.organisedBy,
      item.reporter
    ]);  
    autoTable(doc, {
      head: head,
      body: data,
      styles: { fontSize: 8 }
    });  
    doc.save('MeetingData.pdf');
  }

  confirmdeleteMeeting(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteMeeting(item);
          },
          reject: () => {
          }
        });
  }
  deleteMeeting(item : any){
    this.meetingService.deleteMeeting(item.id).subscribe((res)=>{
      this.toast.showSuccess("Meeting Details deleted successfully")
      this.ngOnInit()  
    })
  }
}






