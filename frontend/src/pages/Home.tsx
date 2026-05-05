import type { FunctionalComponent } from "preact";
import '../styles/Home.css'

const ProjectsBgIcon = () => (
  <svg
    class="card-bg-icon"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 10 L70 10 L110 50 L110 110 L20 110 Z"
      fill="#1a1a1a"
    />
    <path
      d="M65 10 L110 55 L65 55 Z"
      fill="#1a1a1a"
      opacity="0.5"
    />
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

const Home: FunctionalComponent = () => {
  return (
    <div class="hero-box-container">

      {/* LEFT — Events Panel */}
      <div class="events-panel">
        <div>
          <h2>Upcoming Community Events</h2>
          <p class="events-empty">No upcoming events.</p>
        </div>
        <a href="#" class="events-link-btn">
          <span class="icon" />
          To View Community Events
        </a>
      </div>

      {/* MIDDLE — Projects + Guides */}
      <div class="middle-column">

        {/* Projects Card */}
        <div class="card card-projects">
          <ProjectsBgIcon />
          <h2>Projects</h2>
          <p>Create and ship your projects</p>
        </div>

        {/* Guides Card */}
        <div class="card card-guides">
          <GuidesBgIcon />
          <h2>Guides</h2>
          <p>Learn to build stuff!</p>
        </div>

      </div>

      {/* RIGHT — Hackathon Event Card */}
      <div class="card-event">
        <div class="card-event-banner">
          <div class="card-event-logo">
            Arcana
            <span>Horizons Arcana</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;