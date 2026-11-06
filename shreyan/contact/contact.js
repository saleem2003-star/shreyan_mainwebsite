/* =====================================================
   contact.js — Scroll Animations & Form Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive Form Submission Handling
    const enquiryForm = document.getElementById('enquiryForm');
    const successMsg = document.getElementById('formSuccessMsg');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = enquiryForm.querySelector('.btn-submit-form');
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');

            // Button Loading State
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.85';
            btnText.textContent = 'Sending...';
            btnIcon.className = 'fa-solid fa-circle-notch fa-spin';

            // Simulate AJAX processing delay
            setTimeout(() => {
                submitBtn.style.display = 'none';
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
                enquiryForm.reset();
            }, 1200);
        });
    }

    // 2. Scroll-Triggered Fade-In Animations
    const elementsToAnimate = [
        '.contact-intro-grid',
        '.contact-card',
        '.contact-secondary-section',
        '.form-wrapper'
    ];

    // Assign animation class & stagger delay
    elementsToAnimate.forEach((selector) => {
        const items = document.querySelectorAll(selector);
        items.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            if (selector === '.contact-card') {
                el.style.transitionDelay = `${index * 0.15}s`;
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
});




// Add map observer to trigger outline animation on scroll
const mapWrapper = document.querySelector('.india-map-wrapper');

if (mapWrapper) {
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                mapObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    mapObserver.observe(mapWrapper);
}