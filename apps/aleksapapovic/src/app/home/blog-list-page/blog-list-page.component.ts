import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getBlogPostBySlug } from '../blog-list/blog-data';

@Component({
  selector: 'app-blog-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list-page.component.html',
  styleUrls: ['./blog-list-page.component.scss'],
})
export class BlogListPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly post = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    return getBlogPostBySlug(slug);
  });
}


