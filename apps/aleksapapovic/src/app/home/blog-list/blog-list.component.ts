import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  standalone: true,
  imports: [NgFor],
})
export class BlogListComponent {
  blogPosts = [
    {
      title: 'Building a Modern Portfolio',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
      description:
        'A step-by-step approach to creating a fast, beautiful developer site with Angular, Tailwind, and modern best practices.',
    },
    {
      title: 'Scaling Full-Stack Projects ⚡',
      image:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80',
      description:
        'Architecture & workflow tips for efficient, scalable web apps using Nx Workspace, API layering, and component-driven design.',
    },
    {
      title: 'Async Patterns & RxJS',
      image:
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80',
      description:
        'Learn modern async programming techniques, with real-world RxJS code you can use today in your Angular apps.',
    },
    {
      title: 'Building a Modern Portfolio',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
      description:
        'A step-by-step approach to creating a fast, beautiful developer site with Angular, Tailwind, and modern best practices.',
    },
    {
      title: 'Scaling Full-Stack Projects ⚡',
      image:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80',
      description:
        'Architecture & workflow tips for efficient, scalable web apps using Nx Workspace, API layering, and component-driven design.',
    },
    {
      title: 'Async Patterns & RxJS',
      image:
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80',
      description:
        'Learn modern async programming techniques, with real-world RxJS code you can use today in your Angular apps.',
    },
  ];
}
