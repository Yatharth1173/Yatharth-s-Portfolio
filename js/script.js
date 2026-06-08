(function () {
  "use strict";

  var root = document.documentElement;

  // ----- Scroll reveal (Intersection Observer) -----
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.1
      }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ----- Mobile menu toggle -----
  var header = document.querySelector(".header");
  var toggle = document.querySelector(".nav__toggle");
  var menuLinks = document.querySelectorAll(".nav__link");

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("is-menu-open");
      toggle.setAttribute("aria-expanded", isOpen);
    });

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ----- Hero float buttons: pause orbit on hover (fallback) -----
  document.querySelectorAll(".hero__float-orbit").forEach(function (orbit) {
    var btn = orbit.querySelector(".hero__float-btn");
    if (!btn) return;

    btn.addEventListener("mouseenter", function () {
      orbit.style.animationPlayState = "paused";
    });

    btn.addEventListener("mouseleave", function () {
      orbit.style.animationPlayState = "running";
    });

    btn.addEventListener("focus", function () {
      orbit.style.animationPlayState = "paused";
    });

    btn.addEventListener("blur", function () {
      orbit.style.animationPlayState = "running";
    });
  });

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href === "#") return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        if (target.classList.contains("project-card")) {
          target.classList.remove("is-highlighted");
          window.setTimeout(function () {
            target.classList.add("is-highlighted");
            window.setTimeout(function () {
              target.classList.remove("is-highlighted");
            }, 2200);
          }, 500);
        }
      }
    });
  });

  // ----- Footer year -----
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
