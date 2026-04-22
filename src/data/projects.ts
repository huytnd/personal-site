export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  stack: string[];
  focus: string[];
  featured?: boolean;
  liveUrl?: string;
  sourceUrl?: string;
  caseStudy: {
    overview: string;
    problem: string;
    approach: string[];
    architecture: string[];
    delivery: string[];
    outcome: string[];
    nextSteps: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "task-manager",
    title: "Fullstack Task Manager",
    category: "Fullstack Product",
    description:
      "A production-style task management platform with authentication, clean backend architecture, relational persistence, and a modern dashboard experience.",
    summary:
      "Designed as a practical fullstack system that shows how product workflows, API boundaries, persistence, and deployment concerns fit together.",
    stack: ["ASP.NET Core", "PostgreSQL", "React", "Docker", "Tailwind"],
    focus: ["Clean architecture", "Authentication", "Workflow UX", "Containerized delivery"],
    featured: true,
    caseStudy: {
      overview:
        "The task manager project is built as a realistic fullstack application rather than a small CRUD demo. It focuses on clean API contracts, predictable persistence, and a frontend that can support real productivity workflows.",
      problem:
        "Productivity tools become fragile when the backend model, user flows, and deployment path are treated separately. This project explores how to keep those pieces aligned from the first implementation decisions.",
      approach: [
        "Model core task workflows around explicit domain concepts instead of UI-only state.",
        "Keep the API surface predictable so the frontend can evolve without depending on hidden backend behavior.",
        "Use PostgreSQL for durable relational storage and Docker for repeatable local and deployment environments.",
      ],
      architecture: [
        "ASP.NET Core exposes the application API and owns validation, persistence boundaries, and authentication behavior.",
        "PostgreSQL stores task and user-facing workflow data with a schema intended for clear querying and future reporting.",
        "The frontend dashboard stays focused on task interaction, status visibility, and fast day-to-day use.",
      ],
      delivery: [
        "Containerized services make the app easier to run consistently across local and hosted environments.",
        "The project structure separates backend, frontend, and deployment concerns so changes remain reviewable.",
        "The implementation favors boring defaults and visible operational behavior over clever shortcuts.",
      ],
      outcome: [
        "A portfolio-ready fullstack build that demonstrates backend-first product delivery.",
        "A reusable reference for authentication, API design, persistence, and deployment decisions.",
        "A foundation that can grow toward notifications, audit trails, analytics, and collaboration features.",
      ],
      nextSteps: [
        "Add role-aware collaboration and project/team workspaces.",
        "Introduce background jobs for reminders, summaries, and recurring tasks.",
        "Expand observability with request metrics, structured logs, and dashboard-level activity insights.",
      ],
    },
  },
  {
    slug: "url-shortener",
    title: "URL Shortener API",
    category: "Backend Service",
    description:
      "A backend-focused URL shortening service with clean REST endpoints, redirect handling, analytics, rate limiting, and cache-aware design.",
    summary:
      "A compact service that surfaces important backend concerns: fast redirects, abuse protection, metrics, persistence, and operational clarity.",
    stack: ["ASP.NET Core", "REST API", "PostgreSQL", "Redis", "Docker"],
    focus: ["API design", "Redirect performance", "Rate limiting", "Analytics"],
    caseStudy: {
      overview:
        "The URL shortener is intentionally backend-heavy. It uses a small product surface to explore API shape, redirect performance, data modeling, analytics, and the operational concerns behind public endpoints.",
      problem:
        "A URL shortener looks simple until it needs to be fast, measurable, abuse-resistant, and easy to operate. The core challenge is balancing a tiny user-facing action with robust backend behavior.",
      approach: [
        "Design REST endpoints around predictable creation, lookup, redirect, and analytics flows.",
        "Use caching where it improves redirect latency without hiding persistence as the source of truth.",
        "Treat rate limiting and basic abuse protection as core service behavior rather than optional polish.",
      ],
      architecture: [
        "ASP.NET Core handles API requests, redirect logic, validation, and service boundaries.",
        "PostgreSQL stores link records, ownership metadata, and analytics-ready events.",
        "Redis can support hot-path lookups and rate-limit counters where low latency matters most.",
      ],
      delivery: [
        "Docker keeps the API, database, and cache setup reproducible.",
        "Service boundaries are kept narrow so behavior can be tested and reasoned about independently.",
        "The implementation is shaped for extension into public dashboards, API keys, or tenant-aware usage.",
      ],
      outcome: [
        "A focused backend service demonstrating performance and operational tradeoffs.",
        "A reusable reference for public API endpoints, redirect behavior, and event-style analytics.",
        "A compact project that communicates backend depth without needing a large UI.",
      ],
      nextSteps: [
        "Add API key support and per-user quotas.",
        "Create an analytics dashboard for click trends, referrers, and geographic summaries.",
        "Add expiration policies, custom aliases, and bulk link management.",
      ],
    },
  },
  {
    slug: "portfolio",
    title: "Personal Portfolio Platform",
    category: "Portfolio Platform",
    description:
      "A self-hosted personal website and technical writing platform built with Astro, MDX, Tailwind, and production-minded deployment workflows.",
    summary:
      "This site is both a portfolio and an engineering notebook, designed to make projects, writing, deployment, and personal positioning feel cohesive.",
    stack: ["Astro", "MDX", "Tailwind CSS", "Three.js", "Dokploy", "VPS"],
    focus: ["Static performance", "Technical writing", "Design system", "Self-hosted delivery"],
    caseStudy: {
      overview:
        "The portfolio platform is the site you are reading now. It brings together project case studies, technical writing, a consistent design system, and self-hosted deployment practices.",
      problem:
        "A personal site can become a pile of disconnected pages quickly. The goal here is to create a system that presents engineering work clearly while staying fast, maintainable, and easy to extend.",
      approach: [
        "Use Astro for fast static pages and a low-JavaScript baseline.",
        "Use MDX for technical writing so articles can include reusable components and richer content blocks.",
        "Keep visual language consistent across home, blog, about, project index, and case-study pages.",
      ],
      architecture: [
        "Astro owns page routing, static generation, content rendering, and optimized assets.",
        "Tailwind and shared CSS tokens provide the site-level design system.",
        "The deployment path is shaped for a VPS workflow with repeatable builds and clear operational ownership.",
      ],
      delivery: [
        "The site is structured around small page modules and shared data where content appears in multiple places.",
        "Build verification catches routing, content, and image issues before deployment.",
        "The design evolves through reusable page patterns rather than one-off page-specific styling.",
      ],
      outcome: [
        "A cohesive personal platform for projects, technical writing, and professional positioning.",
        "A practical Astro reference for MDX, open graph output, RSS, sitemap, and static delivery.",
        "A foundation for future project writeups, newsletter flows, and richer engineering notes.",
      ],
      nextSteps: [
        "Add more project screenshots or architecture diagrams as each project matures.",
        "Connect newsletter or subscription flows when the writing cadence is stable.",
        "Expand project detail pages with metrics, demos, and deployment notes.",
      ],
    },
  },
];

export const getProjectBySlug = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug);

export const hasRealUrl = (url: string | undefined) =>
  Boolean(url && url.trim() && url.trim() !== "#");
