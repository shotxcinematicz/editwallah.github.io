/* =========================================
   EDIT WALLAH — SCRIPT.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       LOADER
       ========================================= */

    const loader = document.getElementById("loader");

    if (loader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.classList.add("hide");

            }, 800);

        });

    }


    /* =========================================
       SCROLL REVEAL ANIMATION
       ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }

        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =========================================
       NAVBAR SCROLL EFFECT
       ========================================= */

    const navbar =
        document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 80) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =========================================
       HERO PHONE MOUSE PARALLAX
       ========================================= */

    const phone =
        document.querySelector(".phone");


    if (
        phone &&
        window.innerWidth > 900 &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    (window.innerWidth / 2 -
                        event.clientX) / 70;

                mouseY =
                    (window.innerHeight / 2 -
                        event.clientY) / 70;

            }
        );


        function animatePhone() {

            currentX +=
                (mouseX - currentX) * 0.08;

            currentY +=
                (mouseY - currentY) * 0.08;


            phone.style.transform =
                `rotate(7deg)
                 translate(${currentX}px, ${currentY}px)`;


            requestAnimationFrame(
                animatePhone
            );

        }


        animatePhone();

    }


    /* =========================================
       HORIZONTAL SHOWCASE DRAG
       ========================================= */

    const slider =
        document.querySelector(".showcase-row");


    if (slider) {

        let isDown = false;

        let startX = 0;

        let scrollStart = 0;


        slider.addEventListener(
            "mousedown",
            (event) => {

                isDown = true;

                slider.classList.add(
                    "dragging"
                );

                startX =
                    event.pageX -
                    slider.offsetLeft;

                scrollStart =
                    slider.scrollLeft;

            }
        );


        slider.addEventListener(
            "mouseleave",
            () => {

                isDown = false;

                slider.classList.remove(
                    "dragging"
                );

            }
        );


        slider.addEventListener(
            "mouseup",
            () => {

                isDown = false;

                slider.classList.remove(
                    "dragging"
                );

            }
        );


        slider.addEventListener(
            "mousemove",
            (event) => {

                if (!isDown) return;

                event.preventDefault();

                const currentX =
                    event.pageX -
                    slider.offsetLeft;

                const distance =
                    (currentX - startX) * 1.5;

                slider.scrollLeft =
                    scrollStart - distance;

            }
        );

    }


    /* =========================================
       SMOOTH ANCHOR SCROLL
       ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        this.getAttribute("href");


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =========================================
       SERVICE CARD 3D TILT
       ========================================= */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    if (window.innerWidth > 900) {

        serviceCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) /
                            centerY) * -2;


                    const rotateY =
                        ((x - centerX) /
                            centerX) * 2;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =========================================
       MARQUEE HOVER PAUSE
       ========================================= */

    const marquee =
        document.querySelector(".marquee");


    if (marquee) {

        const track =
            marquee.querySelector(
                ".marquee-track"
            );


        if (track) {

            marquee.addEventListener(
                "mouseenter",
                () => {

                    track.style.animationPlayState =
                        "paused";

                }
            );


            marquee.addEventListener(
                "mouseleave",
                () => {

                    track.style.animationPlayState =
                        "running";

                }
            );

        }

    }


    /* =========================================
       IMAGE FALLBACK
       ========================================= */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Image not found:",
                        image.src
                    );

                }
            );


            image.setAttribute(
                "draggable",
                "false"
            );

        });


    /* =========================================
       WHATSAPP CTA TRACKING
       ========================================= */

    document
        .querySelectorAll(
            'a[href*="wa.me"]'
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    console.log(
                        "Edit Wallah WhatsApp CTA clicked"
                    );

                }
            );

        });


    /* =========================================
       PAGE LOADED
       ========================================= */

    document.body.classList.add(
        "page-loaded"
    );


});
