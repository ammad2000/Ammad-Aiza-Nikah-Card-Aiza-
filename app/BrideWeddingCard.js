"use client";

import { useEffect } from "react";
import { SCROLL_HINT } from "./WalimaCard";
import { startCountdown } from "./countdown";

/* --- Event facts (venue/date from the printed invitation, timings from the family) --- */
const TARGET_ISO = "2026-08-22T20:30:00+05:00";   // countdown runs to the 8:30 PM arrival
const OVER_ISO = "2026-08-23T00:00:00+05:00";
const VENUE = "The Imperial Marquee";
const VENUE_ADDR = "Dalmia Road, Near Millennium Mall, Karachi";
const MAP_URL = "https://maps.app.goo.gl/VD3CKgRTR62hoz167";
const PROGRAMME = [
  ["8:30 PM", "Arrival at the venue"],
  ["9:00 PM", "Stage &amp; photographs"],
  ["10:00 PM", "Dinner"],
];

const SCENE = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <linearGradient id="brl" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#b0873c" stop-opacity="0"/><stop offset="1" stop-color="#b0873c"/>
    </linearGradient>
    <linearGradient id="brr" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#b0873c"/><stop offset="1" stop-color="#b0873c" stop-opacity="0"/>
    </linearGradient>
    <!-- eight-pointed star (Rub el Hizb) — its own motif, not the Walima's flourish -->
    <symbol id="brflr" viewBox="0 0 260 24">
      <line x1="16" y1="12" x2="100" y2="12" stroke="url(#brl)" stroke-width="1"/>
      <line x1="160" y1="12" x2="244" y2="12" stroke="url(#brr)" stroke-width="1"/>
      <g fill="none" stroke="#b0873c" stroke-width="1.15">
        <rect x="120.5" y="2.5" width="19" height="19"/>
        <rect x="120.5" y="2.5" width="19" height="19" transform="rotate(45 130 12)"/>
      </g>
      <circle cx="130" cy="12" r="1.7" fill="#b0873c"/>
      <circle cx="107" cy="12" r="1.5" fill="#b0873c"/>
      <circle cx="153" cy="12" r="1.5" fill="#b0873c"/>
    </symbol>
  </defs>
</svg>

<div class="br-photo" id="brPhoto" aria-hidden="true"></div>
<div class="br-veil" aria-hidden="true"></div>
<div class="br-glow" id="brGlow" aria-hidden="true"></div>

<audio id="nasheed" loop preload="auto" src="/baraat-audio.mp3"></audio>
<button id="muteBtn" class="mute" aria-label="Toggle music">
  <svg class="ico ico-on" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a5 5 0 0 1 0 7"/><path d="M18.6 6a8 8 0 0 1 0 12"/></svg>
  <svg class="ico ico-off" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9.5l4.5 5M21.5 9.5l-4.5 5"/></svg>
</button>
`;

/* Gates: two ornate panels that part in the middle — a baraat arrives at a gate. */
const COVER = `
<div class="cover cover--gate" id="cover">
  <div class="gate gate-l" aria-hidden="true"></div>
  <div class="gate gate-r" aria-hidden="true"></div>
  <div class="gate-mid">
    <div class="gate-kick">You are invited to the</div>
    <div class="gate-title">Baraat</div>
    <div class="gate-of">of</div>
    <div class="gate-names">Aiman &amp; Anas</div>
    <button class="gate-btn" id="openBtn">Open the Gates</button>
  </div>
</div>
`;

const timelineRows = PROGRAMME.map(
  ([t, label]) => `
      <li class="br-tli"><span class="br-tlt">${t}</span><span class="br-tle">${label}</span></li>`
).join("");

/* The invitation is a physical cream card resting on the lantern-lit table. */
const INVITE = `
<main class="br-main">
  <article class="br-paper">
    <div class="br-paper-rule" aria-hidden="true"></div>

    <section class="reveal">
      <div class="br-bismillah">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
    </section>

    <section class="reveal">
      <div class="br-kick">Wedding Ceremony</div>
      <p class="br-host">Mr. &amp; Mrs. Farrukh Mehmood request the honour of your presence at the wedding of their beloved daughter</p>

      <div class="br-name">Aiman Farrukh</div>
      <div class="br-with"><span>with</span></div>
      <div class="br-name">Anas Hussain</div>
      <div class="br-parent">S/o Mr. &amp; Mrs. Shah Hussain</div>
      <img class="br-couple" src="/couple.png" alt="" aria-hidden="true" width="640" height="1009"/>
    </section>

    <svg class="flourish reveal"><use href="#brflr"/></svg>

    <section class="reveal">
      <div class="br-date">
        <div class="br-dday">Saturday</div>
        <div class="br-dnum">22</div>
        <div class="br-dyear">August 2026</div>
      </div>

      <div class="br-count" id="brCount" aria-label="Countdown to the baraat">
        <span><b id="brDD">00</b><i>days</i></span><span class="br-cdot">&middot;</span>
        <span><b id="brHH">00</b><i>hrs</i></span><span class="br-cdot">&middot;</span>
        <span><b id="brMM">00</b><i>min</i></span><span class="br-cdot">&middot;</span>
        <span><b id="brSS">00</b><i>sec</i></span>
      </div>
      <div class="br-msg" id="brDayOf" role="status" aria-live="polite">
        <div class="br-msg-t">The day has arrived</div>
        <div class="br-msg-s">We look forward to welcoming you this evening</div>
      </div>
      <div class="br-msg" id="brOver" role="status" aria-live="polite">
        <div class="br-msg-t">A night we will always remember</div>
        <div class="br-msg-s">Thank you for being with us, and for every dua</div>
      </div>
    </section>

    <section class="reveal">
      <div class="br-kick">The Evening</div>
      <ul class="br-tl">${timelineRows}
      </ul>
    </section>

    <svg class="flourish reveal"><use href="#brflr"/></svg>

    <section class="reveal">
      <div class="br-kick">Venue</div>
      <div class="br-venue">${VENUE}</div>
      <div class="br-addr">${VENUE_ADDR}</div>
      <div class="br-btns">
        <a class="br-btn" href="${MAP_URL}" target="_blank" rel="noopener">View on Map</a>
        <a class="br-btn" id="brCal" href="#" target="_blank" rel="noopener">Add to Calendar</a>
      </div>
    </section>

    <svg class="flourish reveal"><use href="#brflr"/></svg>

    <section class="reveal">
      <div class="br-dua">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</div>
      <p class="br-dua-sub">&ldquo;And among His signs is that He created for you spouses from among yourselves,
        that you may find tranquility in them; and He placed between you love and mercy.&rdquo;</p>
      <div class="br-ref">Surah Ar-Rum &middot; 30:21</div>
    </section>


    <footer class="reveal">
      <div class="br-seal">
        <span class="br-seal-rule"></span>
        <span class="br-seal-txt">A &amp; A</span>
        <span class="br-seal-rule"></span>
      </div>
      <div class="br-family">With love, from the Farrukh Family</div>
    </footer>
  </article>
</main>
`;

export default function BrideWeddingCard() {
  useEffect(() => {
    const cover = document.getElementById("cover");
    const openBtn = document.getElementById("openBtn");
    const audio = document.getElementById("nasheed");
    const muteBtn = document.getElementById("muteBtn");
    const photo = document.getElementById("brPhoto");
    const glow = document.getElementById("brGlow");
    const scroller = document.getElementById("scroller");
    const hint = document.getElementById("scrollHint");

    const hideHint = () => hint && hint.classList.add("gone");
    const showHint = () => hint && hint.classList.add("shown");

    function reveal() {
      const els = Array.from(document.querySelectorAll(".reveal"));
      els.slice(0, 3).forEach((el, i) => setTimeout(() => el.classList.add("in"), 150 + i * 170));
      const rest = els.slice(3);
      if (!("IntersectionObserver" in window)) return rest.forEach((e) => e.classList.add("in"));
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((x) => {
            if (x.isIntersecting) {
              x.target.classList.add("in");
              io.unobserve(x.target);
            }
          }),
        { threshold: 0.14 }
      );
      rest.forEach((e) => io.observe(e));
    }

    // The scene is lantern-lit, so let the warm overlay breathe instead of sitting flat.
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    function startFlicker() {
      if (reduce || !glow || rafId) return;
      let start = null;
      let jitter = 0;
      const frame = (ts) => {
        if (start === null) start = ts;
        const t = (ts - start) / 1000;
        jitter += ((Math.random() - 0.5) * 0.5 - jitter) * 0.07;
        let v = 0.55 + 0.15 * Math.sin(t * 1.6) + 0.09 * Math.sin(t * 3.3 + 1.1) +
                0.05 * Math.sin(t * 6.1 + 2.2) + jitter * 0.09;
        v = Math.max(0.25, Math.min(1, v));
        glow.style.opacity = (0.3 + v * 0.42).toFixed(3);
        rafId = requestAnimationFrame(frame);
      };
      rafId = requestAnimationFrame(frame);
    }

    let opened = false;
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
      if (cover) cover.classList.add("opening");        // gates swing apart
      setTimeout(() => {
        if (photo) {
          photo.classList.add("lit");
          setTimeout(() => photo.classList.add("settled"), 2500); // parallax stops easing
        }
        if (glow) {
          glow.classList.add("go");
          startFlicker();
        }
      }, 420);
      setTimeout(() => cover && cover.classList.add("open"), 1950); // after the leaves swing
      // hold on the venue as the gates part, then let the invitation rise into it
      setTimeout(() => {
        const paper = document.querySelector(".br-paper");
        if (paper) paper.classList.add("up");
      }, 1500);
      setTimeout(reveal, 1950);
      setTimeout(showHint, 2900);
      setTimeout(() => cover && (cover.style.display = "none"), 2900);
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

    const swap = (hideId, showId) => {
      const c = document.getElementById("brCount");
      if (c) c.style.display = "none";
      const h = document.getElementById(hideId);
      if (h) h.classList.remove("show");
      const s = document.getElementById(showId);
      if (s) s.classList.add("show");
    };
    const stopCountdown = startCountdown({
      targetISO: TARGET_ISO,
      overISO: OVER_ISO,
      onDayOf: () => swap("brOver", "brDayOf"),
      onOver: () => swap("brDayOf", "brOver"),
    });

    const cal = document.getElementById("brCal");
    if (cal) {
      const q = (s) => encodeURIComponent(s);
      cal.setAttribute(
        "href",
        "https://calendar.google.com/calendar/render?action=TEMPLATE" +
          "&text=" + q("Wedding of Aiman & Anas") +
          "&dates=20260822T153000Z/20260822T190000Z" +
          "&details=" + q("You are invited to the wedding of Aiman Farrukh and Anas Hussain.") +
          "&location=" + q(VENUE + ", " + VENUE_ADDR)
      );
    }

    let raf = false;
    function onScroll() {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        const y = (scroller && scroller.scrollTop) || 0;
        if (y > 40) hideHint();
        if (photo && opened && !reduce) {
          const shift = Math.max(-40, -y * 0.03); // clamped to stay inside the overscan
          photo.style.setProperty("--par", shift.toFixed(1) + "px");
        }
        raf = false;
      });
    }
    if (scroller) scroller.addEventListener("scroll", onScroll, { passive: true });

    if (new URLSearchParams(window.location.search).has("preview")) open();

    return () => {
      stopCountdown();
      if (rafId) cancelAnimationFrame(rafId);
      if (scroller) scroller.removeEventListener("scroll", onScroll);
      if (openBtn) openBtn.removeEventListener("click", open);
      if (cover) cover.removeEventListener("click", coverClick);
      if (muteBtn) muteBtn.removeEventListener("click", toggleMute);
    };
  }, []);

  return (
    <div
      className="baraat"
      style={{ "--br-bg": "url(/baraat-bg.jpg)" }}
      dangerouslySetInnerHTML={{
        __html:
          SCENE + COVER + '<div class="br-scroll" id="scroller">' + INVITE + "</div>" + SCROLL_HINT,
      }}
    />
  );
}
