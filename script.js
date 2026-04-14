// Theme toggle
const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const stateLabel = document.querySelector(".toggle-state");

const setTheme = (mode) => {
  root.setAttribute("data-theme", mode);
  const isDark = mode === "dark";
  toggle.setAttribute("aria-pressed", String(isDark));
  if (stateLabel) stateLabel.textContent = isDark ? "Dark" : "Light";
  localStorage.setItem("theme", mode);
};

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light" || storedTheme === "dark") {
  setTheme(storedTheme);
} else {
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

toggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".sidebar-nav a");

const onScroll = () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
