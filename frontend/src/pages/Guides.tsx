import type { FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { route } from "preact-router";
import "../styles/Guide.css";

type Guide = {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  steps: number;
  color: string;
};

const GUIDES: Guide[] = [
  {
    id: "g1",
    category: "GETTING STARTED",
    title: "Welcome to Kairo",
    description:
      "Everything you need to know to get started in the Kairo Hack Club community.",
    duration: "5 min read",
    level: "BEGINNER",
    steps: 4,
    color: "#f5a623",
  },
  {
    id: "g2",
    category: "GETTING STARTED",
    title: "Joining Our Discord",
    description:
      "How to find us, verify yourself, and navigate our Discord server like a pro.",
    duration: "3 min read",
    level: "BEGINNER",
    steps: 3,
    color: "#7ed321",
  },
  {
    id: "g3",
    category: "EVENTS",
    title: "Attending Your First Event",
    description:
      "What to expect, what to bring, and how to make the most of Kairo events.",
    duration: "6 min read",
    level: "BEGINNER",
    steps: 5,
    color: "#e8a0f0",
  },
  {
    id: "g4",
    category: "EVENTS",
    title: "Running a Workshop",
    description:
      "A step-by-step guide to pitching, planning, and running your own workshop at Kairo.",
    duration: "10 min read",
    level: "INTERMEDIATE",
    steps: 7,
    color: "#ffd166",
  },
  {
    id: "g5",
    category: "PROJECTS",
    title: "Starting a Project",
    description:
      "How to propose, scope, and kick off a project within the Kairo community.",
    duration: "8 min read",
    level: "INTERMEDIATE",
    steps: 6,
    color: "#ff6b6b",
  },
  {
    id: "g6",
    category: "PROJECTS",
    title: "Showcasing Your Work",
    description:
      "Best practices for presenting your project at demo days and online platforms.",
    duration: "5 min read",
    level: "INTERMEDIATE",
    steps: 4,
    color: "#f5a623",
  },
  {
    id: "g7",
    category: "ADVANCED",
    title: "Becoming a Organizer",
    description:
      "What it takes to step up, lead initiatives, and shape the direction of Kairo.",
    duration: "12 min read",
    level: "ADVANCED",
    steps: 8,
    color: "#1a1a1a",
  },
  {
    id: "g8",
    category: "ADVANCED",
    title: "Open Source Contributions",
    description:
      "How to find Kairo repos, make meaningful PRs, and collaborate with the core team.",
    duration: "9 min read",
    level: "ADVANCED",
    steps: 6,
    color: "#7ed321",
  },
];

const CATEGORIES = [
  "ALL",
  ...Array.from(new Set(GUIDES.map((g) => g.category))),
];

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "#7ed321",
  INTERMEDIATE: "#f5a623",
  ADVANCED: "#ff6b6b",
};

const LEVEL_ORDER = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const ProgressRing: FunctionalComponent<{
  steps: number;
  color: string;
  isDark: boolean;
}> = ({ steps, color, isDark }) => {
  const max = 10;
  const pct = steps / max;
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;

  return (
    <svg class="gd-progress-ring" viewBox="0 0 44 44">
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={isDark ? "#f0ebe020" : "#1a1a1a20"}
        stroke-width="4"
      />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={isDark ? "#f0ebe0" : "#1a1a1a"}
        stroke-width="4"
        stroke-dasharray={`${dash} ${circ}`}
        stroke-linecap="round"
        transform="rotate(-90 22 22)"
        class="gd-ring-fill"
      />
      <text
        x="22"
        y="27"
        text-anchor="middle"
        font-size="11"
        font-weight="900"
        font-family="Arial Black, sans-serif"
        fill={isDark ? "#f0ebe0" : "#1a1a1a"}
      >
        {steps}
      </text>
    </svg>
  );
};

const GuideCard: FunctionalComponent<{
  guide: Guide;
  index: number;
  visible: boolean;
}> = ({ guide, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const isDark = guide.color === "#1a1a1a";

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div
      class={`gd-card${hovered ? " gd-card--hovered" : ""}${clicked ? " gd-card--clicked" : ""}${visible ? " gd-card--visible" : ""}`}
      style={{
        backgroundColor: guide.color,
        animationDelay: `${index * 60}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div class="gd-card-top">
        <span
          class="gd-card-index"
          style={{ color: isDark ? "#f0ebe0" : "#1a1a1a", opacity: 0.18 }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          class="gd-card-level"
          style={{
            backgroundColor: LEVEL_COLORS[guide.level],
            color: "#1a1a1a",
          }}
        >
          {guide.level}
        </span>
      </div>

      <div class="gd-card-body">
        <span
          class="gd-card-cat"
          style={{ color: isDark ? "#f0ebe047" : "#1a1a1a47" }}
        >
          {guide.category}
        </span>
        <h3
          class="gd-card-title"
          style={{ color: isDark ? "#f0ebe0" : "#1a1a1a" }}
        >
          {guide.title}
        </h3>
        <p
          class="gd-card-desc"
          style={{ color: isDark ? "#f0ebe0" : "#1a1a1a" }}
        >
          {guide.description}
        </p>
      </div>

      <div class="gd-card-footer">
        <div class="gd-card-meta">
          <ProgressRing
            steps={guide.steps}
            color={guide.color}
            isDark={isDark}
          />
          <div class="gd-meta-info">
            <span
              class="gd-meta-pill"
              style={{
                borderColor: isDark ? "#f0ebe040" : "#1a1a1a40",
                color: isDark ? "#f0ebe0" : "#1a1a1a",
              }}
            >
              {guide.steps} STEPS
            </span>
            <span
              class="gd-meta-pill"
              style={{
                borderColor: isDark ? "#f0ebe040" : "#1a1a1a40",
                color: isDark ? "#f0ebe0" : "#1a1a1a",
              }}
            >
              {guide.duration}
            </span>
          </div>
        </div>
        <button
          class="gd-card-btn"
          style={{
            backgroundColor: isDark ? "#f0ebe0" : "#1a1a1a",
            color: isDark ? "#1a1a1a" : "#f0ebe0",
            boxShadow: `3px 3px 0 ${isDark ? "#f0ebe040" : "#1a1a1a40"}`,
          }}
        >
          READ →
        </button>
      </div>

      <div class="gd-card-shine" style={{ opacity: hovered ? 1 : 0 }} />
    </div>
  );
};

const Guides: FunctionalComponent = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<"default" | "level" | "duration">(
    "default",
  );
  const [search, setSearch] = useState("");
  const [cardsVisible, setCardsVisible] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  let filtered =
    activeCategory === "ALL"
      ? GUIDES
      : GUIDES.filter((g) => g.category === activeCategory);

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q),
    );
  }

  if (sortBy === "level") {
    filtered = [...filtered].sort(
      (a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level),
    );
  } else if (sortBy === "duration") {
    filtered = [...filtered].sort(
      (a, b) => parseInt(a.duration) - parseInt(b.duration),
    );
  }

  useEffect(() => {
    setCardsVisible(false);
    const t = setTimeout(() => setCardsVisible(true), 30);
    return () => clearTimeout(t);
  }, [activeCategory, sortBy, search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") route("/");
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const completedCount = 0;
  const totalSteps = GUIDES.reduce((s, g) => s + g.steps, 0);

  return (
    <div class="gd-viewport">
      <div class="gd-topbar">
        <button class="gd-back-btn" onClick={() => route("/")}>
          <span class="gd-back-key">ESC</span>
          <span class="gd-back-label">BACK</span>
        </button>
        <div class="gd-topbar-right">
          <div class="gd-search-wrap">
            <span class="gd-search-icon">⌕</span>
            <input
              ref={searchRef}
              class="gd-search"
              type="text"
              placeholder="SEARCH GUIDES..."
              value={search}
              onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
            />
            <span class="gd-search-hint">⌘K</span>
          </div>
          <span class="gd-topbar-tag">NEW TO Kairo?</span>
        </div>
      </div>

      <div class="gd-body">
        <div class="gd-left">
          <div class="gd-title-wrap">
            <h1 class="gd-title">GUIDES</h1>
            <div class="gd-title-accent" />
          </div>
          <p class="gd-subtitle">
            Everything you need to find your footing and start building.
          </p>

          <div class="gd-stat-grid">
            <div class="gd-stat gd-stat--dark">
              <span class="gd-stat-num">{GUIDES.length}</span>
              <span class="gd-stat-label">GUIDES</span>
            </div>
            <div class="gd-stat gd-stat--green">
              <span class="gd-stat-num">{CATEGORIES.length - 1}</span>
              <span class="gd-stat-label">TOPICS</span>
            </div>
            <div class="gd-stat gd-stat--orange">
              <span class="gd-stat-num">{totalSteps}</span>
              <span class="gd-stat-label">STEPS</span>
            </div>
            <div class="gd-stat gd-stat--pink">
              <span class="gd-stat-num">{completedCount}</span>
              <span class="gd-stat-label">DONE</span>
            </div>
          </div>

          <div class="gd-section-label">FILTER BY TOPIC</div>
          <div class="gd-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                class={`gd-filter-btn${activeCategory === cat ? " gd-filter-btn--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span class="gd-filter-dot" />
                <span class="gd-filter-name">{cat}</span>
                <span class="gd-filter-count">
                  {cat === "ALL"
                    ? GUIDES.length
                    : GUIDES.filter((g) => g.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div class="gd-section-label">SORT BY</div>
          <div class="gd-sort-group">
            {(["default", "level", "duration"] as const).map((s) => (
              <button
                key={s}
                class={`gd-sort-btn${sortBy === s ? " gd-sort-btn--active" : ""}`}
                onClick={() => setSortBy(s)}
              >
                {s === "default"
                  ? "DEFAULT"
                  : s === "level"
                    ? "LEVEL ↑"
                    : "DURATION ↑"}
              </button>
            ))}
          </div>

          <div class="gd-level-legend">
            <span class="gd-legend-title">DIFFICULTY LEVELS</span>
            {Object.entries(LEVEL_COLORS).map(([level, color]) => (
              <div key={level} class="gd-legend-item">
                <span
                  class="gd-legend-dot"
                  style={{ backgroundColor: color }}
                />
                <span class="gd-legend-label">{level}</span>
                <span class="gd-legend-count">
                  {GUIDES.filter((g) => g.level === level).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div class="gd-right">
          {filtered.length === 0 ? (
            <div class="gd-empty">
              <span class="gd-empty-icon">◎</span>
              <span class="gd-empty-text">NO GUIDES MATCH YOUR SEARCH</span>
              <button
                class="gd-empty-btn"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("ALL");
                }}
              >
                CLEAR FILTERS
              </button>
            </div>
          ) : (
            <>
              <div class="gd-results-bar">
                <span class="gd-results-count">
                  {filtered.length} GUIDE{filtered.length !== 1 ? "S" : ""}
                </span>
                {search && <span class="gd-results-query">for "{search}"</span>}
              </div>
              <div class="gd-grid">
                {filtered.map((guide, idx) => (
                  <GuideCard
                    key={guide.id}
                    guide={guide}
                    index={idx}
                    visible={cardsVisible}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guides;
