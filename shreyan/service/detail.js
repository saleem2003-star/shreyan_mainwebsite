/* =========================================================
   SHREYAN IT SOLUTIONS
   AI & ML DETAIL PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");

    const primaryNavigation =
        document.getElementById("primaryNavigation");

    const dropdowns =
        document.querySelectorAll(".dropdown");

    const dropdownButtons =
        document.querySelectorAll(".dropdown-toggle");


    function closeDropdowns() {

        dropdowns.forEach((dropdown) => {

            dropdown.classList.remove("is-open");

            const button =
                dropdown.querySelector(".dropdown-toggle");

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    function closeMobileMenu() {

        if (!primaryNavigation || !menuToggle) {
            return;
        }

        primaryNavigation.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        closeDropdowns();

    }


    if (menuToggle && primaryNavigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                primaryNavigation.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

            if (!isOpen) {
                closeDropdowns();
            }

        });

    }


    /* =====================================================
       2. DROPDOWN NAVIGATION
    ===================================================== */

    dropdownButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const dropdown = button.closest(".dropdown");

            if (!dropdown) {
                return;
            }

            const wasOpen =
                dropdown.classList.contains("is-open");

            closeDropdowns();

            if (!wasOpen) {

                dropdown.classList.add("is-open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* Close navigation when clicking a normal link */

    document.querySelectorAll(
        ".primary-navigation a"
    ).forEach((link) => {

        link.addEventListener("click", () => {

            if (link.hasAttribute("data-placeholder-link")) {
                return;
            }

            if (window.innerWidth <= 900) {

                closeMobileMenu();

            }

        });

    });


    /* Close navigation when clicking outside */

    document.addEventListener("click", (event) => {

        const nav = document.querySelector(".nav");

        if (!nav || nav.contains(event.target)) {
            return;
        }

        closeDropdowns();

        if (window.innerWidth <= 900) {
            closeMobileMenu();
        }

    });


    /* Escape key support */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    /* Reset navigation when switching to desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeMobileMenu();

        }

    });


    /* =====================================================
       3. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !prefersReducedMotion &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.1,

                    rootMargin:
                        "0px 0px -30px 0px"
                }

            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       4. SCROLL PROGRESS BAR
    ===================================================== */

    const progressBar =
        document.getElementById("progressBar");


    function updateProgressBar() {

        if (!progressBar) {
            return;
        }

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        progressBar.style.width =
            `${Math.min(100, Math.max(0, progress))}%`;

    }


    /* =====================================================
       5. BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    function updateBackToTop() {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 450) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: prefersReducedMotion
                    ? "instant"
                    : "smooth"

            });

        });

    }


    /* =====================================================
       6. OPTIMIZED SCROLL HANDLER
    ===================================================== */

    let scrollScheduled = false;


    function handleScroll() {

        if (scrollScheduled) {
            return;
        }

        scrollScheduled = true;

        window.requestAnimationFrame(() => {

            updateProgressBar();

            updateBackToTop();

            scrollScheduled = false;

        });

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        handleScroll
    );


    /* Initial state */

    updateProgressBar();

    updateBackToTop();


    /* =====================================================
       7. FOOTER YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       8. PREVENT PLACEHOLDER LINKS
    ===================================================== */

    document.querySelectorAll(
        "[data-placeholder-link]"
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

        });

    });

});