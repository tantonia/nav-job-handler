import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobDetailComponent } from './components/job-details/job-details.component';

export const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'job/:entryId', component: JobDetailComponent }
];
