import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getTimelineItemById } from '../about/timeline-data';

@Component({
  selector: 'app-timeline-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './timeline-detail.component.html',
  styleUrls: ['./timeline-detail.component.scss'],
})
export class TimelineDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly item = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return getTimelineItemById(id);
  });
}


