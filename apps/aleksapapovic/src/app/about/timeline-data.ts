export type TimelineId =
  | 'high-school'
  | 'university'
  | 'upwork'
  | 'trackingSolutions'
  | 'examroom';

export interface TimelineItem {
  id: TimelineId;
  title: string;
  subtitle?: string;
  accent?: 'blue' | 'orange' | 'green' | 'black';
  summary: string;
  details: string[];
}

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'high-school',
    title: 'High School',
    subtitle: 'ESTŠ “Nikola Tesla” — Information Technology',
    accent: 'blue',
    summary: 'First real projects and fundamentals.',
    details: [
      'Built my first web projects and learned the basics of shipping software.',
      'Got comfortable with problem-solving, debugging, and learning fast.',
    ],
  },
  {
    id: 'university',
    title: 'University',
    accent: 'blue',
    summary: 'Computer science foundation + software engineering discipline.',
    details: [
      'Earned a CS degree and built a strong foundation in algorithms and software engineering.',
      'Focused on building maintainable web apps and collaborating on projects.',
    ],
  },
  {
    id: 'upwork',
    title: 'Upwork',
    accent: 'blue',
    summary: 'Freelance work with global clients.',
    details: [
      'Delivered production web features end-to-end: discovery, implementation, QA, and deployment.',
      'Strengthened communication, estimation, and rapid iteration with real users.',
    ],
  },
  // {
  //   id: 'trackingSolutions',
  //   title: 'TrackingSoultions',
  //   accent: 'orange',
  //   summary: 'Real-time tracking solutions and scalable web platforms.',
  //   details: [
  //     'Worked on improving real-time tracking experiences and reliability.',
  //     'Contributed to performance, scalability, and clean UI/UX for operational workflows.',
  //   ],
  // },
  {
    id: 'examroom',
    title: 'ExamRoom.AI',
    accent: 'green',
    summary:
      'Full Stack Developer building real-time assessment + proctoring tools.',
    details: [
      'Built robust real-time features for assessments and proctoring at scale.',
      'Focused on reliability, security, and smooth user experience for candidates and admins.',
    ],
  },
];

export function getTimelineItemById(
  id: string | null | undefined
): TimelineItem | undefined {
  if (!id) return undefined;
  return TIMELINE_ITEMS.find((x) => x.id === id);
}
