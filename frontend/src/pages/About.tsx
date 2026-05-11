import { useEffect } from "preact/hooks";
import { route } from "preact-router";
import type { FunctionalComponent } from "preact";
import "../styles/About.css";

const About: FunctionalComponent = () => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") route("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div class="a-viewport">
      <div class="a-topbar">
        <button class="a-back-btn" onClick={() => route("/")}>
          <span class="a-back-key">ESC</span>
          <span class="a-back-label">BACK</span>
        </button>
      </div>

      <div class="a-content">
        <div class="a-hero">
          <h1 class="a-title">About Kairo</h1>
          <p class="a-lead">
            We believe technology should solve real problems — not just exist as
            ideas on a screen.
          </p>
        </div>

        <div class="a-section">
          <p class="a-body">
            We are a student-driven tech organization focused on building
            meaningful digital products, helping learners grow through
            real-world experience, and creating opportunities for students who
            cannot afford expensive coding education.
          </p>
          <p class="a-body">Kairo started with a simple mission:</p>
          <p class="a-tagline">"Learn by building.Build for impact."</p>
          <p class="a-body">
            Instead of only teaching theory, we work on actual projects, solve
            practical challenges, and ship products that people can use in
            everyday life. From websites and apps to tools and creative
            solutions, our goal is to turn ideas into reality while helping
            students gain hands-on experience.
          </p>
          <p class="a-body">
            We operate like a collaborative tech studio and learning community
            combined. Members learn modern technologies, work in teams,
            contribute to real projects, and understand how products are
            designed, developed, launched, and even sold.
          </p>
        </div>

        <div class="a-divider" />

        <div class="a-section">
          <h2 class="a-section-title">What We Do</h2>
          <ul class="a-list">
            <li>Build real-world projects</li>
            <li>Teach coding through practical experience</li>
            <li>Help beginners enter tech</li>
            <li>Create products for businesses and communities</li>
            <li>Collaborate on hackathons and open-source projects</li>
            <li>Support students who lack access to quality tech education</li>
          </ul>
        </div>

        <div class="a-divider" />

        <div class="a-section">
          <h2 class="a-section-title">Our Vision</h2>
          <p class="a-body">
            We want to create a future where talented students are not limited
            by money, location, or background. Kairo aims to become a space
            where anyone with curiosity and determination can:
          </p>
          <ul class="a-list">
            <li>Learn modern technology</li>
            <li>Build impactful projects</li>
            <li>Gain real experience</li>
            <li>Grow into skilled creators</li>
          </ul>
        </div>

        <div class="a-divider" />

        <div class="a-section">
          <h2 class="a-section-title">Our Approach</h2>
          <p class="a-body">
            We believe the best way to learn is by creating. That means:
          </p>
          <ul class="a-list">
            <li>Shipping products</li>
            <li>Solving real problems</li>
            <li>Working as teams</li>
            <li>Continuously improving</li>
          </ul>
          <p class="a-body">
            Every project at Kairo is an opportunity to learn something new and
            make something useful.
          </p>
        </div>

        <div class="a-divider" />

        <div class="a-section">
          <h2 class="a-section-title">Why "Kairo"?</h2>
          <p class="a-body">
            Kairo represents creativity, momentum, and building toward the
            future. It's more than just a name — it's a mindset of innovation,
            collaboration, and action.
          </p>
        </div>

        <div class="a-footer-tagline">
          <span>Build.</span>
          <span>Learn.</span>
          <span>Ship.</span>
          <span>Grow.</span>
        </div>
      </div>
    </div>
  );
};

export default About;
