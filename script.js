
// ========================================
// 1. SELECT HTML ELEMENTS
// ========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");


// ========================================
// 2. MOBILE NAVIGATION MENU
// ========================================

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    document.body.classList.toggle("menu-open", isOpen);
});


// Close the mobile menu after clicking a navigation link.

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
});


// Close the mobile menu when switching back to desktop layout.

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});


// ========================================
// 3. LIGHT AND DARK THEME
// ========================================

function updateThemeIcon() {
    const isLight = document.body.classList.contains("light-theme");

    themeToggle.innerHTML = isLight
        ? '<i class="fa-solid fa-moon"></i>'
        : '<i class="fa-solid fa-sun"></i>';

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );
}


// Load the saved theme, if one exists.

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

updateThemeIcon();


// Change the theme when the button is clicked.

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    updateThemeIcon();
});


// ========================================
// 4. SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    // Fallback for browsers without IntersectionObserver.

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


// ========================================
// 5. ACTIVE NAVIGATION LINK
// ========================================

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationLinks.forEach((link) => {

                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


// ========================================
// 6. AUTOMATIC FOOTER YEAR
// ========================================

const yearElement = document.getElementById("current-year");

yearElement.textContent = new Date().getFullYear();


// ========================================
// 7. OPTIONAL HERO TEXT ROTATION
// ========================================

const typingText = document.getElementById("typing-text");

const phrases = [
    "digital experiences.",
    "creative solutions.",
    "meaningful projects."
];

let phraseIndex = 0;

if (!reduceMotion && typingText) {

    setInterval(() => {

        phraseIndex = (phraseIndex + 1) % phrases.length;

        typingText.style.opacity = "0";

        setTimeout(() => {

            typingText.textContent = phrases[phraseIndex];

            typingText.style.opacity = "1";

        }, 200);

    }, 3000);

}


// ========================================
// 8. INITIALIZE HERO TEXT TRANSITION
// ========================================

if (typingText) {
    typingText.style.transition = "opacity 0.2s ease";
}
