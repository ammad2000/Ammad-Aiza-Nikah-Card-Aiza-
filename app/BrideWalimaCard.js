"use client";

import { useEffect } from "react";
import { COVER_ENV, SCROLL_HINT } from "./WalimaCard";

// Her family's card leads with her name. The shared cover is left untouched for the
// groom's cards, so we re-order a copy of it here.
const BRIDE_COVER = COVER_ENV.replace(
  "Anas Hussain &amp; Aiman Farrukh",
  "Aiman Farrukh &amp; Anas Hussain"
);

const INVITATION = `
<main>
  <div class="wrap">
    <section class="reveal">
      <div class="bismillah gold-text">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
      <div class="bismillah-sub">In the name of Allah, the Most Gracious, the Most Merciful</div>
    </section>
    <svg class="flourish reveal"><use href="#flr"/></svg>
    <section class="reveal">
      <div class="kicker">Walima Reception</div>
      <p class="invite-line">With the blessings of Allah, we warmly invite you to join us at the Walima of</p>
      <div class="names">
        <div class="name gold-text">Aiman Farrukh</div>
        <span class="amp">&amp;</span>
        <div class="name gold-text">Anas Hussain</div>
      </div>
      <div class="urdu-names">ایمن فرخ &nbsp;&amp;&nbsp; انس حسین</div>
    </section>
    <svg class="flourish reveal"><use href="#flr"/></svg>
    <section class="reveal">
      <div class="kicker" id="cdKicker">Save the Date</div>
      <div class="date-big gold-text">Sunday &middot; 23 August 2026</div>
      <div class="count" id="count" aria-label="Countdown to the wedding">
        <div class="cbox"><div class="cnum" id="dd">00</div><div class="clab">Days</div></div>
        <div class="cbox"><div class="cnum" id="hh">00</div><div class="clab">Hours</div></div>
        <div class="cbox"><div class="cnum" id="mm">00</div><div class="clab">Minutes</div></div>
        <div class="cbox"><div class="cnum" id="ss">00</div><div class="clab">Seconds</div></div>
      </div>
      <div class="count-done" id="countDone" role="status" aria-live="polite">
        <div class="cd-title gold-text">Today is the day</div>
        <div class="cd-sub">We&rsquo;re so happy to celebrate with you</div>
      </div>
      <div class="count-done" id="countOver" role="status" aria-live="polite">
        <div class="cd-title gold-text">Thank you for celebrating with us</div>
        <div class="cd-sub">Your love and prayers made the evening truly blessed</div>
      </div>
    </section>
    <section class="reveal">
      <div class="card">
        <span class="corner c1"></span><span class="corner c2"></span>
        <span class="corner c3"></span><span class="corner c4"></span>
        <div>
          <div class="detail-lab">Time</div>
          <div class="detail-val" id="timeVal">8:30 PM sharp</div>
        </div>
        <svg class="flourish"><use href="#flr"/></svg>
        <div>
          <div class="detail-lab">Venue</div>
          <div class="detail-val" id="venueName">Four Seasons Banquet Hall</div>
          <div class="detail-val" id="venueAddr" style="font-size:16px;color:var(--muted)">Lawn B, Rashid Minhas Road (near Millennium Mall)</div>
        </div>
        <div class="btns">
          <a class="btn" id="mapBtn" href="https://maps.app.goo.gl/w89sGXJmNiLywHvM6" target="_blank" rel="noopener">◈ View on Map</a>
          <a class="btn" id="calBtn" href="#" target="_blank" rel="noopener">✦ Add to Calendar</a>
        </div>
      </div>
    </section>
    <svg class="flourish reveal"><use href="#flr"/></svg>
    <section class="reveal">
      <div class="kicker">A Prayer for the Couple</div>
      <div class="dua">بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</div>
      <p class="dua-sub">May Allah bless you both, and shower His blessings upon you, and unite you together in goodness.</p>
    </section>
    <section class="reveal">
      <p class="closing">Your presence and prayers on this blessed occasion would mean the world to us.</p>
    </section>
    <footer class="reveal">
      <div class="monogram">A&nbsp;&amp;&nbsp;A</div>
      <div class="family">With love, from the Farrukh Family</div>
    </footer>
  </div>
</main>
`;

const EMBER_SCENE = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <linearGradient id="gl" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7a4e18" stop-opacity="0"/><stop offset="1" stop-color="#7a4e18"/>
    </linearGradient>
    <linearGradient id="gr" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7a4e18"/><stop offset="1" stop-color="#7a4e18" stop-opacity="0"/>
    </linearGradient>
    <symbol id="flr" viewBox="0 0 260 24">
      <line x1="14" y1="12" x2="104" y2="12" stroke="url(#gl)" stroke-width="1.2"/>
      <line x1="156" y1="12" x2="246" y2="12" stroke="url(#gr)" stroke-width="1.2"/>
      <path d="M104 12 q13 -9 26 0 q13 9 26 0" fill="none" stroke="#8a5a1e" stroke-width="1.2"/>
      <path d="M130 4.5 l5.5 7.5 -5.5 7.5 -5.5 -7.5 z" fill="#9a6a28"/>
      <circle cx="14" cy="12" r="1.9" fill="#8a5a1e"/><circle cx="246" cy="12" r="1.9" fill="#8a5a1e"/>
    </symbol>
  </defs>
</svg>

<div class="ember-stage" aria-hidden="true"></div>
<div class="ember-photo" id="photo" aria-hidden="true"></div>
<div class="ember-veil" aria-hidden="true"></div>
<div class="ember-firelight" id="firelight" aria-hidden="true"></div>
<div class="ember-particles" id="embers" aria-hidden="true"></div>
<div class="light-reveal" id="lightReveal" aria-hidden="true"></div>

<audio id="nasheed" loop preload="auto" src="/nasheed.mp3"></audio>
<button id="muteBtn" class="mute" aria-label="Toggle music">
  <svg class="ico ico-on" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a5 5 0 0 1 0 7"/><path d="M18.6 6a8 8 0 0 1 0 12"/></svg>
  <svg class="ico ico-off" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9.5l4.5 5M21.5 9.5l-4.5 5"/></svg>
</button>
`;

const COVER_ENV_GLOW = `
<div class="cover cover--env cover--glow" id="cover">
  <div class="env-scene">
    <div class="env" id="env">
      <span class="seal-flash" aria-hidden="true"></span>
      <svg class="env-glow" viewBox="0 0 320 216" preserveAspectRatio="none" aria-hidden="true">
        <rect class="gline gborder" x="4" y="4" width="312" height="208" rx="6" pathLength="100"/>
        <path class="gline gseam" d="M4 4 L316 212" pathLength="100"/>
        <path class="gline gseam2" d="M316 4 L4 212" pathLength="100"/>
      </svg>
      <div class="env-flap"></div>
      <button class="env-seal" id="openBtn" aria-label="Open the invitation">A<span>&amp;</span>A</button>
    </div>
    <div class="env-title gold-text">Aiman Farrukh &amp; Anas Hussain</div>
    <div class="tiny">Tap the seal to open</div>
  </div>
</div>
`;

export default function BrideWalimaCard({ bg = "/ember-bg.jpg", seal = "plain" }) {
  useEffect(() => {
    const box = document.getElementById("embers");
    if (box && !box.childElementCount) {
      const frag = document.createDocumentFragment();
      const n = window.innerWidth < 600 ? 22 : 34;
      for (let i = 0; i < n; i++) {
        const p = document.createElement("span");
        p.className = "ember-p";
        const s = Math.random() * 2.6 + 1.2;
        p.style.width = s + "px";
        p.style.height = s + "px";
        p.style.left = Math.random() * 100 + "%";
        p.style.setProperty("--d", (Math.random() * 10 + 11).toFixed(1) + "s");
        p.style.setProperty("--dl", (-Math.random() * 16).toFixed(1) + "s");
        p.style.setProperty("--dx", (Math.random() * 60 - 30).toFixed(0) + "px");
        frag.appendChild(p);
      }
      box.appendChild(frag);
    }

    function reveal() {
      const els = Array.from(document.querySelectorAll(".reveal"));
      const first = els.slice(0, 4);
      first.forEach((el, i) => setTimeout(() => el.classList.add("in"), 180 + i * 160));
      const rest = els.slice(4);
      if (!("IntersectionObserver" in window)) {
        rest.forEach((e) => e.classList.add("in"));
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((x) => {
            if (x.isIntersecting) {
              x.target.classList.add("in");
              io.unobserve(x.target);
            }
          });
        },
        { threshold: 0.16 }
      );
      rest.forEach((e) => io.observe(e));
    }

    const cover = document.getElementById("cover");
    const openBtn = document.getElementById("openBtn");
    const audio = document.getElementById("nasheed");
    const muteBtn = document.getElementById("muteBtn");
    const lightReveal = document.getElementById("lightReveal");
    const photo = document.getElementById("photo");
    const fire = document.getElementById("firelight");
    const scroller = document.getElementById("scroller");

    let opened = false;
    const hint = document.getElementById("scrollHint");
    function hideHint() {
      if (hint) hint.classList.add("gone");
    }
    function showHint() {
      if (hint) hint.classList.add("shown");
    }
    function open() {
      if (opened) return;
      opened = true;
      document.body.classList.remove("locked");
      if (scroller) {
        scroller.style.overflowY = "auto";
        scroller.scrollTop = 0;
      }
      if (muteBtn) muteBtn.classList.add("shown");
      if (audio) {
        audio.volume = 0.35;
        audio.play().catch(() => {});
      }
      if (cover) cover.classList.add("opening");
      const lite = () => {
        if (lightReveal) lightReveal.classList.add("go");
        if (photo) photo.classList.add("lit");
      };
      if (seal === "glow") {
        setTimeout(() => cover && cover.classList.add("burst"), 1200);
        setTimeout(lite, 1850);
        setTimeout(() => cover && cover.classList.add("open"), 2200);
        setTimeout(reveal, 2500);
        setTimeout(showHint, 3500);
        setTimeout(() => cover && (cover.style.display = "none"), 3700);
      } else {
        setTimeout(lite, 820);
        setTimeout(() => cover && cover.classList.add("open"), 950);
        setTimeout(reveal, 1250);
        setTimeout(showHint, 2300);
        setTimeout(() => cover && (cover.style.display = "none"), 2700);
      }
    }
    function coverClick(e) {
      if (e.target === cover) open();
    }
    function toggleMute() {
      if (!audio) return;
      if (audio.muted || audio.paused) {
        audio.muted = false;
        audio.play().catch(() => {});
        muteBtn.classList.remove("muted");
      } else {
        audio.muted = true;
        muteBtn.classList.add("muted");
      }
    }
    if (openBtn) openBtn.addEventListener("click", open);
    if (cover) cover.addEventListener("click", coverClick);
    if (muteBtn) muteBtn.addEventListener("click", toggleMute);

    const target = new Date("2026-08-23T20:30:00+05:00").getTime();
    const over = new Date("2026-08-24T00:00:00+05:00").getTime();
    const pad = (x) => (x < 10 ? "0" : "") + x;
    const set = (id, v) => {
      const el = document.getElementById(id);
      if (!el) return;
      const s = pad(v);
      if (el.textContent !== s) {
        el.textContent = s;
        el.classList.remove("tick");
        void el.offsetWidth;
        el.classList.add("tick");
      }
    };
    function tick() {
      const now = Date.now();
      if (now >= over) {
        const c = document.getElementById("count");
        if (c) c.style.display = "none";
        const d = document.getElementById("countDone");
        if (d) d.classList.remove("show");
        const o = document.getElementById("countOver");
        if (o) o.classList.add("show");
        const k = document.getElementById("cdKicker");
        if (k) k.textContent = "With Gratitude";
        return;
      }
      const diff = target - now;
      if (diff <= 0) {
        const c = document.getElementById("count");
        if (c) c.style.display = "none";
        const d = document.getElementById("countDone");
        if (d) d.classList.add("show");
        return;
      }
      set("dd", Math.floor(diff / 86400000));
      set("hh", Math.floor((diff % 86400000) / 3600000));
      set("mm", Math.floor((diff % 3600000) / 60000));
      set("ss", Math.floor((diff % 60000) / 1000));
    }
    tick();
    const iv = setInterval(tick, 1000);

    const calBtn = document.getElementById("calBtn");
    if (calBtn) {
      const text = encodeURIComponent("Walima of Anas & Aiman");
      const details = encodeURIComponent(
        "With the blessings of Allah, you are warmly invited to the Walima reception."
      );
      const location = encodeURIComponent("Four Seasons Banquet Hall, Lawn B, Rashid Minhas Road, near Millennium Mall");
      const dates = "20260823T153000Z/20260823T183000Z";
      calBtn.setAttribute(
        "href",
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
          text + "&dates=" + dates + "&details=" + details + "&location=" + location
      );
    }

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    if (fire && !reduce) {
      let start = null;
      let jitter = 0;
      const frame = (ts) => {
        if (start === null) start = ts;
        const t = (ts - start) / 1000;
        jitter += ((Math.random() - 0.5) * 0.5 - jitter) * 0.14;
        let v =
          0.62 +
          0.16 * Math.sin(t * 8.7) +
          0.1 * Math.sin(t * 15.3 + 1.1) +
          0.06 * Math.sin(t * 26.4 + 2.3) +
          0.05 * Math.sin(t * 3.9) +
          jitter * 0.12;
        if (v < 0.3) v = 0.3;
        if (v > 1) v = 1;
        fire.style.opacity = (0.09 + v * 0.3).toFixed(3);
        if (photo) photo.style.filter = "brightness(" + (0.93 + v * 0.14).toFixed(3) + ") saturate(1.03)";
        rafId = requestAnimationFrame(frame);
      };
      rafId = requestAnimationFrame(frame);
    }

    let raf = false;
    function onScroll() {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        const y = (scroller && scroller.scrollTop) || 0;
        // Only once the cue is actually showing, so a programmatic scroll reset can't dismiss it.
        if (y > 40 && hint && hint.classList.contains("shown")) hideHint();
        if (box) box.style.transform = "translateY(" + y * 0.08 + "px)";
        raf = false;
      });
    }
    if (scroller) scroller.addEventListener("scroll", onScroll, { passive: true });
    const GESTURES = ["wheel", "touchmove", "keydown"];
    GESTURES.forEach((e) => window.addEventListener(e, hideHint, { passive: true }));

    if (new URLSearchParams(window.location.search).has("preview")) open();

    return () => {
      clearInterval(iv);
      if (rafId) cancelAnimationFrame(rafId);
      if (scroller) scroller.removeEventListener("scroll", onScroll);
      GESTURES.forEach((e) => window.removeEventListener(e, hideHint));
      if (openBtn) openBtn.removeEventListener("click", open);
      if (cover) cover.removeEventListener("click", coverClick);
      if (muteBtn) muteBtn.removeEventListener("click", toggleMute);
    };
  }, []);

  const coverMarkup = seal === "glow" ? COVER_ENV_GLOW : BRIDE_COVER;
  return (
    <div
      className={seal === "glow" ? "ember ember-palace" : "ember"}
      style={{ "--ember-bg": `url(${bg})` }}
      dangerouslySetInnerHTML={{
        __html:
          EMBER_SCENE +
          coverMarkup +
          '<div class="ember-scroll" id="scroller">' + INVITATION + "</div>" +
          SCROLL_HINT,
      }}
    />
  );
}
