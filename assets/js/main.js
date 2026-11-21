/* Main entry point. Content is imported from data.js and rendered with small dependency-free components. */

import { experiences, heroSignals, navigation, profile, quickLinks, projects, skillGroups } from "./data.js";

import {
  link,
  renderCard,
  renderContactLink,
  renderNavigation,
  renderProject,
  renderSkillGroup,
  renderList
} from "./components.js";

const setHtml = (selector, html) => {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = html;
};

const setText = (selector, text) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
};

const updateStaticProfileText = () => {
  document.title = `${profile.name} — ${profile.tagline}`;
  document.querySelectorAll(".nav__brand").forEach((element) => {
    element.textContent = profile.shortName;
  });
};

const renderHeroActions = () => {
  const actions = [
    { href: profile.cv, label: "Download CV", className: "button button--primary" },
    { href: "#projects", label: "View projects", className: "button button--secondary" },
    { href: "#contact", label: "Contact", className: "button button--secondary" }
  ];
  setHtml("#hero-actions", actions.map(link).join(""));
};

const renderContactLinks = () => {
  const links = [
    profile.email ? { href: `mailto:${profile.email}`, label: "Email", detail: profile.email } : null,
    { href: profile.cv, label: "CV (English)", detail: "PDF download" },
    { href: profile.cvFr, label: "CV (French)", detail: "PDF download" },
    profile.linkedin ? { href: profile.linkedin, label: "LinkedIn", detail: "Professional profile" } : null,
    profile.github ? { href: profile.github, label: "GitHub", detail: "Code repositories" } : null,
  ].filter(Boolean);

  setHtml("#contact-links", links.map(renderContactLink).join(""));
  setText("#contact-note", profile.emailNote);
};

const bindMobileNavigation = () => {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector("#nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
};

const init = () => {
  updateStaticProfileText();
  setHtml("#nav-menu", renderNavigation(navigation));
  renderHeroActions();
  setHtml("#hero-signals", renderList(heroSignals, "evidence-list"));
  setHtml("#quick-links", quickLinks.map(({ label, href }) => `<a href="${href}">${label}</a>`).join(""));
  setHtml("#projects-grid", projects.map(renderProject).join(""));
  setHtml("#experience-grid", experiences.map(renderCard).join(""));
  setHtml("#skills-grid", skillGroups.map(renderSkillGroup).join(""));
  renderContactLinks();
  setHtml("#current-year", new Date().getFullYear());
  bindMobileNavigation();
};

document.addEventListener("DOMContentLoaded", init);
