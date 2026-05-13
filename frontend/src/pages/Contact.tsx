import type { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import "../styles/Contact.css";

const Contact: FunctionalComponent = () => {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") route("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleChange = (e: Event) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div class="ct-viewport">
      <div class="ct-topbar">
        <button class="ct-back-btn" onClick={() => route("/")}>
          <span class="ct-back-key">ESC</span>
          <span class="ct-back-label">BACK</span>
        </button>
        <span class="ct-topbar-tag">GET IN TOUCH</span>
      </div>

      <div class="ct-body">
        <div class="ct-left">
          <div class="ct-hero">
            <h1 class="ct-title">
              LET'S
              <br />
              TALK.
            </h1>
            <p class="ct-lead">
              Have something to say? We're all ears. Drop us a message and we'll
              get back to you fast.
            </p>
          </div>

          <div class="ct-cards">
            <div class="ct-info-card ct-info-card--yellow">
              <span class="ct-info-icon">@</span>
              <div>
                <span class="ct-info-card-label">EMAIL</span>
                <span class="ct-info-card-value">nexus@hackclub.com</span>
              </div>
            </div>
            <div class="ct-info-card ct-info-card--green">
              <span class="ct-info-icon">#</span>
              <div>
                <span class="ct-info-card-label">DISCORD</span>
                <span class="ct-info-card-value">discord.gg/nexushack</span>
              </div>
            </div>
            <div class="ct-info-card ct-info-card--dark">
              <span class="ct-info-icon">◎</span>
              <div>
                <span class="ct-info-card-label">LOCATION</span>
                <span class="ct-info-card-value">Global · Remote First</span>
              </div>
            </div>
            <div class="ct-info-card ct-info-card--pink">
              <span class="ct-info-icon">⚡</span>
              <div>
                <span class="ct-info-card-label">RESPONSE TIME</span>
                <span class="ct-info-card-value">Within 48 Hours</span>
              </div>
            </div>
          </div>
        </div>

        <div class="ct-right">
          {submitted ? (
            <div class="ct-success">
              <div class="ct-success-circle">✓</div>
              <h2 class="ct-success-title">
                MESSAGE
                <br />
                SENT!
              </h2>
              <p class="ct-success-sub">
                We'll get back to you within 48 hours. Keep an eye on your
                inbox.
              </p>
              <button
                class="ct-submit-btn"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
              >
                SEND ANOTHER →
              </button>
            </div>
          ) : (
            <div class="ct-form-wrap">
              <div class="ct-form-header">
                <span class="ct-form-num">01</span>
                <span class="ct-form-heading">SEND A MESSAGE</span>
              </div>

              <form class="ct-form" onSubmit={handleSubmit}>
                <div class="ct-row">
                  <div
                    class={`ct-field${focused === "name" ? " ct-field--focused" : ""}`}
                  >
                    <label class="ct-label">YOUR NAME</label>
                    <input
                      class="ct-input"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      required
                      onInput={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div
                    class={`ct-field${focused === "email" ? " ct-field--focused" : ""}`}
                  >
                    <label class="ct-label">EMAIL ADDRESS</label>
                    <input
                      class="ct-input"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      required
                      onInput={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div
                  class={`ct-field${focused === "subject" ? " ct-field--focused" : ""}`}
                >
                  <label class="ct-label">SUBJECT</label>
                  <select
                    class="ct-input ct-select"
                    name="subject"
                    value={form.subject}
                    required
                    onChange={handleChange}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="" disabled>
                      Pick a topic...
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="event">Event Partnership</option>
                    <option value="collab">Collaboration</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div
                  class={`ct-field${focused === "message" ? " ct-field--focused" : ""}`}
                >
                  <label class="ct-label">YOUR MESSAGE</label>
                  <textarea
                    class="ct-input ct-textarea"
                    name="message"
                    placeholder="What's on your mind?"
                    value={form.message}
                    required
                    rows={5}
                    onInput={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <div class="ct-form-footer">
                  <button class="ct-submit-btn" type="submit">
                    SEND MESSAGE →
                  </button>
                  <span class="ct-privacy-note">We never share your info.</span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
