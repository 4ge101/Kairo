import { useEffect, useRef, useState } from "preact/hooks";
import type { FunctionalComponent, JSX } from "preact";
import "../styles/Home.css";

// ── ICONS ──────────────────────────────────────────────
const ProjectsBgIcon = () => (
  <svg class="card-bg-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 10 L70 10 L110 50 L110 110 L20 110 Z" fill="#1a1a1a" />
    <path d="M65 10 L110 55 L65 55 Z" fill="#1a1a1a" opacity="0.5" />
    <line x1="35" y1="70" x2="95" y2="70" stroke="#f5a623" strokeWidth="5" />
    <line x1="35" y1="85" x2="80" y2="85" stroke="#f5a623" strokeWidth="5" />
  </svg>
);

const GuidesBgIcon = () => (
  <svg class="card-bg-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="45" height="45" rx="8" fill="#1a1a1a" />
    <rect x="65" y="10" width="45" height="45" rx="8" fill="#1a1a1a" />
    <rect x="10" y="65" width="45" height="45" rx="8" fill="#1a1a1a" />
    <rect x="65" y="65" width="45" height="45" rx="8" fill="#1a1a1a" />
  </svg>
);

const EventsBgIcon = () => (
  <svg class="card-bg-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="100" height="90" rx="10" fill="#1a1a1a" />
    <rect x="10" y="20" width="100" height="25" rx="10" fill="#1a1a1a" />
    <rect x="30" y="10" width="12" height="24" rx="6" fill="#1a1a1a" />
    <rect x="78" y="10" width="12" height="24" rx="6" fill="#1a1a1a" />
    <rect x="25" y="58" width="20" height="16" rx="4" fill="#f5a623" />
    <rect x="52" y="58" width="20" height="16" rx="4" fill="#f5a623" />
    <rect x="75" y="58" width="20" height="16" rx="4" fill="#f5a623" />
    <rect x="25" y="82" width="20" height="16" rx="4" fill="#f5a623" opacity="0.4" />
    <rect x="52" y="82" width="20" height="16" rx="4" fill="#f5a623" opacity="0.4" />
  </svg>
);

const HackathonBgIcon = () => (
  <svg class="card-bg-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="60,10 90,40 80,80 40,80 30,40" fill="#1a1a1a" opacity="0.6" />
    <circle cx="60" cy="55" r="18" fill="#1a1a1a" />
    <line x1="60" y1="10" x2="60" y2="37" stroke="#87ceeb" strokeWidth="4" />
    <line x1="60" y1="73" x2="60" y2="100" stroke="#87ceeb" strokeWidth="4" />
  </svg>
);

// ── CARD DATA ─────────────────────────────────────────
// Pattern: "big" | "double" (renders two small stacked)
// Add more entries here to extend the horizontal layout!

type BigCard = {
  type: "big";
  id: string;
  title: string;
  subtitle: string;
  color: string;
  textColor: string;
  icon: () => JSX.Element;
  href?: string;
};

type DoubleCard = {
  type: "double";
  id: string;
  top: {
    title: string;
    subtitle: string;
    color: string;
    textColor: string;
    icon: () => JSX.Element;
  };
  bottom: {
    title: string;
    subtitle: string;
    color: string;
    textColor: string;
    icon: () => JSX.Element;
  };
};

type CardEntry = BigCard | DoubleCard;

const CARDS: CardEntry[] = [
  {
    type: "big",
    id: "events",
    title: "Upcoming Community Events",
    subtitle: "No upcoming events.",
    color: "#f0ebe0",
    textColor: "#1a1a1a",
    icon: EventsBgIcon,
    href: "#",
  },
  {
    type: "double",
    id: "projects-guides",
    top: {
      title: "Projects",
      subtitle: "Create and ship your projects",
      color: "#f5a623",
      textColor: "#1a1a1a",
      icon: ProjectsBgIcon,
    },
    bottom: {
      title: "Guides",
      subtitle: "Learn to build stuff!",
      color: "#7ed321",
      textColor: "#1a1a1a",
      icon: GuidesBgIcon,
    },
  },
  {
    type: "big",
    id: "arcana",
    title: "Horizons Arcana",
    subtitle: "Singapore • JUL 31–AUG 2",
    color: "#87ceeb",
    textColor: "#2c5fa8",
    icon: HackathonBgIcon,
  },
  // ── ADD MORE CARDS BELOW ──
  // Copy a big or double block and change the fields!
  {
    type: "double",
    id: "explore-more",
    top: {
      title: "Workshops",
      subtitle: "Live sessions every week",
      color: "#e8a0f0",
      textColor: "#1a1a1a",
      icon: GuidesBgIcon,
    },
    bottom: {
      title: "Leaderboard",
      subtitle: "See top contributors",
      color: "#ffd166",
      textColor: "#1a1a1a",
      icon: ProjectsBgIcon,
    },
  },
  {
    type: "big",
    id: "community",
    title: "Community",
    subtitle: "Join 1000+ teen hackers",
    color: "#ff6b6b",
    textColor: "#1a1a1a",
    icon: EventsBgIcon,
  },
];

// ── COMPONENTS ────────────────────────────────────────
const BigCardEl: FunctionalComponent<{ card: BigCard; focused: boolean }> = ({ card, focused }) => (
  <div
    class={`h-card h-card--big${focused ? " h-card--focused" : ""}`}
    style={{ backgroundColor: card.color, color: card.textColor, borderColor: card.textColor }}
  >
    <card.icon />
    <h2 style={{ color: card.textColor }}>{card.title}</h2>
    <p style={{ color: card.textColor }}>{card.subtitle}</p>
    {card.href && (
      <a href={card.href} class="events-link-btn" style={{ borderColor: card.textColor, color: card.textColor }}>
        <span class="icon" />
        To View Community Events
      </a>
    )}
  </div>
);

const SmallCardEl: FunctionalComponent<{ data: DoubleCard["top"]; focused: boolean }> = ({ data, focused }) => (
  <div
    class={`h-card h-card--small${focused ? " h-card--focused" : ""}`}
    style={{ backgroundColor: data.color, color: data.textColor, borderColor: data.textColor }}
  >
    <data.icon />
    <h2 style={{ color: data.textColor }}>{data.title}</h2>
    <p style={{ color: data.textColor }}>{data.subtitle}</p>
  </div>
);

// ── HOME ──────────────────────────────────────────────
const Home: FunctionalComponent = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [focusedCol, setFocusedCol] = useState(0);
  const totalCols = CARDS.length;

  // Scroll to focused column
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const col = track.children[focusedCol] as HTMLElement;
    if (col) {
      col.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [focusedCol]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setFocusedCol((c) => Math.min(c + 1, totalCols - 1));
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setFocusedCol((c) => Math.max(c - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalCols]);

  return (
    <div class="h-viewport">
      <div class="h-track" ref={trackRef}>
        {CARDS.map((entry, colIdx) => {
          if (entry.type === "big") {
            return (
              <div
                key={entry.id}
                class="h-col h-col--big"
                onMouseEnter={() => setFocusedCol(colIdx)}
              >
                <BigCardEl card={entry} focused={focusedCol === colIdx} />
              </div>
            );
          } else {
            return (
              <div
                key={entry.id}
                class="h-col h-col--double"
                onMouseEnter={() => setFocusedCol(colIdx)}
              >
                <SmallCardEl data={entry.top} focused={focusedCol === colIdx} />
                <SmallCardEl data={entry.bottom} focused={focusedCol === colIdx} />
              </div>
            );
          }
        })}
      </div>

      {/* Nav hint */}
      <div class="h-nav-hint">
        <span>← →</span> or <span>A D</span> to navigate
        <div class="h-dots">
          {CARDS.map((_, i) => (
            <button
              key={i}
              class={`h-dot${focusedCol === i ? " h-dot--active" : ""}`}
              onClick={() => setFocusedCol(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;