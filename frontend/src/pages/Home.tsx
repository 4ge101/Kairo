import { useEffect, useRef, useState } from "preact/hooks";
import { route } from "preact-router";
import type { FunctionalComponent, JSX } from "preact";
import "../styles/Home.css";
import MouseIcon from "../assets/icons/mouse.svg";
import BackgroundCardImage from "../assets/images/bg.webp";

const ProjectsBgIcon = () => (
  <svg
    class="card-bg-icon"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 10 L70 10 L110 50 L110 110 L20 110 Z" fill="#1a1a1a" />
    <path d="M65 10 L110 55 L65 55 Z" fill="#1a1a1a" opacity="0.5" />
    <line x1="35" y1="70" x2="95" y2="70" stroke="#f5a623" strokeWidth="5" />
    <line x1="35" y1="85" x2="80" y2="85" stroke="#f5a623" strokeWidth="5" />
  </svg>
);

const GuidesBgIcon = () => (
  <svg
    class="card-bg-icon"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="10" width="45" height="45" rx="8" fill="#1a1a1a" />
    <rect x="65" y="10" width="45" height="45" rx="8" fill="#1a1a1a" />
    <rect x="10" y="65" width="45" height="45" rx="8" fill="#1a1a1a" />
    <rect x="65" y="65" width="45" height="45" rx="8" fill="#1a1a1a" />
  </svg>
);

const EventsBgIcon = () => (
  <svg
    class="card-bg-icon"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="20" width="100" height="90" rx="10" fill="#1a1a1a" />
    <rect x="10" y="20" width="100" height="25" rx="10" fill="#1a1a1a" />
    <rect x="30" y="10" width="12" height="24" rx="6" fill="#1a1a1a" />
    <rect x="78" y="10" width="12" height="24" rx="6" fill="#1a1a1a" />
    <rect x="25" y="58" width="20" height="16" rx="4" fill="#f5a623" />
    <rect x="52" y="58" width="20" height="16" rx="4" fill="#f5a623" />
    <rect x="75" y="58" width="20" height="16" rx="4" fill="#f5a623" />
    <rect
      x="25"
      y="82"
      width="20"
      height="16"
      rx="4"
      fill="#f5a623"
      opacity="0.4"
    />
    <rect
      x="52"
      y="82"
      width="20"
      height="16"
      rx="4"
      fill="#f5a623"
      opacity="0.4"
    />
  </svg>
);

type BigCard = {
  type: "big";
  id: string;
  title: string;
  subtitle: string;
  color: string;
  textColor: string;
  icon: () => JSX.Element;
  href: string;
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
    href: string;
  };
  bottom: {
    title: string;
    subtitle: string;
    color: string;
    textColor: string;
    icon: () => JSX.Element;
    href: string;
  };
};

type CardEntry = BigCard | DoubleCard;

const CARDS: CardEntry[] = [
  {
    type: "big",
    id: "events",
    title: "Upcoming Community Events",
    subtitle: "Teaching school students to code",
    color: "#f0ebe0",
    textColor: "#1a1a1a",
    icon: EventsBgIcon,
    href: "/events",
  },
  {
    type: "double",
    id: "about-us",
    top: {
      title: "about us",
      subtitle: "want to know about us",
      color: "#f5a623",
      textColor: "#1a1a1a",
      icon: ProjectsBgIcon,
      href: "/about",
    },
    bottom: {
      title: "guides",
      subtitle: "New to Kairo? We've Got You Covered",
      color: "#7ed321",
      textColor: "#1a1a1a",
      icon: GuidesBgIcon,
      href: "/guides",
    },
  },
  {
    type: "big",
    id: "social",
    title: "social medias",
    subtitle: "Join us in various platforms",
    color: "transparent",
    textColor: "#1a1a1a",
    icon: GuidesBgIcon,
    href: "/social",
  },
  {
    type: "double",
    id: "blog",
    top: {
      title: "blogs",
      subtitle: "read the blogs here",
      color: "#e8a0f0",
      textColor: "#1a1a1a",
      icon: GuidesBgIcon,
      href: "/blog",
    },
    bottom: {
      title: "contact",
      subtitle: "contact us",
      color: "#ffd166",
      textColor: "#1a1a1a",
      icon: ProjectsBgIcon,
      href: "/contact",
    },
  },
  {
    type: "big",
    id: "faq",
    title: "faq",
    subtitle: "need help",
    color: "#ff6b6b",
    textColor: "#1a1a1a",
    icon: EventsBgIcon,
    href: "/faq",
  },
];

const BigCardEl: FunctionalComponent<{ card: BigCard; focused: boolean }> = ({
  card,
  focused,
}) => (
  <div
    class={`h-card h-card--big${focused ? " h-card--focused" : ""}${card.id === "social" ? " h-card--social" : ""}`}
    style={{
      backgroundColor: card.color,
      color: card.textColor,
      borderColor: card.textColor,
      ...(card.id === "social" && {
        backgroundImage: `url(${BackgroundCardImage})`,
      }),
    }}
    onClick={() => route(card.href)}
  >
    <card.icon />
    <h2 style={{ color: card.textColor }}>{card.title}</h2>
    <p style={{ color: card.textColor }}>{card.subtitle}</p>
    {card.id === "events" && (
      <a
        href={card.href}
        class="events-link-btn"
        style={{ borderColor: card.textColor, color: card.textColor }}
        onClick={(e) => {
          e.preventDefault();
          route(card.href);
        }}
      >
        <span class="icon" />
        To View Community Events
      </a>
    )}
  </div>
);

const SmallCardEl: FunctionalComponent<{ data: DoubleCard["top"] }> = ({
  data,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      class={`h-card h-card--small${hovered ? " h-card--hovered" : ""}`}
      style={{
        backgroundColor: data.color,
        color: data.textColor,
        borderColor: data.textColor,
      }}
      onClick={() => route(data.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <data.icon />
      <h2 style={{ color: data.textColor }}>{data.title}</h2>
      <p style={{ color: data.textColor }}>{data.subtitle}</p>
    </div>
  );
};

const Home: FunctionalComponent = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [focusedCol, setFocusedCol] = useState(0);
  const totalCols = CARDS.length;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia("(max-width: 1024px)").matches;
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      isMobile.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const col = track.children[focusedCol] as HTMLElement;
    if (col)
      col.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
  }, [focusedCol]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        setFocusedCol((c) => Math.min(c + 1, totalCols - 1));
      else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
        setFocusedCol((c) => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalCols]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) setFocusedCol((c) => Math.min(c + 1, totalCols - 1));
      else setFocusedCol((c) => Math.max(c - 1, 0));
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div class="h-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
                <SmallCardEl data={entry.top} />
                <SmallCardEl data={entry.bottom} />
              </div>
            );
          }
        })}
      </div>

      <div class="h-dot-indicators">
        {CARDS.map((entry, i) => (
          <div
            key={entry.id}
            class={`h-dot${focusedCol === i ? " h-dot--active" : ""}`}
            onClick={() => setFocusedCol(i)}
          />
        ))}
      </div>

      <div class="h-nav-hint">
        <span>use</span>
        <span>
          <svg
            width="92"
            height="92"
            viewBox="0 0 116 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="40"
              y="0"
              width="36"
              height="36"
              rx="2"
              fill="#f0ebe0"
              stroke="#111"
              stroke-width="3"
            />
            <text
              x="58"
              y="24"
              text-anchor="middle"
              font-size="18"
              font-family="Arial, sans-serif"
              font-weight="700"
              fill="#111"
            >
              W
            </text>
            <rect
              x="0"
              y="44"
              width="36"
              height="36"
              rx="2"
              fill="#f0ebe0"
              stroke="#111"
              stroke-width="3"
            />
            <text
              x="18"
              y="68"
              text-anchor="middle"
              font-size="18"
              font-family="Arial, sans-serif"
              font-weight="700"
              fill="#111"
            >
              A
            </text>
            <rect
              x="40"
              y="44"
              width="36"
              height="36"
              rx="2"
              fill="#f0ebe0"
              stroke="#111"
              stroke-width="3"
            />
            <text
              x="58"
              y="68"
              text-anchor="middle"
              font-size="18"
              font-family="Arial, sans-serif"
              font-weight="700"
              fill="#111"
            >
              S
            </text>
            <rect
              x="80"
              y="44"
              width="36"
              height="36"
              rx="2"
              fill="#f0ebe0"
              stroke="#111"
              stroke-width="3"
            />
            <text
              x="98"
              y="68"
              text-anchor="middle"
              font-size="18"
              font-family="Arial, sans-serif"
              font-weight="700"
              fill="#111"
            >
              D
            </text>
          </svg>
        </span>
        <span>or</span>
        <span>
          <img class="mouseicon" src={MouseIcon} alt="mouse icon" />
        </span>
        <span>to navigate</span>
      </div>

      <div class="h-nav-hint--mobile">
        <span class="h-swipe-arrow">←</span>
        <span>swipe to navigate</span>
        <span class="h-swipe-arrow">→</span>
      </div>
    </div>
  );
};

export default Home;
