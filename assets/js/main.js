/* Eagle Revolution — shared JS (no dependencies) */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Dropdowns (click on all sizes, hover on desktop) */
  var drops = document.querySelectorAll(".nav__drop");
  drops.forEach(function (drop) {
    var btn = drop.querySelector("button");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = drop.classList.contains("open");
      drops.forEach(function (d) { d.classList.remove("open"); d.querySelector("button").setAttribute("aria-expanded", "false"); });
      if (!isOpen) { drop.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    });
    if (window.matchMedia("(min-width: 1081px)").matches) {
      drop.addEventListener("mouseenter", function () { drop.classList.add("open"); btn.setAttribute("aria-expanded", "true"); });
      drop.addEventListener("mouseleave", function () { drop.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); });
    }
  });
  document.addEventListener("click", function () {
    drops.forEach(function (d) { d.classList.remove("open"); d.querySelector("button").setAttribute("aria-expanded", "false"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      drops.forEach(function (d) { d.classList.remove("open"); });
      document.body.classList.remove("nav-open");
    }
  });

  /* Reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* Form UX: disable button + honest feedback */
  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    form.addEventListener("submit", function () {
      var btn = form.querySelector("button[type=submit]");
      if (btn) {
        btn.disabled = true;
        btn.dataset.label = btn.textContent;
        btn.textContent = "Sending…";
      }
    });
  });

  /* Current-page nav highlight */
  var path = location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll(".nav a.nav__link, .nav__menu a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href) return;
    var target = new URL(href, location.href).pathname.replace(/index\.html$/, "");
    if (target === path && target !== "/") a.setAttribute("aria-current", "page");
  });
})();
