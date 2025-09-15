import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingCreateComponent } from './meeting-create/meeting-create.component';

const routes: Routes = [
  { path: 'meetings', component: MeetingListComponent },
  { path: 'meetings/create', component: MeetingCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
