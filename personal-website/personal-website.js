/**
 * personal-website.js
 * =====================================================
 * Handles all interactive behaviour for the portfolio:
 *  1. Navbar — smooth scroll, active link highlight,
 *              mobile hamburger toggle, scroll shadow
 *  2. Stats counter animation (Intersection Observer)
 *  3. Skill-ring animation  (Intersection Observer)
 *  4. Portfolio filter
 *  5. Contact-form validation & submission
 *  6. Footer — current year
 *
 * Loaded as type="module" — automatically strict-mode
 * and fully module-scoped (no globals exposed to console).
 * =====================================================
 */

function init() {

  /* HELPERS */

  /**
   * Strips < > and trims whitespace so user input can
   * never inject HTML if it's rendered back into the DOM.
   * @param {unknown} value
   * @returns {string}
   */
  const sanitize = value =>
    String(value ?? '')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .trim();

  /* NAVBAR */

  const navbar     = document.querySelector(".navbar");
  const navToggle  = document.getElementById("navToggle");
  const navMenu    = document.getElementById("navMenu");
  const navLinks   = document.querySelectorAll(".navbar__link");

  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close menu on link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");

      // Highlight active link
      navLinks.forEach(l => l.classList.remove("navbar__link--active"));
      link.classList.add("navbar__link--active");
    });
  });

  // Add shadow when scrolled
  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("navbar--scrolled", window.scrollY > 20);
  }, { passive: true });

  // Update active link on scroll using IntersectionObserver
  const sections = document.querySelectorAll("section[id]");

  const activeLinkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              "navbar__link--active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    {
      // rootMargin offsets the sticky navbar height so a section
      // is only considered "active" once it clears the bar.
      // threshold 0.15 handles tall sections on narrow screens.
      threshold: 0.15,
      rootMargin: "-80px 0px 0px 0px",
    }
  );

  sections.forEach(section => activeLinkObserver.observe(section));


  /* STATS COUNTER ANIMATION */

  /**
   * Animates a number from 0 to `target` over `duration` ms.
   * @param {HTMLElement} el
   * @param {number}      target
   * @param {number}      [duration=1500]
   */
  function animateCounter(el, target, duration = 1500) {
    const start     = performance.now();
    const easeOut   = t => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  const statNumbers = document.querySelectorAll(".hero__stat-number");

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          statsObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.6 }
  );

  statNumbers.forEach(el => statsObserver.observe(el));


  /* SKILL RING ANIMATION */

  // 2π × r(50) — kept as a const primitive so it's inherently immutable.
  const CIRCUMFERENCE = 2 * Math.PI * 50; // ≈ 314.159

  /**
   * Calculates stroke-dashoffset for a given percentage.
   * @param {number} percent 0-100
   * @returns {number}
   */
  const percentToOffset = percent =>
    CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  const skillFills = document.querySelectorAll(".skill__fill");

  const ringObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle  = entry.target;
          const percent = parseInt(circle.dataset.percent, 10);
          // Append 'px' so iOS Safari / WebKit honours the value when
          // stroke-dasharray is also expressed in px (via --ring-circ).
          circle.style.strokeDashoffset = percentToOffset(percent) + "px";
          ringObserver.unobserve(circle);
        }
      });
    },
    // 0.15 is low enough that rings trigger even when only partially
    // visible on a narrow 430 px viewport, yet avoids premature fires.
    { threshold: 0.15 }
  );

  skillFills.forEach(fill => ringObserver.observe(fill));


  /* PORTFOLIO FILTER */

  const filterButtons   = document.querySelectorAll(".portfolio__filter");
  const portfolioItems  = document.querySelectorAll(".portfolio-item");
  const portfolioGrid   = document.getElementById("portfolioGrid");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Toggle active state & aria attributes
      filterButtons.forEach(btn => {
        btn.classList.remove("portfolio__filter--active");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("portfolio__filter--active");
      button.setAttribute("aria-selected", "true");

      const filter = button.dataset.filter;

      portfolioItems.forEach(item => {
        const match = filter === "all" || item.dataset.category === filter;
        match ? item.removeAttribute("hidden") : item.setAttribute("hidden", "");
      });

      // Snap carousel back to start on mobile
      if (portfolioGrid) portfolioGrid.scrollTo({ left: 0, behavior: "smooth" });
    });
  });


  /* CONTACT FORM */

  const contactForm = document.getElementById("contactForm");
  let isSubmitting = false;

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const f = contactForm.elements;
    const payload = Object.freeze({
      name:     sanitize(f.name?.value),
      email:    sanitize(f.email?.value),
      phone:    sanitize(f.phone?.value),
      service:  sanitize(f.service?.value),
      timeline: sanitize(f.timeline?.value),
      details:  sanitize(f.details?.value),
    });

    isSubmitting = true;
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const original  = submitBtn.textContent;

    submitBtn.textContent = "Sending…";
    submitBtn.disabled    = true;

    void payload;
    setTimeout(() => {
      submitBtn.textContent = "Sent ✓";
      contactForm.reset();
      setTimeout(() => {
        submitBtn.textContent = original;
        submitBtn.disabled    = false;
        isSubmitting = false;
      }, 2500);
    }, 1200);
  });


  /* FOOTER — CURRENT YEAR */

  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

}

document.addEventListener("DOMContentLoaded", init);
