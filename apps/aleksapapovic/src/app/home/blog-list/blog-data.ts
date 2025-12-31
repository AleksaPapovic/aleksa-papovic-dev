export interface BlogPost {
  slug: string;
  title: string;
  image: string;
  description: string;
  date: string;
  readMinutes: number;
  tags: string[];
  content: Array<
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'code'; text: string }
  >;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'building-a-modern-portfolio',
    title: 'Building a Modern Portfolio',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    description:
      'A step-by-step approach to creating a fast, beautiful developer site with Angular, Tailwind, and modern best practices.',
    date: '2025-12-31',
    readMinutes: 6,
    tags: ['Angular', 'Tailwind', 'UX'],
    content: [
      {
        type: 'p',
        text: 'A great portfolio is a product: it should load fast, communicate clearly, and feel polished. Here’s the approach I like when building a developer site that looks premium but stays maintainable.',
      },
      { type: 'h2', text: 'Start with a clear structure' },
      {
        type: 'ul',
        items: [
          'A strong hero section with an obvious “who + what”.',
          'A short proof section (skills, companies, projects).',
          'A simple CTA (contact + links).',
        ],
      },
      { type: 'h2', text: 'Performance basics that matter' },
      {
        type: 'p',
        text: 'Keep images optimized, avoid heavy JS on the initial route, and keep animations subtle. A site that feels instant is a site people trust.',
      },
      { type: 'code', text: "Tip: lazy-load anything non-critical and keep your hero lightweight." },
    ],
  },
  {
    slug: 'scaling-full-stack-projects',
    title: 'Scaling Full-Stack Projects ⚡',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
    description:
      'Architecture & workflow tips for efficient, scalable web apps using Nx Workspace, API layering, and component-driven design.',
    date: '2025-12-30',
    readMinutes: 7,
    tags: ['Nx', 'Architecture', 'Full-Stack'],
    content: [
      {
        type: 'p',
        text: 'Scaling isn’t just about traffic — it’s about codebase scale, team scale, and change velocity. The goal: keep shipping without everything becoming fragile.',
      },
      { type: 'h2', text: 'Use boundaries' },
      {
        type: 'p',
        text: 'Define clear layers (UI, domain, data access) and keep dependencies flowing one way. Nx tags + lint boundaries are a great guardrail.',
      },
      { type: 'h2', text: 'Make build times predictable' },
      {
        type: 'ul',
        items: [
          'Cache aggressively (CI + local).',
          'Keep libraries small and focused.',
          'Measure the slowest targets and fix those first.',
        ],
      },
    ],
  },
  {
    slug: 'async-patterns-rxjs',
    title: 'Async Patterns & RxJS',
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1400&q=80',
    description:
      'Learn modern async programming techniques, with real-world RxJS code you can use today in your Angular apps.',
    date: '2025-12-29',
    readMinutes: 8,
    tags: ['RxJS', 'Angular', 'Async'],
    content: [
      {
        type: 'p',
        text: 'RxJS can be simple if you treat streams as data flows. Start with a few core operators and build patterns you can repeat.',
      },
      { type: 'h2', text: 'A practical mental model' },
      {
        type: 'ul',
        items: [
          'Use Observables for “things over time”.',
          'Prefer pure mapping over side effects.',
          'Use cancellation (switchMap) for “latest wins”.',
        ],
      },
      { type: 'code', text: 'switchMap(() => http.get(...)) // cancels previous request' },
    ],
  },
];

export function getBlogPostBySlug(slug: string | null | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return BLOG_POSTS.find((p) => p.slug === slug);
}


