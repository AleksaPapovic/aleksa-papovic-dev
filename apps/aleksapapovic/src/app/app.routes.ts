import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { TimelineDetailComponent } from './timeline/timeline-detail.component';
import { BlogListPageComponent } from './home/blog-list-page/blog-list-page.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'blog/:slug', component: BlogListPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'timeline/:id', component: TimelineDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
