document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     HEADER
  ========================================= */

  const header = document.getElementById("siteHeader");

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", function () {

      mobileMenu.classList.toggle("open");

      document.body.classList.toggle(
        "menu-open"
      );

    });


    const mobileLinks =
      mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        mobileMenu.classList.remove("open");

        document.body.classList.remove(
          "menu-open"
        );

      });

    });

  }


  /* =========================================
     SCROLL REVEAL ANIMATION
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(

        function (entries, obs) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              obs.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold: 0.12
        }

      );


    revealElements.forEach(function (element) {

      observer.observe(element);

    });

  } else {

    revealElements.forEach(function (element) {

      element.classList.add("visible");

    });

  }


  /* =========================================
     PORTFOLIO SLIDER
  ========================================= */

  function setupSlider(
    sliderId,
    previousId,
    nextId
  ) {

    const slider =
      document.getElementById(sliderId);

    const previous =
      document.getElementById(previousId);

    const next =
      document.getElementById(nextId);


    if (!slider) return;


    function getScrollAmount() {

      const card =
        slider.querySelector(
          ".portfolio-card"
        );

      if (!card) {

        return 350;

      }

      return (
        card.getBoundingClientRect().width
        + 14
      );

    }


    if (previous) {

      previous.addEventListener(
        "click",
        function () {

          slider.scrollBy({

            left:
              -getScrollAmount(),

            behavior:
              "smooth"

          });

        }
      );

    }


    if (next) {

      next.addEventListener(
        "click",
        function () {

          slider.scrollBy({

            left:
              getScrollAmount(),

            behavior:
              "smooth"

          });

        }
      );

    }


    /* =====================================
       MOUSE DRAG
    ===================================== */

    let isDragging = false;

    let startX = 0;

    let startScroll = 0;


    slider.addEventListener(
      "pointerdown",
      function (event) {

        isDragging = true;

        startX = event.clientX;

        startScroll =
          slider.scrollLeft;

        slider.setPointerCapture(
          event.pointerId
        );

      }
    );


    slider.addEventListener(
      "pointermove",
      function (event) {

        if (!isDragging) return;

        const distance =
          event.clientX - startX;

        slider.scrollLeft =
          startScroll - distance;

      }
    );


    function stopDragging() {

      isDragging = false;

    }


    slider.addEventListener(
      "pointerup",
      stopDragging
    );

    slider.addEventListener(
      "pointercancel",
      stopDragging
    );

    slider.addEventListener(
      "pointerleave",
      stopDragging
    );

  }


  setupSlider(
    "workSlider",
    "workPrev",
    "workNext"
  );


  setupSlider(
    "portfolioSlider",
    "portfolioPrev",
    "portfolioNext"
  );


  /* =========================================
     HERO MOBILE PARALLAX
  ========================================= */

  const device =
    document.querySelector(
      ".hero-device"
    );


  if (
    device &&
    window.innerWidth > 950
  ) {

    let targetX = 0;

    let targetY = 0;

    let currentX = 0;

    let currentY = 0;


    document.addEventListener(
      "mousemove",
      function (event) {

        targetX =
          (
            window.innerWidth / 2
            - event.clientX
          ) / 80;


        targetY =
          (
            window.innerHeight / 2
            - event.clientY
          ) / 80;

      }
    );


    function animateDevice() {

      currentX +=
        (targetX - currentX) * 0.06;

      currentY +=
        (targetY - currentY) * 0.06;


      device.style.marginLeft =
        currentX + "px";


      device.style.marginTop =
        currentY + "px";


      requestAnimationFrame(
        animateDevice
      );

    }


    animateDevice();

  }


  /* =========================================
     IMAGE DRAG DISABLE
  ========================================= */

  document
    .querySelectorAll("img")
    .forEach(function (image) {

      image.setAttribute(
        "draggable",
        "false"
      );

    });


  /* =========================================
     SMOOTH INTERNAL LINKS
  ========================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) return;


          event.preventDefault();


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const position =
            target.getBoundingClientRect()
              .top
            + window.scrollY
            - headerHeight;


          window.scrollTo({

            top: position,

            behavior: "smooth"

          });

        }
      );

    });


});


/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener(
  "load",
  function () {

    const loader =
      document.getElementById(
        "pageLoader"
      );


    if (!loader) return;


    setTimeout(
      function () {

        loader.style.opacity =
          "0";

        loader.style.visibility =
          "hidden";

        loader.style.pointerEvents =
          "none";

      },
      900
    );

  }
);
