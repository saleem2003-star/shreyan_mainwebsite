// ================= Hero Video Background Seamless Swapping Engine =================
(function(){
  var A=document.getElementById('bgVideoA'),B=document.getElementById('bgVideoB');
  if(!A||!B)return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){
    A.removeAttribute('autoplay'); A.pause(); B.pause();
    try{A.currentTime=0;}catch(e){}
    return;
  }
  var FADE=0.9,cur=A,nxt=B,swapping=false;
  function play(v){ try{ var p=v.play(); if(p&&p.catch)p.catch(function(){}); }catch(e){} }
  play(A);
  function tick(){
    if(swapping||!cur.duration)return;
    if(cur.duration-cur.currentTime>FADE)return;
    swapping=true; var out=cur;
    nxt.currentTime=0; play(nxt);
    nxt.classList.add('is-active'); out.classList.remove('is-active');
    cur=nxt; nxt=out;
    setTimeout(function(){ out.pause(); out.currentTime=0; swapping=false; },FADE*1000+100);
  }
  A.addEventListener('timeupdate',tick); B.addEventListener('timeupdate',tick);
})();

// ================= Repeated Scroll Animation Observer =================
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".slide-from-left, .slide-from-bottom, .slide-fade-trigger"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach((el) => observer.observe(el));

  // ================= Testimonial Carousel Controls =================
  const track = document.getElementById("testimonialTrack");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  
  if (track && prevBtn && nextBtn) {
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll(".testimonial-slide").length;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    nextBtn.addEventListener("click", function () {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });

    prevBtn.addEventListener("click", function () {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const tabBtns = document.querySelectorAll(".client-tab-btn");
    const spotlightCards = document.querySelectorAll(".testimonial-spotlight-card");
    let autoRotateInterval;
    let currentIndex = 0;

    function activateTestimonial(index) {
        tabBtns.forEach((btn) => btn.classList.remove("active"));
        spotlightCards.forEach((card) => card.classList.remove("active"));

        tabBtns[index].classList.add("active");
        spotlightCards[index].classList.add("active");
        currentIndex = index;
    }

    // Tab Click Event
    tabBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            activateTestimonial(index);
            resetAutoRotate();
        });
    });

    // Auto-Rotation Timer (Every 6 seconds)
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % tabBtns.length;
            activateTestimonial(currentIndex);
        }, 6000);
    }

    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }

    startAutoRotate();
});

document.getElementById('scrollRightBtn').addEventListener('click', function() {
        const track = document.getElementById('servicesScrollTrack');
        track.scrollBy({ left: 380, behavior: 'smooth' });
    });