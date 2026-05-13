import type { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import "../styles/Faq.css";

type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    id: "f1",
    category: "GENERAL",
    question: "What is Nexus Hack Club?",
    answer:
      "Nexus Hack Club is a student-led community of builders, coders, and creators. We organize events, workshops, and projects to help students learn through making real things.",
  },
  {
    id: "f2",
    category: "GENERAL",
    question: "Who can join Nexus?",
    answer:
      "Anyone who's curious and wants to build! We welcome students of all skill levels — whether you've never written a line of code or you're already shipping projects.",
  },
  {
    id: "f3",
    category: "EVENTS",
    question: "How do I sign up for events?",
    answer:
      "Head over to the Events page and click on any upcoming event. You'll find a registration link along with all the details you need — date, time, format, and what to bring.",
  },
  {
    id: "f4",
    category: "EVENTS",
    question: "Are events free to attend?",
    answer:
      "Yes! All Nexus Hack Club events are completely free to attend. We believe access to learning should never be gated by cost.",
  },
  {
    id: "f5",
    category: "MEMBERSHIP",
    question: "Do I need to be a member to participate?",
    answer:
      "Most of our events are open to everyone. If you want to be part of our core community, join our Discord server — that's where all the action happens between events.",
  },
  {
    id: "f6",
    category: "MEMBERSHIP",
    question: "How do I get more involved?",
    answer:
      "The best way is to show up! Attend events, join our Discord, contribute to projects, and reach out to the team if you want to help organize or run something.",
  },
  {
    id: "f7",
    category: "PROJECTS",
    question: "Can I showcase my project at Nexus?",
    answer:
      "Absolutely. We love hearing about what members are building. Drop a message in our Discord or reach out via the Contact page and we'll find a spot for you.",
  },
  {
    id: "f8",
    category: "PROJECTS",
    question: "Do you offer mentorship or support for projects?",
    answer:
      "Yes — our community has experienced builders who are happy to give feedback, pair program, or just help you get unstuck. Ask in Discord and someone will jump in.",
  },
];

const CATEGORIES = ["ALL", ...Array.from(new Set(FAQS.map((f) => f.category)))];

const CATEGORY_COLORS: Record<string, string> = {
  GENERAL: "#f5a623",
  EVENTS: "#7ed321",
  MEMBERSHIP: "#e8a0f0",
  PROJECTS: "#ffd166",
};

const Faq: FunctionalComponent = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered =
    activeCategory === "ALL"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  const toggle = (id: string) => setOpen((prev) => (prev === id ? null : id));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") route("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div class="fq-viewport">
      <div class="fq-topbar">
        <button class="fq-back-btn" onClick={() => route("/")}>
          <span class="fq-back-key">ESC</span>
          <span class="fq-back-label">BACK</span>
        </button>
        <span class="fq-topbar-tag">NEED HELP?</span>
      </div>

      <div class="fq-body">
        <div class="fq-left">
          <h1 class="fq-title">FAQ</h1>
          <p class="fq-subtitle">
            Answers to the questions we hear most often.
          </p>

          <div class="fq-stat-grid">
            <div class="fq-stat fq-stat--dark">
              <span class="fq-stat-num">{FAQS.length}</span>
              <span class="fq-stat-label">QUESTIONS</span>
            </div>
            <div class="fq-stat fq-stat--yellow">
              <span class="fq-stat-num">{CATEGORIES.length - 1}</span>
              <span class="fq-stat-label">TOPICS</span>
            </div>
          </div>

          <div class="fq-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                class={`fq-filter-btn${activeCategory === cat ? " fq-filter-btn--active" : ""}`}
                style={
                  activeCategory === cat && cat !== "ALL"
                    ? {
                        backgroundColor: CATEGORY_COLORS[cat] ?? "#1a1a1a",
                        color: "#1a1a1a",
                      }
                    : {}
                }
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div class="fq-cta">
            <p class="fq-cta-text">Still can't find what you're looking for?</p>
            <a href="/contact" class="fq-cta-btn">
              CONTACT US →
            </a>
          </div>
        </div>

        <div class="fq-right">
          <div class="fq-list">
            {filtered.map((item, idx) => {
              const isOpen = open === item.id;
              const accent = CATEGORY_COLORS[item.category] ?? "#f5a623";
              return (
                <div
                  key={item.id}
                  class={`fq-item${isOpen ? " fq-item--open" : ""}`}
                  style={isOpen ? ({ "--fq-accent": accent } as never) : {}}
                >
                  <button class="fq-question" onClick={() => toggle(item.id)}>
                    <span class="fq-q-num">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span class="fq-q-body">
                      <span
                        class="fq-cat-badge"
                        style={{ backgroundColor: accent }}
                      >
                        {item.category}
                      </span>
                      <span class="fq-question-text">{item.question}</span>
                    </span>
                    <span
                      class={`fq-chevron${isOpen ? " fq-chevron--open" : ""}`}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M5 8l6 6 6-6"
                          stroke="#1a1a1a"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div class="fq-answer">
                      <div
                        class="fq-answer-bar"
                        style={{ backgroundColor: accent }}
                      />
                      <p>{item.answer}</p>
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

export default Faq;
