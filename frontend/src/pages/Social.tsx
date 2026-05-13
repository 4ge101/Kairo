import { useEffect } from "preact/hooks";
import { route } from "preact-router";
import type { FunctionalComponent } from "preact";
import "../styles/Social.css";

import InstagramIcon from "../assets/icons/instagram.svg";
import FacebookIcon from "../assets/icons/facebook.svg";
import TwitterIcon from "../assets/icons/twitter.svg";

const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@kairo",
    href: "https://instagram.com/kairo",
    color: "#f5a623",
    textColor: "#1a1a1a",
    icon: InstagramIcon,
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "Kairo",
    href: "https://facebook.com/kairo",
    color: "#7ed321",
    textColor: "#1a1a1a",
    icon: FacebookIcon,
  },
  {
    id: "twitter",
    name: "Twitter",
    handle: "@kairo",
    href: "https://twitter.com/kairo",
    color: "#87ceeb",
    textColor: "#1a1a1a",
    icon: TwitterIcon,
  },
];

const Social: FunctionalComponent = () => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") route("/");
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div class="s-viewport">
      <div class="s-topbar">
        <button class="s-back-btn" onClick={() => route("/")}>
          <span class="s-back-key">ESC</span>
          <span class="s-back-label">BACK</span>
        </button>
      </div>

      <div class="s-content">
        <div class="s-hero">
          <h1 class="s-title">Find Us Online</h1>
          <p class="s-lead">Join our community on your favourite platform.</p>
        </div>

        <div class="s-grid">
          {platforms.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              class="s-card"
              style={{
                backgroundColor: p.color,
                borderColor: p.textColor,
              }}
            >
              <div
                class="s-icon-placeholder"
                style={{
                  color: p.textColor,
                  borderColor: p.textColor,
                }}
              >
                <img src={p.icon} alt={p.name} class="s-icon" />
              </div>

              <div class="s-card-info">
                <h2 class="s-card-name" style={{ color: p.textColor }}>
                  {p.name}
                </h2>

                <p class="s-card-handle" style={{ color: p.textColor }}>
                  {p.handle}
                </p>
              </div>

              <span class="s-arrow" style={{ color: p.textColor }}>
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Social;
