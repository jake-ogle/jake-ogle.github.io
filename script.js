const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const stateLabel = document.querySelector(".toggle-state");

const setTheme = (mode) => {
  root.setAttribute("data-theme", mode);
  const isDark = mode === "dark";
  toggle.setAttribute("aria-pressed", String(isDark));
  stateLabel.textContent = isDark ? "Dark" : "Light";
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
