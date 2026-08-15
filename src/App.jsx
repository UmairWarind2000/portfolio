// src/App.jsx
import { useEffect, useRef, useState } from "react";
// Replace src/assets/avatar.jpg with your real photo — same filename, this
// import doesn't need to change.
import avatarUrl from "./assets/avatar.jpg";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// TODO: replace with your real GitHub / LinkedIn URLs.
const SOCIALS = {
  github: "https://github.com/UmairWarind2000",
  linkedin: "https://www.linkedin.com/in/muhammad-umair-rasheed-5085751a6",
};

// TODO: add real dates + 2-3 bullet points per role once confirmed.
const EXPERIENCE = [
  {
    role: "MERN Stack Developer",
    company: "Mercury Sols",
    period: "DEC 2025 - FEB 2026",
    summary:
      "Worked on full-stack web applications using the MERN stack, contributing to responsive frontend interfaces, REST APIs, database integration, and application features.",
    bullets: [
      "Developed and maintained React-based interfaces with reusable components and responsive layouts.",
      "Built and integrated REST APIs using Node.js and Express, with MongoDB for data persistence.",
      "Implemented authentication, API integration, and frontend state management while debugging and improving existing application features.",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    role: "Web Developer",
    company: "Coding Solution 24",
    period: "JAN 2024 - NOV 2025",
    summary:
      "Built and maintained full-stack web applications, working across frontend development, backend APIs, databases, and third-party service integrations.",
    bullets: [
      "Developed responsive web applications using React and modern JavaScript, focusing on reusable components and clean UI implementation.",
      "Created backend functionality and REST APIs with Node.js and Express, integrating MongoDB for application data and user management.",
      "Worked on debugging, feature development, API integration, and performance improvements across multiple web projects.",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Redux"],
  },
];

const SKILLS = [
  {
    label: "Frontend",
    desc: "Interfaces and state, built to hold up under real usage.",
    items: ["React", "Redux", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend & Data",
    desc: "APIs, queues, and the databases behind them.",
    items: ["Node.js / Express", "FastAPI", "MongoDB", "PostgreSQL", "Redis"],
  },
  {
    label: "AI & Integrations",
    desc: "Retrieval, embeddings, and the third-party plumbing around them.",
    items: ["Gemini API", "Vector Search (RAG)", "Sentence-BERT", "Stripe", "Shopify API"],
  },
  {
    label: "Tools & Practice",
    desc: "How the systems above stay reliable and shippable.",
    items: ["Docker", "Socket.io", "Bull Queues", "Git"],
  },
];

const PROJECTS = [
  {
    name: "Storiq",
    tagline: "Multi-tenant Shopify SaaS with metered billing",
    description:
      "A SaaS platform that plugs into a merchant's Shopify store, queues background sync jobs, and bills usage through Stripe — built across eight phases from schema to production.",
    tags: ["MERN", "Bull / Redis", "Stripe", "Shopify API", "Gemini"],
    deployed: "Railway · Vercel · MongoDB Atlas",
    url: "https://storiq-web.vercel.app/login",
    notes: [
      "Fixed JSON truncation in streamed Gemini responses",
      "Closed a demo-token path that leaked into production access",
      "Resolved CORS misconfiguration across tenant subdomains",
      "Tuned Railway healthchecks and named Bull processor registration",
    ],
  },
  {
    name: "Docly",
    tagline: "RAG-based document intelligence platform",
    description:
      "Upload a document, ask it questions. Vector search over MongoDB Atlas backs a retrieval pipeline, with live progress pushed over sockets as documents are chunked and embedded.",
    tags: ["React 19", "Express 5", "MongoDB Vector Search", "Gemini", "Socket.io"],
    deployed: "Railway · Vercel",
    url: "https://docly-neon.vercel.app/login",
    notes: [
      "Migrated the embedding provider from OpenAI to Gemini mid-build",
      "Worked through Mongoose 9 breaking changes and ObjectId mismatches",
      "Fixed cross-site cookie config for OAuth sign-in",
      "Chased down a pdf-parse versioning issue in ingestion",
    ],
  },
  {
    name: "Career-Forge",
    tagline: "AI career-readiness platform — Final Year Project",
    description:
      "Models a job seeker's growth as a sequential decision problem: Q-learning recommends next skills, Sentence-BERT scores resume-to-role fit, spaCy parses postings pulled live from JSearch.",
    tags: ["FastAPI", "React", "PostgreSQL", "MongoDB", "Sentence-BERT", "spaCy"],
    deployed: "Final Year Project",
    url: "https://career-forge-indol.vercel.app/login",
    notes: [
      "Reinforcement-learning recommendation loop instead of a static rules engine",
      "Two databases in one system: Postgres for structured records, Mongo for parsed postings",
      "Live job data via the JSearch API rather than a static seed set",
    ],
  },
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, setTheme];
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ---------- icons ---------- */
function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}
function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ExternalIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.25 1z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.08.78 2.17v3.22c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
function CheckShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 3 5 6v6c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V6l-7-3Z" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Avatar({ size = 96 }) {
  return (
    <div
      className="mx-auto flex items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-2)]"
      style={{ width: size, height: size }}
    >
      <img src={avatarUrl} alt="Umair Rasheed" className="h-full w-full object-cover" />
    </div>
  );
}

function Section({ id, eyebrow, title, subtitle, children, className = "" }) {
  const ref = useReveal();
  return (
    <section id={id} className={`scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16 ${className}`}>
      <div ref={ref} className="reveal mx-auto max-w-6xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--muted)]">
            {eyebrow}
          </p>
        )}
        {title && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>}
        {subtitle && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            {subtitle}
          </p>
        )}
        <div className={title || subtitle ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--text)]/30">

      {/* Project Initial */}
      <div className="mb-5 flex h-28 w-full items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
        <span className="text-3xl font-bold tracking-tight text-[var(--muted)]">
          {project.name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Project Number */}
      <span className="mb-2 text-xs font-mono text-[var(--muted)]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Project Name */}
      <h3 className="text-xl font-bold">
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="mt-1 text-sm font-medium text-[var(--text)]">
        {project.tagline}
      </p>

      {/* Description */}
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)]">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-medium text-[var(--muted)]"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Deployment */}
      <p className="mt-4 text-[12px] text-[var(--muted)]">
        {project.deployed}
      </p>

      {/* Bottom Actions */}
      <div className="mt-auto pt-4">

        {/* View Project Button */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-[13px] font-semibold transition-all duration-200 hover:border-[var(--text)]/40 hover:bg-[var(--surface-2)]"
          >
            View Project
            <span aria-hidden="true">↗</span>
          </a>
        )}

        {/* Build Notes Button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 block text-[13px] font-semibold underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--text)]"
        >
          {open ? "− Hide build notes" : "+ Build notes"}
        </button>

        {/* Build Notes */}
        {open && (
          <ul className="mt-3 space-y-1.5 border-t border-[var(--border)] pt-3">
            {project.notes.map((n, i) => (
              <li
                key={i}
                className="flex gap-2 text-[13px] leading-relaxed text-[var(--muted)]"
              >
                <span>›</span>
                {n}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useTheme();
  const active = useScrollSpy(NAV.map((n) => n.id));

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* NAV */}
      <header className="fixed top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          <a href="#top" className="flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-[var(--text)]" />
            <span className="text-[15px] font-bold">Umair Rasheed</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`text-sm font-medium transition-colors ${active === n.id ? "text-[var(--text)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] hover:border-[var(--text)]/40"
            >
              {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-[var(--text)] px-4 py-2 text-sm font-semibold text-[var(--invert-text)] sm:inline-block"
            >
              Get in touch
            </a>
          </div>
        </div>
        {/* mobile nav */}
        <nav className="flex gap-5 overflow-x-auto border-t border-[var(--border)] px-6 py-2.5 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`whitespace-nowrap text-xs font-medium ${active === n.id ? "text-[var(--text)]" : "text-[var(--muted)]"
                }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 sm:px-10">
        <div className="w-full max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center sm:p-12">
          <Avatar />

          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-[var(--muted)]">
            WELCOME — OPEN TO NEW ROLES &amp; COLLABORATIONS
          </p>
          <p className="mt-3 text-xs font-semibold tracking-[0.15em] text-[var(--muted)]">
            MERN &amp; AI-INTEGRATED FULL-STACK DEVELOPER
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Umair Rasheed
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] font-medium leading-relaxed">
            Building AI-integrated products that ship — from RAG pipelines to
            production billing systems.
          </p>
          <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-[var(--muted)]">
            If you're looking for a MERN developer who can take an AI feature
            from prototype to production — queues, webhooks, billing, and
            all — you're in the right place.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--border)] py-3">
              <p className="text-lg font-bold">~2 years</p>
              <p className="text-[10px] tracking-widest text-[var(--muted)]">EXPERIENCE</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] py-3">
              <p className="text-lg font-bold">3 shipped</p>
              <p className="text-[10px] tracking-widest text-[var(--muted)]">PROJECTS</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] py-3">
              <p className="text-lg font-bold">PK · Remote</p>
              <p className="text-[10px] tracking-widest text-[var(--muted)]">COVERAGE</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-[var(--text)] px-6 py-2.5 text-sm font-semibold text-[var(--invert-text)]"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[var(--border)] px-6 py-2.5 text-sm font-semibold hover:border-[var(--text)]/40"
            >
              Get in touch
            </a>
          </div>

          <p className="mt-8 text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
            LET'S CONNECT
          </p>
          <div className="mt-3 flex items-center justify-center gap-4">
            <a
              href={SOCIALS.github || "#"}
              target={SOCIALS.github ? "_blank" : undefined}
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--text)]/40"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={SOCIALS.linkedin || "#"}
              target={SOCIALS.linkedin ? "_blank" : undefined}
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--text)]/40"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="mailto:umairwarind360@gmail.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--text)]/40"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-[var(--muted)]">Scroll to explore ↓</p>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="BACKGROUND" title="About Me" subtitle="A snapshot of who I am and how to reach me.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-xs font-semibold tracking-widest text-[var(--muted)]">LOCATION</p>
              <p className="mt-2 text-[15px] font-medium">Rahim Yar Khan, Pakistan - (open to relocate)</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-xs font-semibold tracking-widest text-[var(--muted)]">EMAIL</p>
              <p className="mt-2 text-[15px] font-medium">umairwarind360@gmail.com</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-xs font-semibold tracking-widest text-[var(--muted)]">STATUS</p>
              <p className="mt-2 flex items-center gap-2 text-[15px] font-medium">
                <CheckShieldIcon className="h-4 w-4" /> Open to work
              </p>
            </div>
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed text-[var(--muted)]">
            <p>
              I'm a MERN stack developer graduating from KFUEIT in 2026, with
              roughly two years of hands-on experience — first as a web
              developer at Coding Solution 24, then as a MERN developer at
              Mercury Sols. That time built up a stack that goes past CRUD:
              queues, webhooks, and AI integrations layered on top.
            </p>
            <p>
              My current focus is AI-integrated full-stack work — retrieval
              pipelines, agent orchestration, and the unglamorous plumbing
              (auth, billing, background jobs) that makes an AI feature
              production-ready instead of a demo.
            </p>
            <p>
              I'm currently deepening Next.js, AWS, GraphQL, and automated
              testing — happy to say that plainly rather than dress up a
              resume.
            </p>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section
        id="experience"
        eyebrow="CAREER"
        title="Work Experience"
        subtitle="Roughly two years building full-stack web applications, moving from CRUD features toward AI-integrated systems."
      >
        <div className="space-y-6 border-l border-[var(--border)] pl-8">
          {EXPERIENCE.map((job) => (
            <div key={job.company} className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <span className="absolute -left-[38px] top-8 h-3 w-3 rounded-full bg-[var(--text)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-bold">{job.role}</h3>
                <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-medium text-[var(--muted)]">
                  {job.period}
                </span>
              </div>
              <p className="text-sm font-medium">{job.company}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)]">{job.summary}</p>
              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[13px] leading-relaxed text-[var(--muted)]"
                  >
                    <span
                      className="mt-0.5 flex-shrink-0 text-[var(--text)]"
                      aria-hidden="true"
                    >
                      →
                    </span>

                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <span key={t} className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-medium text-[var(--muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section
        id="skills"
        eyebrow="CAPABILITIES"
        title="Skills & Tools"
        subtitle="Built up over roughly two years across agency freelance work and personal AI-integrated projects."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <div key={s.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold tracking-wide">{s.label.toUpperCase()}</h3>
                <span className="text-xs font-mono text-[var(--muted)]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{s.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span key={item} className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section
        id="projects"
        eyebrow="SELECTED WORK"
        title="Projects"
        subtitle="Three builds spanning multi-tenant SaaS billing, RAG document intelligence, and a reinforcement-learning career platform."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section
        id="contact"
        eyebrow="GET IN TOUCH"
        title="Let's Work Together"
        subtitle="Have a project in mind or a role to discuss? I read every message."
        className="pb-32"
      >
        <div className="mx-auto max-w-xl space-y-4">
          <a
            href="mailto:umairwarind360@gmail.com"
            className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--text)]/40"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]">
                <MailIcon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-widest text-[var(--muted)]">EMAIL</span>
                <span className="block text-[15px] font-medium">umairwarind360@gmail.com</span>
              </span>
            </span>
            <ExternalIcon className="h-4 w-4 text-[var(--muted)]" />
          </a>

          <a
            href="tel:+923021296089"
            className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--text)]/40"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]">
                <PhoneIcon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-widest text-[var(--muted)]">PHONE</span>
                <span className="block text-[15px] font-medium">+92 302 1296089</span>
              </span>
            </span>
            <ExternalIcon className="h-4 w-4 text-[var(--muted)]" />
          </a>

          {SOCIALS.github && (
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--text)]/40"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]">
                  <GithubIcon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-widest text-[var(--muted)]">GITHUB</span>
                  <span className="block text-[15px] font-medium">{SOCIALS.github.replace("https://", "")}</span>
                </span>
              </span>
              <ExternalIcon className="h-4 w-4 text-[var(--muted)]" />
            </a>
          )}

          {SOCIALS.linkedin && (
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--text)]/40"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]">
                  <LinkedinIcon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-widest text-[var(--muted)]">LINKEDIN</span>
                  <span className="block text-[15px] font-medium">{SOCIALS.linkedin.replace("https://", "")}</span>
                </span>
              </span>
              <ExternalIcon className="h-4 w-4 text-[var(--muted)]" />
            </a>
          )}

          {!SOCIALS.github && !SOCIALS.linkedin && (
            <p className="text-center text-[13px] text-[var(--muted)]">
              {/* Fill SOCIALS at the top of this file with your real URLs and
                  these cards render automatically. */}
              GitHub and LinkedIn cards will appear here once their URLs are added.
            </p>
          )}
        </div>
      </Section>

      <footer className="border-t border-[var(--border)] px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Umair Rasheed. Thanks for visiting.
          </p>
          <p className="font-mono text-[11px] tracking-widest text-[var(--muted)]">
            REACT · VITE · TAILWIND CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
