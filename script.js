// Theme
const root   = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const state  = document.querySelector(".toggle-state");

const applyTheme = (mode) => {
  root.setAttribute("data-theme", mode);
  const dark = mode === "dark";
  toggle.setAttribute("aria-pressed", String(dark));
  if (state) state.textContent = dark ? "Dark" : "Light";
  localStorage.setItem("theme", mode);
};

const stored = localStorage.getItem("theme");
if (stored === "light" || stored === "dark") {
  applyTheme(stored);
} else {
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

toggle.addEventListener("click", () => {
  applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// Hero particle network
(function () {
  const canvas = document.querySelector('.hero-canvas');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  const hero = document.querySelector('.hero');

  const COUNT   = 95;
  const LINK_D  = 145;   // max distance for particle–particle lines
  const MOUSE_D = 210;   // max distance for cursor lines
  const PUSH_R  = 110;   // cursor repulsion radius
  const BASE_V  = 0.32;

  let W, H, dots, rafId;
  const mouse = { x: -9999, y: -9999 };

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
  const col    = () => isDark() ? 'rgba(41,151,255,' : 'rgba(0,102,204,';

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  class Dot {
    constructor(init) {
      this.x  = Math.random() * (W || window.innerWidth);
      this.y  = init ? Math.random() * (H || window.innerHeight) : -5;
      this.vx = (Math.random() - 0.5) * BASE_V * 2;
      this.vy = (Math.random() - 0.5) * BASE_V * 2;
      this.r  = Math.random() * 1.2 + 0.8;
    }
    tick() {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const d  = Math.hypot(dx, dy);
      if (d < PUSH_R && d > 0) {
        const f = (1 - d / PUSH_R) * 0.55;
        this.vx += (dx / d) * f;
        this.vy += (dy / d) * f;
      }
      this.vx *= 0.98;
      this.vy *= 0.98;
      const spd = Math.hypot(this.vx, this.vy);
      if (spd > 2.2) { this.vx = (this.vx / spd) * 2.2; this.vy = (this.vy / spd) * 2.2; }
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20)    this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20)    this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }
  }

  function init() {
    resize();
    dots = Array.from({ length: COUNT }, (_, i) => new Dot(true));
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    const c = col();

    dots.forEach(d => d.tick());

    // Particle–particle lines
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const d = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
        if (d < LINK_D) {
          ctx.beginPath();
          ctx.strokeStyle = c + ((1 - d / LINK_D) * 0.22) + ')';
          ctx.lineWidth = 0.7;
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
      // Cursor lines
      const md = Math.hypot(dots[i].x - mouse.x, dots[i].y - mouse.y);
      if (md < MOUSE_D) {
        ctx.beginPath();
        ctx.strokeStyle = c + ((1 - md / MOUSE_D) * 0.6) + ')';
        ctx.lineWidth = 1;
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    // Dots
    dots.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = c + '0.65)';
      ctx.fill();
    });

    // Cursor node
    if (mouse.x > 0) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = c + '0.95)';
      ctx.fill();
    }

    rafId = requestAnimationFrame(frame);
  }

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  }, { passive: true });

  hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { if (!rafId) frame(); }
    else { cancelAnimationFrame(rafId); rafId = null; }
  }).observe(hero);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      dots.forEach(d => {
        if (d.x > W) d.x = Math.random() * W;
        if (d.y > H) d.y = Math.random() * H;
      });
    }, 150);
  }, { passive: true });

  init();
  frame();
})();

// Active nav on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const onScroll = () => {
  const scrollY = window.scrollY;
  let current = "";
  sections.forEach((s) => {
    if (scrollY >= s.offsetTop - 90) current = s.id;
  });
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
