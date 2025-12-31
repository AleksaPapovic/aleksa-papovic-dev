import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BLOG_POSTS } from './blog-data';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class BlogListComponent {
  blogPosts = BLOG_POSTS;
}
