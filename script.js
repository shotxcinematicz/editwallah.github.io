document.addEventListener("DOMContentLoaded", function () {

  // Mobile Menu
  const menu = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");

  if (menu && navLinks) {
    menu.addEventListener("click", function () {
      navLinks.classList.toggle("mobile-active");

      if (navLinks.classList.contains("mobile-active")) {
        navLinks.style.display = "flex";
        navLinks.style.position = "absolute";
        navLinks.style.top = "75px";
        navLinks.style.left = "4%";
        navLinks.style.width = "92%";
        navLinks.style.flexDirection = "column";
        navLinks.style.background = "#101010";
        navLinks.style.padding = "25px";
        navLinks.style.borderRadius = "15px";
        navLinks.style.border = "1px solid #222";
      } else {
        navLinks.style.display = "";
      }
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("mobile-active");
        navLinks.style.display = "";
      });
    });
  }


  // Navbar Scroll Effect
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.style.background = "rgba(7,7,7,0.95)";
      navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
    } else {
      navbar.style.background = "rgba(7,7,7,0.75)";
      navbar.style.boxShadow = "none";
    }
  });


  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (e) {

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });


  // FAQ
  const faqItems = document.querySelectorAll("details");

  faqItems.forEach(function (item) {

    item.addEventListener("toggle", function () {

      if (item.open) {

        faqItems.forEach(function (other) {

          if (other !== item) {
            other.removeAttribute("open");
          }

        });

      }

    });

  });


  // Scroll Reveal
  const elements = document.querySelectorAll(
    ".service, .stat, .feature, .process-card, .about, details, .cta"
  );

  const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.15
  });


  elements.forEach(function (element) {

    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";
    element.style.transition =
      "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);

  });


  // Mouse Glow Effect
  const glow = document.querySelector(".glow");

  if (glow) {

    document.addEventListener("mousemove", function (e) {

      const x =
        (e.clientX / window.innerWidth - 0.5) * 40;

      const y =
        (e.clientY / window.innerHeight - 0.5) * 40;

      glow.style.transform =
        `translate(${x}px, ${y}px)`;

    });

  }


  // Button Click Effect
  const buttons = document.querySelectorAll(
    ".primary, .secondary, .nav-btn, .cta-btn"
  );

  buttons.forEach(function (button) {

    button.addEventListener("click", function () {

      button.style.transform = "scale(0.95)";

      setTimeout(function () {
        button.style.transform = "";
      }, 150);

    });

  });


  console.log("Edit Wallah website loaded successfully 🚀");

});
