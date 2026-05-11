import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
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
      <div class="ct-header">
        <span class="ct-tag">GET IN TOUCH</span>
        <h1 class="ct-title">CONTACT US</h1>
        <p class="ct-subtitle">
          Have a question or want to collaborate? We'd love to hear from you.
        </p>
      </div>

      <div class="ct-grid">
        <div class="ct-info-panel">
          <div class="ct-info-block">
            <span class="ct-info-label">EMAIL</span>
            <span class="ct-info-value">nexus@hackclub.com</span>
          </div>
          <div class="ct-info-block">
            <span class="ct-info-label">DISCORD</span>
            <span class="ct-info-value">discord.gg/nexushack</span>
          </div>
          <div class="ct-info-block">
            <span class="ct-info-label">LOCATION</span>
            <span class="ct-info-value">Global · Remote First</span>
          </div>
          <div class="ct-info-block">
            <span class="ct-info-label">RESPONSE TIME</span>
            <span class="ct-info-value">Within 48 Hours</span>
          </div>
          <div class="ct-deco-box">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="ct-deco-svg"
            >
              <rect
                x="10"
                y="30"
                width="100"
                height="70"
                rx="10"
                fill="#1a1a1a"
              />
              <rect
                x="10"
                y="30"
                width="100"
                height="20"
                rx="10"
                fill="#1a1a1a"
              />
              <circle cx="35" cy="40" r="6" fill="#f5a623" />
              <circle cx="55" cy="40" r="6" fill="#f5a623" opacity="0.5" />
              <circle cx="75" cy="40" r="6" fill="#f5a623" opacity="0.25" />
              <rect
                x="25"
                y="62"
                width="70"
                height="8"
                rx="4"
                fill="#f0ebe0"
                opacity="0.3"
              />
              <rect
                x="25"
                y="78"
                width="50"
                height="8"
                rx="4"
                fill="#f0ebe0"
                opacity="0.2"
              />
              <rect
                x="25"
                y="94"
                width="60"
                height="8"
                rx="4"
                fill="#f0ebe0"
                opacity="0.15"
              />
            </svg>
          </div>
        </div>

        <div class="ct-form-panel">
          {submitted ? (
            <div class="ct-success">
              <span class="ct-success-icon">✓</span>
              <h2>MESSAGE SENT!</h2>
              <p>We'll get back to you within 48 hours.</p>
              <button
                class="ct-btn"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
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
                <label class="ct-label">MESSAGE</label>
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

              <button class="ct-btn" type="submit">
                SEND MESSAGE →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
