import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import portrait from "../assets/sarthak-portrait.jpeg.asset.json";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Sarthak Nirgude | Full Stack Developer & Java/React Engineer Portfolio" },
      {
        name: "description",
        content:
          "Personal portfolio of Sarthak Nirgude, a Full Stack Software Engineer based in Pune. Specialized in building scalable applications with Java, React, Next.js, and AI integrations.",
      },
      { property: "og:title", content: "Sarthak Nirgude | Full Stack Developer & Java/React Engineer Portfolio" },
      {
        property: "og:description",
        content:
          "Personal portfolio of Sarthak Nirgude, a Full Stack Software Engineer based in Pune. Specialized in building scalable applications with Java, React, Next.js, and AI integrations.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: portrait.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sarthak Nirgude | Full Stack Developer & Java/React Engineer Portfolio" },
      {
        name: "twitter:description",
        content: "Personal portfolio of Sarthak Nirgude, a Full Stack Software Engineer based in Pune.",
      },
      { name: "twitter:image", content: portrait.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "#person",
              name: "Sarthak Nirgude",
              jobTitle: "Software Engineer",
              worksFor: { "@type": "Organization", name: "Yardi Software" },
              image: portrait.url,
              address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
              sameAs: [
                "https://github.com/Sarthak000001",
                "https://linkedin.com/in/sarthaknirgude7",
              ],
            },
            {
              "@type": "ProfilePage",
              "@id": "#webpage",
              url: "/",
              name: "Sarthak Nirgude | Full Stack Developer & Java/React Engineer Portfolio",
              about: { "@id": "#person" }
            }
          ]
        }),
      },
    ],
  }),
});

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const SKILLS: [string, string][] = [
  ["Languages", "C++, Java, Python, SQL"],
  ["Frontend", "HTML/CSS, JavaScript, ReactJS, Next.js, Tailwind CSS"],
  ["Backend", "Node.js, Express.js"],
  ["Databases", "MySQL, MongoDB, PostgreSQL"],
  ["AI / ML", "Random Forest, TensorFlow, OpenCV, Google Gemini API"],
  ["Auth & Infra", "JWT, Clerk, bcrypt, Multer, Drizzle ORM, Razorpay"],
  ["Tools", "Git, GitHub, Postman, Figma, VS Code, SQL Profiler"],
  ["Core CS", "DSA, OOP, DBMS, Operating Systems"],
];

type Project = {
  name: string;
  tags: string[];
  bullets: string[];
  link?: string;
};

const PROJECTS: Project[] = [
  {
    name: "AGROGURU — Smart Agriculture Platform",
    tags: ["MERN Stack", "Random Forest", "Figma", "JWT", "REST API"],
    bullets: [
      "AI-driven web platform for farmers: crop prediction, weather intelligence, marketplace, laboratory, and nursery services — all in one application.",
      "Designed and trained a Random Forest classifier to recommend optimal crops based on soil nutrients and environmental parameters.",
      "Secured with JWT authentication; location-aware services connect farmers to local labs, nurseries, and crop markets via REST APIs.",
    ],
    link: "https://github.com/Sarthak000001",
  },
  {
    name: "PREPSMART — AI Interview Preparation Platform",
    tags: ["Next.js", "Google Gemini", "OpenCV", "TensorFlow", "PostgreSQL", "Clerk"],
    bullets: [
      "Full-stack interview prep platform: generates personalized mock interviews, records voice responses, and delivers automated feedback via Google Gemini.",
      "Built a computer vision pipeline (OpenCV + TensorFlow + Keras) to detect facial emotions from webcam frames — outputs confidence and engagement scores.",
      "Analytics dashboard shows performance ratings, emotion trends, and question-wise feedback; MCQ module adds adaptive technical assessment.",
    ],
    link: "https://github.com/Sarthak000001",
  },
  {
    name: "NIHONGONOW — Conversational Japanese Learning Platform",
    tags: ["Next.js 14", "MongoDB", "Google Gemini", "Clerk", "Framer Motion"],
    bullets: [
      "Full-stack SaaS app delivering AI-powered Japanese learning via Gemini-driven chat, voice-to-text, text-to-speech, translation, and transliteration.",
      "Premium Zen-modern UI built with Tailwind CSS, Framer Motion, and glassmorphism — designed to feel as refined as the language it teaches.",
    ],
    link: "https://github.com/Sarthak000001",
  },
  {
    name: "VENUEVISTA — Accommodation Booking Marketplace",
    tags: ["MERN Stack", "JWT", "bcrypt", "Multer", "Tailwind CSS", "REST API"],
    bullets: [
      "Full-stack Airbnb-style platform: hosts list and manage properties; guests search, filter, and book accommodations across devices.",
      "Secured with JWT + HTTP-only cookies + bcrypt password hashing; async image upload handled via Multer with remote image processing.",
      "Mobile-first UI built with React, Tailwind CSS, React Router, and Context API for seamless cross-device booking experience.",
    ],
    link: "https://github.com/Sarthak000001",
  },
  {
    name: "EASYSHARE — Secure File Sharing Platform",
    tags: ["MERN Stack"],
    bullets: [
      "Document sharing platform engineered for efficiency and security across devices.",
    ],
    link: "https://github.com/Sarthak000001",
  },
];

function useTypewriter(text: string, speed = 90, startDelay = 0, enabled = true) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!enabled) { setOut(text); setDone(true); return; }
    setOut("");
    setDone(false);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(() => {
      const tick = () => {
        i++;
        setOut(text.slice(0, i));
        if (i < text.length) timer = setTimeout(tick, speed);
        else setDone(true);
      };
      tick();
    }, startDelay);
    return () => { clearTimeout(startTimer); clearTimeout(timer); };
  }, [text, speed, startDelay, enabled]);
  return { out, done };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join(",")]);
  return active;
}

function PortfolioPage() {
  useReveal();
  const reduced = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const name = useTypewriter("SARTHAK NIRGUDE", 110, 300, !reduced);
  const tag = useTypewriter(
    "Software Engineer. Problem solver. Can't leave things half-finished.",
    22,
    300 + 110 * 15 + 200,
    !reduced && name.done
  );
  const active = useActiveSection(["hero", ...NAV.map((n) => n.id)]);

  const onNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="font-serif text-ink">
      <Nav active={active} onNavClick={onNavClick} />
      <main>
        <Hero name={name} tag={tag} onNavClick={onNavClick} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
      </main>
      <Contact />
    </div>
  );
}

function Nav({ active, onNavClick }: { active: string; onNavClick: (e: React.MouseEvent, id: string) => void }) {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-[2px]"
      style={{ background: "color-mix(in srgb, var(--color-paper) 90%, transparent)", borderBottom: "1px solid var(--color-grid-line)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-4 sm:flex-row sm:justify-between">
        <a href="#hero" onClick={(e) => onNavClick(e, "hero")} className="font-display text-2xl tracking-wider" style={{ color: "var(--color-blueprint)" }}>
          SN
        </a>
        <nav aria-label="Main Navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em]">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => onNavClick(e, n.id)}
              style={{ color: active === n.id ? "var(--color-red-mark)" : "var(--color-muted-ink)" }}
              className="transition-colors hover:[color:var(--color-red-mark)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero({
  name,
  tag,
  onNavClick,
}: {
  name: { out: string; done: boolean };
  tag: { out: string; done: boolean };
  onNavClick: (e: React.MouseEvent, id: string) => void;
}) {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-64px)] px-6">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col justify-center py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: "var(--color-muted-ink)" }}>
          Engineer / Developer / Pune, IN
        </p>
        <h1
          className="mt-6 font-display leading-[1.02] tracking-[0.04em]"
          style={{ color: "var(--color-blueprint)", fontSize: "clamp(52px, 9.5vw, 112px)" }}
        >
          {name.out}
          {!tag.done && <span className="cursor-blink" />}
        </h1>
        <p className="mt-8 max-w-3xl font-mono text-base sm:text-lg" style={{ color: "var(--color-ink)" }}>
          {tag.out}
          {name.done && !tag.done && <span className="cursor-blink" />}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            onClick={(e) => onNavClick(e, "projects")}
            className="font-mono text-xs uppercase tracking-[0.22em] px-7 py-4 transition-colors"
            style={{ background: "var(--color-blueprint)", color: "var(--color-paper)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-red-mark)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-blueprint)")}
          >
            View Projects →
          </a>
          <a
            href="#"
            className="font-mono text-xs uppercase tracking-[0.22em] px-7 py-4 transition-colors"
            style={{ border: "1.5px solid var(--color-blueprint)", color: "var(--color-blueprint)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-red-mark)"; e.currentTarget.style.color = "var(--color-red-mark)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-blueprint)"; e.currentTarget.style.color = "var(--color-blueprint)"; }}
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="pointer-events-auto absolute bottom-6 left-6 flex gap-3">
        {[
          { label: "GH", href: "https://github.com/Sarthak000001", ariaLabel: "GitHub Profile" },
          { label: "LI", href: "https://linkedin.com/in/sarthaknirgude7", ariaLabel: "LinkedIn Profile" },
          { label: "✉", href: "mailto:sarthaknirgude8@gmail.com", ariaLabel: "Send an Email" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-[11px] transition-colors"
            style={{ border: "1.5px solid var(--color-blueprint)", color: "var(--color-blueprint)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-red-mark)"; e.currentTarget.style.color = "var(--color-red-mark)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-blueprint)"; e.currentTarget.style.color = "var(--color-blueprint)"; }}
          >
            {s.label}
          </a>
        ))}
      </div>

      <div
        className="pointer-events-none absolute bottom-10 right-6 hidden font-mono text-[10px] uppercase tracking-[0.32em] md:flex"
        style={{ color: "var(--color-muted-ink)", writingMode: "vertical-rl" }}
      >
        Scroll to explore <span className="pulse-arrow ml-2">↓</span>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="reveal mb-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: "var(--color-muted-ink)" }}>
        {kicker}
      </p>
      <h2 className="mt-3 font-display tracking-[0.04em]" style={{ color: "var(--color-blueprint)", fontSize: "clamp(36px, 5vw, 56px)" }}>
        {title}
      </h2>
      <Divider />
    </div>
  );
}

function Divider() {
  return (
    <svg className="mt-6 w-full" height="12" viewBox="0 0 1200 12" preserveAspectRatio="none" aria-hidden>
      <path
        d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6 T150,6 T180,6 T210,6 T240,6 T270,6 T300,6 T330,6 T360,6 T390,6 T420,6 T450,6 T480,6 T510,6 T540,6 T570,6 T600,6 T630,6 T660,6 T690,6 T720,6 T750,6 T780,6 T810,6 T840,6 T870,6 T900,6 T930,6 T960,6 T990,6 T1020,6 T1050,6 T1080,6 T1110,6 T1140,6 T1170,6 T1200,6"
        fill="none"
        stroke="var(--color-blueprint)"
        strokeWidth="1.2"
        opacity="0.55"
      />
    </svg>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="§ 01 — Personnel File" title="About" />
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="reveal lg:col-span-2 lg:h-full lg:min-h-[480px] flex flex-col">
            <figure
              className="crop-corners relative flex flex-col justify-between lg:h-full w-full"
              style={{ border: "1.5px solid var(--color-blueprint)", background: "var(--color-stamp-bg)", padding: "10px" }}
            >
              <span className="cc-tl" /><span className="cc-tr" />
              <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:flex-grow overflow-hidden">
                <img
                  src={portrait.url}
                  alt="Portrait of Sarthak Nirgude, Software Engineer based in Pune, India"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="500"
                  className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
                  style={{ filter: "grayscale(0.15) contrast(1.02)" }}
                />
              </div>
              <figcaption
                className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] shrink-0"
                style={{ color: "var(--color-muted-ink)" }}
              >
                <span>Plate 01 — S. Nirgude</span>
                <span>Pune · IN</span>
              </figcaption>
            </figure>
          </div>
          <div className="reveal lg:col-span-3 space-y-5 text-[17px] leading-[1.8] flex flex-col justify-center">
            <p>
              I'm a Computer Engineering graduate from PICT, Pune. I've always been the kind of person who can't leave a problem half-solved — whether it's a broken query or a system that just doesn't feel right, I keep at it until it clicks.
            </p>
            <p>
              Right now I'm a Software Engineer at <span style={{ color: "var(--color-blueprint)" }} className="font-semibold">Yardi Software</span>, making sure SQL reports don't just work — they work well. Java is home base. But I've built enough across the full stack to know how all the pieces fit together.
            </p>
            <p>
              What excites me isn't any single technology. It's building something that scales, holds up under pressure, and actually makes someone's life easier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatStamp({ big, middle, small }: { big: string; middle: string; small: string }) {
  return (
    <div className="crop-corners relative p-7" style={{ background: "var(--color-stamp-bg)", border: "1.5px solid var(--color-blueprint)" }}>
      <span className="cc-tl" /><span className="cc-tr" />
      <div className="font-display text-4xl sm:text-5xl" style={{ color: "var(--color-blueprint)" }}>{big}</div>
      <div className="mt-3 stamp text-xs">{middle}</div>
      <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--color-muted-ink)" }}>{small}</div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="§ 02 — Technical Specification" title="Skills" />
        <div className="reveal">
          {SKILLS.map(([cat, list], i) => (
            <div
              key={cat}
              className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6"
              style={{ borderTop: i === 0 ? "1px solid var(--color-grid-line)" : undefined, borderBottom: "1px solid var(--color-grid-line)" }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] sm:col-span-3" style={{ color: "var(--color-muted-ink)" }}>
                {cat}
              </div>
              <div className="font-mono text-[14px] sm:col-span-9" style={{ color: "var(--color-ink)" }}>
                {list}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: "var(--color-muted-ink)" }}>
            § 03 — Field Notes
          </p>
          <h2 className="mt-3 font-display tracking-[0.04em]" style={{ color: "var(--color-blueprint)", fontSize: "clamp(36px, 5vw, 56px)" }}>
            Selected Works
          </h2>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--color-muted-ink)" }}>
            Projects built from scratch. No templates.
          </p>
          <Divider />
        </div>
        <div className="space-y-8">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <article
      ref={ref}
      className="reveal crop-corners group relative p-7 sm:p-10 transition-[background,border-color] duration-200"
      style={{ background: "var(--color-stamp-bg)", border: "1.5px solid var(--color-blueprint)", borderLeftWidth: "1.5px" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#FFFFFF";
        e.currentTarget.style.borderLeftWidth = "4px";
        e.currentTarget.style.borderLeftColor = "var(--color-red-mark)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--color-stamp-bg)";
        e.currentTarget.style.borderLeftWidth = "1.5px";
        e.currentTarget.style.borderLeftColor = "var(--color-blueprint)";
      }}
    >
      <span className="cc-tl" /><span className="cc-tr" />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl sm:text-[28px] font-semibold leading-tight" style={{ color: "var(--color-blueprint)" }}>
          {project.name}
        </h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--color-red-mark)" }}
          >
            View on GitHub ↗
          </a>
        )}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1"
            style={{ background: "var(--color-paper)", border: "1px solid var(--color-blueprint)", color: "var(--color-blueprint)" }}
          >
            {t}
          </span>
        ))}
      </div>
      <ul className="mt-6 space-y-3 text-[16px] leading-[1.75]">
        {project.bullets.map((b, i) => (
          <li key={i} className="flex gap-3">
            <span style={{ color: "var(--color-red-mark)" }} aria-hidden>•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="§ 04 — Service Record" title="Work History" />
        <div className="reveal">
          <ExpRow
            year="2025 — NOW"
            role="Software Engineer"
            org="Yardi Software"
            body="Generated custom SQL reports using SQL Profiler to track, analyze, and optimize query performance across Yardi's platform."
            stamp="Currently Employed"
          />
          <ExpRow
            year="2024"
            role="Web Developer Intern"
            org="DG-infosolution · Jan 2024 – April 2024"
            body="Built full e-commerce flow in ReactJS + Tailwind CSS + Firebase: auth, cart, checkout, admin dashboard. Integrated Razorpay payment gateway. Delivered responsive UI across devices."
          />
        </div>
      </div>
    </section>
  );
}

function ExpRow({ year, role, org, body, stamp }: { year: string; role: string; org: string; body: string; stamp?: string }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-12 sm:gap-10"
      style={{ borderTop: "1px solid var(--color-grid-line)" }}
    >
      <div className="font-mono text-xs uppercase tracking-[0.22em] sm:col-span-3" style={{ color: "var(--color-muted-ink)" }}>
        {year}
      </div>
      <div className="sm:col-span-9">
        <div className="flex flex-wrap items-baseline gap-4">
          <h3 className="font-mono text-base uppercase tracking-[0.18em]" style={{ color: "var(--color-blueprint)" }}>{role}</h3>
          {stamp && <span className="stamp text-[10px]" style={{ transform: "rotate(-2deg)" }}>{stamp}</span>}
        </div>
        <p className="mt-1 font-serif italic" style={{ color: "var(--color-muted-ink)" }}>{org}</p>
        <p className="mt-4 text-[16px] leading-[1.8]">{body}</p>
      </div>
    </div>
  );
}

function Education() {
  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="§ 05 — Academic Record" title="Education & Activities" />
        <div className="reveal grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <EduCard
              year="2021 – 2025"
              school="SCTR's Pune Institute of Computer Technology, Pune"
              detail="BE in Computer Engineering"
              score="CGPA — 9.02 / 10"
            />
            <EduCard
              year="2019 – 2021"
              school="K.K.Wagh Junior College, Nashik"
              detail="12th Grade"
              score="Percentage — 89.83 (3rd in college)"
            />
            <EduCard
              year="2014 – 2019"
              school="Pimpalgaon Baswant Highschool, Nashik"
              detail="10th Grade"
              score="Percentage — 88.20 (1st in my school)"
            />
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--color-muted-ink)" }}>Activities & Volunteering</p>
            <ul className="mt-4 space-y-3 text-[16px] leading-[1.8]">
              {[
                "Member, PICT ACM Student Chapter (PASC)",
                "Volunteer, Pulzion'23 — Annual Techfest (event org, leadership)",
                "Volunteer, National ACM Summit 2023 — IISER Pune",
              ].map((a) => (
                <li key={a} className="flex gap-3">
                  <span style={{ color: "var(--color-red-mark)" }}>•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function EduCard({ year, school, detail, score }: { year: string; school: string; detail: string; score: string }) {
  return (
    <div className="crop-corners relative p-7" style={{ background: "var(--color-stamp-bg)", border: "1.5px solid var(--color-blueprint)" }}>
      <span className="cc-tl" /><span className="cc-tr" />
      <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--color-muted-ink)" }}>{year}</p>
      <h3 className="mt-2 font-serif text-xl font-semibold" style={{ color: "var(--color-blueprint)" }}>{school}</h3>
      <p className="mt-2 text-[15px]">{detail}</p>
      <div className="mt-4 stamp text-[11px]">{score}</div>
    </div>
  );
}

function Contact() {
  return (
    <footer id="contact" className="px-6 py-28" style={{ background: "var(--color-blueprint)", color: "var(--color-paper)" }}>
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: "var(--color-grid-line)" }}>
          § 06 — Transmission
        </p>
        <h2 className="reveal mt-3 font-display tracking-[0.04em]" style={{ fontSize: "clamp(38px, 5.5vw, 64px)" }}>
          Let's build something worth building.
        </h2>
        <p className="reveal mt-4 font-mono text-sm" style={{ color: "var(--color-grid-line)" }}>
          Good conversations make better engineers.
        </p>
        <div className="reveal mt-12 space-y-4 font-mono text-[15px]">
          {[
            { k: "✉", v: "sarthaknirgude8@gmail.com", h: "mailto:sarthaknirgude8@gmail.com", label: "Email Sarthak" },
            { k: "GH", v: "github.com/Sarthak000001", h: "https://github.com/Sarthak000001", label: "GitHub Profile" },
            { k: "LI", v: "linkedin.com/in/sarthaknirgude7", h: "https://linkedin.com/in/sarthaknirgude7", label: "LinkedIn Profile" },
          ].map((c) => (
            <a
              key={c.k}
              href={c.h}
              aria-label={c.label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 py-3 transition-colors"
              style={{ borderBottom: "1px solid color-mix(in srgb, var(--color-paper) 25%, transparent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F4B7AE")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-paper)")}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[11px]" style={{ border: "1.5px solid var(--color-paper)" }}>
                {c.k}
              </span>
              <span className="tracking-wide">{c.v}</span>
              <span className="ml-auto opacity-50">↗</span>
            </a>
          ))}
        </div>
        <p className="mt-20 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "color-mix(in srgb, var(--color-paper) 55%, transparent)" }}>
          Designed with intention. Built with precision. © Sarthak Nirgude 2025.
        </p>
      </div>
    </footer>
  );
}
