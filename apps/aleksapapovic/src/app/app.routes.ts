import { Route } from '@angular/router';

import { HomeComponent } from './pages/home.component';
import { ProjectsComponent } from './pages/projects.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'experience', component: ProjectsComponent },
  { path: '**', redirectTo: '' },
];
