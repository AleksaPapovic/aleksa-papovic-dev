import { Component } from '@angular/core';
import { BlogListComponent } from './blog-list/blog-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [BlogListComponent],
})
export class HomeComponent {}
