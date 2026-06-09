import { useEffect, useState, useCallback } from "preact/hooks";
import { route } from "preact-router";
import type { FunctionalComponent } from "preact";
import "../styles/Event.css";

type Story = {
  id: number;
  title: string;
  url?: string;
  by: string;
  score: number;
  descendants: number;
  time: number;
  type: string;
};

type Tab = "top" | "new" | "best" | "ask" | "show";

const TABS: { id: Tab; label: string }[] = [
  { id: "top", label: "Top" },
  { id: "new", label: "New" },
  { id: "best", label: "Best" },
  { id: "ask", label: "Ask HN" },
  { id: "show", label: "Show HN" },
];

const ENDPOINT: Record<Tab, string> = {
  top: "https://hacker-news.firebaseio.com/v0/topstories.json",
  new: "https://hacker-news.firebaseio.com/v0/newstories.json",
  best: "https://hacker-news.firebaseio.com/v0/beststories.json",
  ask: "https://hacker-news.firebaseio.com/v0/askstories.json",
  show: "https://hacker-news.firebaseio.com/v0/showstories.json",
};

const PAGE_SIZE = 20;

const timeAgo = (unix: number) => {
  const s = Math.floor(Date.now() / 1000) - unix;
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

const getDomain = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

const UpIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
    <path d="M12 4l8 8H4z" />
  </svg>
);

const CommentIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="13"
    height="13"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="13"
    height="13"
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);



const StoryRow: FunctionalComponent<{ story: Story; rank: number }> = ({
  story,
  rank,
}) => {
  const domain = getDomain(story.url);
  const hnLink = `https://news.ycombinator.com/item?id=${story.id}`;
  const target = story.url || hnLink;

  return (
    <div class="hn-row">
      <span class="hn-rank">{rank}</span>
      <div class="hn-row__body">
        <a
          class="hn-title"
          href={target}
          target="_blank"
          rel="noopener noreferrer"
        >
          {story.title}
          {domain && <span class="hn-domain">{domain}</span>}
        </a>
        <div class="hn-meta">
          <span class="hn-score">
            <UpIcon />
            {story.score}
          </span>
          <span class="hn-by">by {story.by}</span>
          <span class="hn-time">{timeAgo(story.time)}</span>
          <a
            class="hn-comments"
            href={hnLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CommentIcon />
            {story.descendants ?? 0}
          </a>
          <a
            class="hn-open"
            href={target}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open"
          >
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

const SkeletonRow: FunctionalComponent<{ i: number }> = ({ i }) => (
  <div
    class="hn-row hn-row--skeleton"
    style={{ animationDelay: `${i * 40}ms` }}
  >
    <span class="hn-rank hn-skel" style={{ width: "1.2rem", height: "1rem" }} />
    <div class="hn-row__body" style={{ gap: "0.5rem" }}>
      <div
        class="hn-skel"
        style={{ width: `${60 + (i % 5) * 8}%`, height: "1rem" }}
      />
      <div class="hn-skel" style={{ width: "40%", height: "0.75rem" }} />
    </div>
  </div>
);

const Events: FunctionalComponent = () => {
  const [tab, setTab] = useState<Tab>("top");
  const [ids, setIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  const fetchIds = useCallback(async (t: Tab) => {
    setLoading(true);
    setError(false);
    setStories([]);
    setPage(0);
    try {
      const res = await fetch(ENDPOINT[t]);
      const data: number[] = await res.json();
      setIds(data);
      const slice = data.slice(0, PAGE_SIZE);
      const items = await Promise.all(
        slice.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (r) => r.json(),
          ),
        ),
      );
      setStories(items.filter(Boolean));
      setPage(1);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const slice = ids.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    try {
      const items = await Promise.all(
        slice.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (r) => r.json(),
          ),
        ),
      );
      setStories((prev) => [...prev, ...items.filter(Boolean)]);
      setPage((p) => p + 1);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchIds(tab);
  }, [tab]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") route("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hasMore = stories.length < ids.length;

  return (
    <div class="hn-page">
      <div class="hn-topbar">
        <button class="hn-back-btn" onClick={() => route("/")}>
          <span class="hn-back-key">ESC</span>
          <span class="hn-back-label">BACK</span>
        </button>
      </div>

      <div class="hn-header">
        <div class="hn-header__eyebrow">Tech News</div>
        <h1 class="hn-headline">
          Kairo
          <br />
          <span class="hn-headline--accent">News</span>
        </h1>
        <p class="hn-desc">
          Real-time stories from the tech community, powered by Kairo News.
        </p>
      </div>

      <div class="hn-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            class={`hn-tab${tab === t.id ? " hn-tab--active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div class="hn-feed">
        {loading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <SkeletonRow key={i} i={i} />
          ))}

        {error && (
          <div class="hn-error">
            <p>Failed to load stories. Try again.</p>
            <button class="hn-retry" onClick={() => fetchIds(tab)}>
              Retry
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          stories.map((s, i) => <StoryRow key={s.id} story={s} rank={i + 1} />)}

        {!loading && !error && hasMore && (
          <button class="hn-more" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "Loading…" : "Load More"}
          </button>
        )}
      </div>

      <div class="hn-credit">
        Data from{" "}
        <a
          href="https://news.ycombinator.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kairo
        </a>{" "}
      </div>
    </div>
  );
};

export default Events;