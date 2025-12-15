import { Route } from '@angular/router';

import { HomeComponent } from './pages/home.component';
import { BlogsComponent } from './pages/blogs.component';
import { ProjectsComponent } from './pages/projects.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '**', redirectTo: '' }
];
