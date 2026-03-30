import { Routes } from '@angular/router';
import { StudentList } from './components/student-list/student-list';
import { AddStudent } from './components/add-student/add-student';

export const routes: Routes = [
  { path: '', component: StudentList },
  { path: 'add', component: AddStudent },
  { path: 'edit/:id', component: AddStudent },
  { path: '**', redirectTo: '' } // Redirect any unknown URL to the home page
];
