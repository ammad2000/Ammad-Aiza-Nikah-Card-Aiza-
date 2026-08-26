"use client";

/**
 * Three-state countdown: live timer -> "day of" message -> "after" message.
 * Returns a cleanup function. The Walima cards still carry their own inline copy of
 * this logic; they can adopt this helper after the wedding, when changing them is safe.
 */
export function startCountdown({ targetISO, overISO, onDayOf, onOver }) {
  const target = new Date(targetISO).getTime();
  const over = new Date(overISO).getTime();
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
    if (now >= over) return onOver();
    const diff = target - now;
    if (diff <= 0) return onDayOf();
    set("brDD", Math.floor(diff / 86400000));
    set("brHH", Math.floor((diff % 86400000) / 3600000));
    set("brMM", Math.floor((diff % 3600000) / 60000));
    set("brSS", Math.floor((diff % 60000) / 1000));
  }

  tick();
  const iv = setInterval(tick, 1000);
  return () => clearInterval(iv);
}
