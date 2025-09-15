// dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingCreateComponent } from './meeting-create/meeting-create.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { MeetingRoutingModule } from './meeting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { MeetingAgendaComponent } from './meeting-agenda/meeting-agenda.component';
import { MeetingAgendaItemsComponent } from './meeting-agenda-items/meeting-agenda-items.component';
import { MeetingAgendaDecisionComponent } from './meeting-agenda-decision/meeting-agenda-decision.component';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule  } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    MeetingListComponent,
    MeetingCreateComponent,
    MeetingEditComponent,
    MeetingAgendaComponent,
    MeetingAgendaItemsComponent,
    MeetingAgendaDecisionComponent
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, 
    NgxPaginationModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    TabMenuModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastModule
  ],
})
export class MeetingModule { }