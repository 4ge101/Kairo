import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import type { FunctionalComponent } from "preact";
import "../styles/Guide.css";

type Step = {
  title: string;
  body: string;
};

type Guide = {
  id: string;
  category: string;
  title: string;
  summary: string;
  time: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  steps: Step[];
};

const GUIDES: Guide[] = [
  {
    id: "g1",
    category: "GETTING STARTED",
    title: "Join the Community",
    summary: "Everything you need to become an active Kairo member in minutes.",
    time: "5 MIN READ",
    level: "BEGINNER",
    steps: [
      {
        title: "Join our Discord",
        body: "Head to discord.gg/kairo and click Join. This is our main hub for everything — announcements, help, and project collabs.",
      },
      {
        title: "Introduce yourself",
        body: "Post a short intro in #introductions. Tell us your name, what you build, and what you want to learn.",
      },
      {
        title: "Pick your roles",
        body: "Visit #get-roles and select the areas that match your interests: Web, Design, Mobile, AI, or Open Source.",
      },
      {
        title: "Show up to an event",
        body: "Check the Events page for the next session. First-timers always get a warm welcome.",
      },
    ],
  },
  {
    id: "g2",
    category: "GETTING STARTED",
    title: "Set Up Your Dev Environment",
    summary: "Get your machine ready for coding from scratch — no prior setup assumed.",
    time: "10 MIN READ",
    level: "BEGINNER",
    steps: [
      {
        title: "Install VS Code",
        body: "Download Visual Studio Code from code.visualstudio.com. It's free, fast, and what most Kairo members use.",
      },
      {
        title: "Install Node.js",
        body: "Head to nodejs.org and download the LTS version. This gives you npm, the package manager we use for most projects.",
      },
      {
        title: "Install Git",
        body: "Go to git-scm.com and install Git for your OS. Run git --version in your terminal to confirm it works.",
      },
      {
        title: "Clone your first repo",
        body: "Find a project on github.com/kairo, click Code → Copy the URL, then run git clone <url> in your terminal.",
      },
    ],
  },
  {
    id: "g3",
    category: "CONTRIBUTING",
    title: "Contribute to a Project",
    summary: "How to find issues, make changes, and submit your first pull request.",
    time: "8 MIN READ",
    level: "INTERMEDIATE",
    steps: [
      {
        title: "Fork the repository",
        body: "On GitHub, click the Fork button at the top right of any Kairo project. This creates your own copy to work on.",
      },
      {
        title: "Create a branch",
        body: "Run git checkout -b your-feature-name. Never commit directly to main — branches keep things clean and reviewable.",
      },
      {
        title: "Make your changes",
        body: "Write your code, test it locally, and make sure nothing is broken. Small, focused changes are easier to review.",
      },
      {
        title: "Open a Pull Request",
        body: "Push your branch, go to GitHub, and click Compare & pull request. Describe what you changed and why.",
      },
    ],
  },
  {
    id: "g4",
    category: "CONTRIBUTING",
    title: "Write Good Commit Messages",
    summary: "Clear commits make collaboration smooth. Here's the Kairo convention.",
    time: "4 MIN READ",
    level: "BEGINNER",
    steps: [
      {
        title: "Use a prefix",
        body: "Start with feat:, fix:, docs:, chore:, or refactor: — e.g. feat: add dark mode toggle.",
      },
      {
        title: "Keep the subject under 72 chars",
        body: "The first line is a summary. Be specific but brief: fix: correct navbar overflow on mobile, not fixed stuff.",
      },
      {
        title: "Add a body for context",
        body: "If the why isn't obvious, add a blank line then a longer explanation. Future contributors will thank you.",
      },
    ],
  },
  {
    id: "g5",
    category: "EVENTS",
    title: "Run a Workshop",
    summary: "Want to teach something? Here's how to propose and host a Kairo session.",
    time: "6 MIN READ",
    level: "INTERMEDIATE",
    steps: [
      {
        title: "Pick a topic you know well",
        body: "Workshops work best when you're sharing real experience. Even a 30-minute intro to a tool you use is valuable.",
      },
      {
        title: "Submit a proposal",
        body: "Post in #workshop-ideas on Discord with your topic, format, and rough time estimate. The team will help you shape it.",
      },
      {
        title: "Prepare materials",
        body: "Slides, a code sandbox, or a live demo — whatever fits your style. Keep it interactive, not just a lecture.",
      },
      {
        title: "Host and follow up",
        body: "After the session, share your resources in Discord. Ask for feedback so the next one is even better.",
      },
    ],
  },
  {
    id: "g6",
    category: "EVENTS",
    title: "Prepare for a Hackathon",
    summary: "Make the most of your hackathon time with this pre-event checklist.",
    time: "7 MIN READ",
    level: "ADVANCED",
    steps: [
      {
        title: "Form or join a team early",
        body: "Check #team-formation on Discord before the event. Balanced teams — design, frontend, backend — perform better.",
      },
      {
        title: "Set up your stack in advance",
        body: "Don't waste hackathon hours on boilerplate. Pre-configure your repo, deploy pipeline, and auth if you plan to use one.",
      },
      {
        title: "Scope ruthlessly on day one",
        body: "Agree on a core feature list in the first hour. A polished small product beats a broken ambitious one every time.",
      },
      {
        title: "Ship early, iterate fast",
        body: "Get something deployed and working as early as possible. Judges prefer a live demo over a promising prototype.",
      },
    ],
  },
];

const CATEGORIES = ["ALL", ...Array.from(new Set(GUIDES.map((g) => g.category)))];

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "#7ed321",
  INTERMEDIATE: "#f5a623",
  ADVANCED: "#ff6b6b",
};

const Guides: FunctionalComponent = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [openGuide, setOpenGuide] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openGuide) setOpenGuide(null);
        else route("/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openGuide]);

  const filtered = activeCategory === "ALL"
    ? GUIDES
    : GUIDES.filter((g) => g.category === activeCategory);

  const toggle = (id: string) => setOpenGuide((prev) => (prev === id ? null : id));

  return (
    <div class="gd-viewport">
      <div class="gd-topbar">
        <button class="gd-back-btn" onClick={() => (openGuide ? setOpenGuide(null) : route("/"))}>
          <span class="gd-back-key">ESC</span>
          <span class="gd-back-label">BACK</span>
        </button>
        <div class="gd-topbar-right">
          <span class="gd-topbar-label">{filtered.length} GUIDES</span>
        </div>
      </div>

      <div class="gd-content">
        <div class="gd-hero">
          <div class="gd-hero-top">
            <span class="gd-tag">LEARN BY DOING</span>
            <div class="gd-hero-line" />
          </div>
          <h1 class="gd-title">GUIDES</h1>
          <p class="gd-lead">
            Step-by-step resources to help you contribute, build, and grow inside Kairo.
          </p>
        </div>

        <div class="gd-layout">
          <aside class="gd-sidebar">
            <div class="gd-filters">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  class={`gd-filter-btn${activeCategory === cat ? " gd-filter-btn--active" : ""}`}
                  onClick={() => { setActiveCategory(cat); setOpenGuide(null); }}
                >
                  <span class="gd-filter-label">{cat}</span>
                  <span class="gd-filter-count">
                    {cat === "ALL" ? GUIDES.length : GUIDES.filter((g) => g.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            <div class="gd-legend">
              <p class="gd-legend-title">DIFFICULTY</p>
              {(["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const).map((lvl) => (
                <div key={lvl} class="gd-legend-item">
                  <span class="gd-legend-dot" style={{ background: LEVEL_COLORS[lvl] }} />
                  <span class="gd-legend-label">{lvl}</span>
                </div>
              ))}
            </div>
          </aside>

          <div class="gd-list">
            {filtered.map((guide, idx) => {
              const isOpen = openGuide === guide.id;
              return (
                <div
                  key={guide.id}
                  class={`gd-card${isOpen ? " gd-card--open" : ""}`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <button class="gd-card-header" onClick={() => toggle(guide.id)}>
                    <span class="gd-card-num">{String(idx + 1).padStart(2, "0")}</span>

                    <div class="gd-card-meta">
                      <div class="gd-card-top">
                        <h2 class="gd-card-title">{guide.title}</h2>
                        <div class="gd-card-badges">
                          <span
                            class="gd-badge gd-badge--level"
                            style={{ background: LEVEL_COLORS[guide.level] }}
                          >
                            {guide.level}
                          </span>
                          <span class="gd-badge gd-badge--time">{guide.time}</span>
                          <span class="gd-badge gd-badge--cat">{guide.category}</span>
                        </div>
                      </div>
                      <p class="gd-card-summary">{guide.summary}</p>
                    </div>

                    <div class={`gd-chevron${isOpen ? " gd-chevron--open" : ""}`}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M4 7l6 6 6-6" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div class="gd-steps">
                      {guide.steps.map((step, si) => (
                        <div key={si} class="gd-step">
                          <div class="gd-step-left">
                            <div class="gd-step-num">{si + 1}</div>
                            {si < guide.steps.length - 1 && <div class="gd-step-line" />}
                          </div>
                          <div class="gd-step-body">
                            <h3 class="gd-step-title">{step.title}</h3>
                            <p class="gd-step-text">{step.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;