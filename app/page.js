"use client";

import { useEffect } from "react";
import { SCROLL_HINT } from "./EmberCard";

const MARKUP = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <linearGradient id="gl" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e8c66d" stop-opacity="0"/><stop offset="1" stop-color="#e8c66d"/>
    </linearGradient>
    <linearGradient id="gr" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e8c66d"/><stop offset="1" stop-color="#e8c66d" stop-opacity="0"/>
    </linearGradient>
    <symbol id="flr" viewBox="0 0 260 24">
      <line x1="14" y1="12" x2="104" y2="12" stroke="url(#gl)" stroke-width="1.2"/>
      <line x1="156" y1="12" x2="246" y2="12" stroke="url(#gr)" stroke-width="1.2"/>
      <path d="M104 12 q13 -9 26 0 q13 9 26 0" fill="none" stroke="#e8c66d" stroke-width="1.2"/>
      <path d="M130 4.5 l5.5 7.5 -5.5 7.5 -5.5 -7.5 z" fill="#f9ecbe"/>
      <circle cx="14" cy="12" r="1.9" fill="#e8c66d"/><circle cx="246" cy="12" r="1.9" fill="#e8c66d"/>
    </symbol>
  </defs>
</svg>

<div class="sky" aria-hidden="true">
  <div class="nebs" id="nebs">
    <div class="neb" style="width:60vw;height:60vw;left:-15vw;top:2vh;background:radial-gradient(circle,#5566cc,transparent 70%);--nd:20s;--nx:5vw;--ny:4vh"></div>
    <div class="neb" style="width:55vw;height:55vw;right:-18vw;top:34vh;background:radial-gradient(circle,#8a5bd0,transparent 70%);--nd:26s;--nx:-4vw;--ny:-3vh;opacity:.4"></div>
    <div class="neb" style="width:70vw;height:70vw;left:0;bottom:-20vh;background:radial-gradient(circle,#c79a4a,transparent 70%);--nd:24s;--nx:3vw;--ny:-4vh;opacity:.32"></div>
  </div>
  <div class="stars" id="stars"></div>
  <div class="shoot"></div>
</div>
<div class="vignette" aria-hidden="true"></div>

<audio id="nasheed" loop preload="auto" src="/nasheed.mp3"></audio>
<button id="muteBtn" class="mute" aria-label="Toggle music">
  <svg class="ico ico-on" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a5 5 0 0 1 0 7"/><path d="M18.6 6a8 8 0 0 1 0 12"/></svg>
  <svg class="ico ico-off" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9.5l4.5 5M21.5 9.5l-4.5 5"/></svg>
</button>

<div class="cover" id="cover">
  <div class="cover-card">
    <div class="moon"></div>
    <div class="kicker">You are invited to the Nikah of</div>
    <div class="who gold-text"><span class="ln">Ammad Arif</span><span class="amp">&amp;</span><span class="ln">Aiza Farooq</span></div>
    <div class="urdu">عماد عارف &nbsp;&amp;&nbsp; عائزہ فاروق</div>
    <button class="openbtn" id="openBtn"><span class="dot"></span> Open Invitation</button>
    <div class="tiny">Tap to open</div>
  </div>
</div>

<main>
  <div class="wrap">

    <section class="reveal">
      <div class="bismillah gold-text">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
      <div class="bismillah-sub">In the name of Allah, the Most Gracious, the Most Merciful</div>
    </section>

    <svg class="flourish reveal"><use href="#flr"/></svg>

    <section class="reveal">
      <div class="kicker">Nikah Ceremony</div>
      <p class="invite-line">With the blessings of Allah, we joyfully request the honour of your presence at the Nikah of</p>
      <div class="names">
        <div class="name gold-text">Ammad Arif</div>
        <span class="amp">&amp;</span>
        <div class="name gold-text">Aiza Farooq</div>
      </div>
      <div class="urdu-names">عماد عارف &nbsp;&amp;&nbsp; عائزہ فاروق</div>
    </section>

    <svg class="flourish reveal"><use href="#flr"/></svg>

    <section class="reveal">
      <div class="kicker" id="cdKicker">Save the Date</div>
      <div class="date-big gold-text">Friday &middot; 30 October 2026</div>
      <div class="count" id="count" aria-label="Countdown to the nikah">
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
          <div class="detail-val" id="timeVal">4:00 PM sharp</div>
        </div>
        <svg class="flourish"><use href="#flr"/></svg>
        <div>
          <div class="detail-lab">Venue</div>
          <div class="detail-val" id="venueName">The Lounge</div>
          <div class="detail-val" id="venueAddr" style="font-size:16px;color:var(--muted)">B-99, 4th Floor and Rooftop, Block H, North Nazimabad Town, Karachi</div>
        </div>
        <div class="btns">
          <a class="btn" id="mapBtn" href="https://share.google/lzaYLlUgiovLOl9XC" target="_blank" rel="noopener">◈ View on Map</a>
          <a class="btn" id="calBtn" href="#" target="_blank" rel="noopener">✦ Add to Calendar</a>
        </div>
      </div>
    </section>

    <svg class="flourish reveal"><use href="#flr"/></svg>

    <section class="reveal">
      <div class="kicker">For Any Queries</div>
      <p class="invite-line">For directions or any further details, feel free to call or message us</p>
      <div class="rsvp">
        <div class="rsvp-row">
          <span class="rsvp-num">0334 3856205</span>
          <a class="rsvp-chip" href="tel:+923343856205">Call</a>
          <a class="rsvp-chip" href="https://wa.me/923343856205" target="_blank" rel="noopener">WhatsApp</a>
        </div>
        <div class="rsvp-row">
          <span class="rsvp-num">0327 8443240</span>
          <a class="rsvp-chip" href="tel:+923278443240">Call</a>
          <a class="rsvp-chip" href="https://wa.me/923278443240" target="_blank" rel="noopener">WhatsApp</a>
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
      <div class="family">With love, from the Family</div>
    </footer>

  </div>
</main>
`;

export default function Page() {
  useEffect(() => {
    const box = document.getElementById("stars");
    if (box && !box.childElementCount) {
      const frag = document.createDocumentFragment();
      const n = window.innerWidth < 600 ? 52 : 76;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        s.className = "star";
        const sz = Math.random() * 2 + 0.6;
        s.style.width = sz + "px";
        s.style.height = sz + "px";
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 100 + "%";
        s.style.setProperty("--tw", (Math.random() * 3 + 2).toFixed(2) + "s");
        s.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
        frag.appendChild(s);
      }
      const d = window.innerWidth < 600 ? 18 : 26;
      for (let j = 0; j < d; j++) {
        const p = document.createElement("span");
        p.className = "dust";
        const ps = Math.random() * 3 + 2;
        p.style.width = ps + "px";
        p.style.height = ps + "px";
        p.style.left = Math.random() * 100 + "%";
        p.style.setProperty("--d", (Math.random() * 10 + 12).toFixed(1) + "s");
        p.style.setProperty("--dl", (-Math.random() * 18).toFixed(1) + "s");
        p.style.setProperty("--dx", (Math.random() * 40 - 20).toFixed(0) + "px");
        frag.appendChild(p);
      }
      const sk = window.innerWidth < 600 ? 14 : 20;
      for (let k = 0; k < sk; k++) {
        const sp = document.createElement("span");
        sp.className = "spark";
        const z = Math.random() * 3 + 2.5;
        sp.style.width = z + "px";
        sp.style.height = z + "px";
        sp.style.left = Math.random() * 100 + "%";
        sp.style.setProperty("--fd", (Math.random() * 7 + 9).toFixed(1) + "s");
        sp.style.setProperty("--fdl", (-Math.random() * 12).toFixed(1) + "s");
        sp.style.setProperty("--fx", (Math.random() * 60 - 30).toFixed(0) + "px");
        frag.appendChild(sp);
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
    const hint = document.getElementById("scrollHint");
    function hideHint() {
      if (hint) hint.classList.add("gone");
    }
    function showHint() {
      if (hint) hint.classList.add("shown");
    }
    function open() {
      if (cover) cover.classList.add("open");
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
      if (muteBtn) muteBtn.classList.add("shown");
      if (audio) {
        audio.volume = 0.35;
        audio.play().catch(() => {});
      }
      setTimeout(reveal, 150);
      setTimeout(showHint, 1300);
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

    const target = new Date("2026-10-30T20:30:00+05:00").getTime();
    const over = new Date("2026-10-30T23:00:00+05:00").getTime();
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
      const text = encodeURIComponent("Nikah of Ammad & Aiza");
      const details = encodeURIComponent(
        "With the blessings of Allah, you are warmly invited to the Nikah Ceremony."
      );
      const location = encodeURIComponent("The Lounge, B-99, 4th Floor and Rooftop, Block H, North Nazimabad Town, Karachi");
      const dates = "20261030T110000Z/20261030T160000Z";
      calBtn.setAttribute(
        "href",
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
          text +
          "&dates=" +
          dates +
          "&details=" +
          details +
          "&location=" +
          location
      );
    }

    const nebs = document.getElementById("nebs");
    let raf = false;
    function onScroll() {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        // Only once the cue is actually showing, so the page's own smooth scrollTo(0,0) can't dismiss it.
        if (y > 40 && hint && hint.classList.contains("shown")) hideHint();
        if (box) box.style.transform = "translateY(" + y * 0.15 + "px)";
        if (nebs) nebs.style.transform = "translateY(" + y * 0.06 + "px)";
        raf = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    const GESTURES = ["wheel", "touchmove", "keydown"];
    GESTURES.forEach((e) => window.addEventListener(e, hideHint, { passive: true }));

    if (new URLSearchParams(window.location.search).has("preview")) open();

    return () => {
      clearInterval(iv);
      window.removeEventListener("scroll", onScroll);
      GESTURES.forEach((e) => window.removeEventListener(e, hideHint));
      if (openBtn) openBtn.removeEventListener("click", open);
      if (cover) cover.removeEventListener("click", coverClick);
      if (muteBtn) muteBtn.removeEventListener("click", toggleMute);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP + SCROLL_HINT }} />;
}
