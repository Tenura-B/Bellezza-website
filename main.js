// Debounce function declaration 
function debounce(func, wait = 20) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

document.addEventListener("DOMContentLoaded", function() {
  //  AOS animation
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll);

  //  hero section
const heroSwiper = new Swiper('.heroSwiper', {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  
  breakpoints: {
    
    320: {
      pagination: {
        dynamicBullets: true
      }
    },
    // when window width is >= 768px
    768: {
      pagination: false
    }
  },
  on: {
    init: function() {
      // Autoplay videos 
      const activeSlide = this.slides[this.activeIndex];
      const video = activeSlide.querySelector('video');
      if (video) {
        video.play().catch(e => console.log("Video autoplay prevented:", e));
      }
    },
    slideChange: function() {
     
      document.querySelectorAll('.hero-media').forEach(video => {
        video.pause();
      });
      
      const activeSlide = this.slides[this.activeIndex];
      const video = activeSlide.querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.play().catch(e => console.log("Video play failed:", e));
      }
    }
  }
});

function handleVideoPlayback() {
  const videos = document.querySelectorAll('.hero-media');
  
  videos.forEach(video => {
    
    if (window.innerWidth < 768) {
      video.muted = true;
    }
    const rect = video.getBoundingClientRect();
    const isVisible = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    
    if (isVisible && video.paused) {
      video.play().catch(e => console.log("Video play failed:", e));
    } else if (!isVisible && !video.paused) {
      video.pause();
    }
  });
}

handleVideoPlayback();
window.addEventListener('resize', handleVideoPlayback);
window.addEventListener('scroll', handleVideoPlayback);

document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    const activeSlide = document.querySelector('.swiper-slide-active');
    const video = activeSlide ? activeSlide.querySelector('video') : null;
    if (video) video.play().catch(e => console.log("Video resume failed:", e));
  } else {
    document.querySelectorAll('.hero-media').forEach(video => {
      video.pause();
    });
  }
});





// cust rev secrion

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));
  
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentIndex = parseInt(dot.getAttribute("data-index"));
    showSlide(currentIndex);
  });
});

// Auto-advance slides every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 5000);

// Initialize first slide
showSlide(0);


// Category Section 
  function animateCategoryCards() {
    const categorySection = document.querySelector('.category-section');
    if (!categorySection) return;

    const leftCard = document.querySelector('.left-card');
    const centerCard = document.querySelector('.center-card');
    const rightCard = document.querySelector('.right-card');

    if (!leftCard || !centerCard || !rightCard) return;

    const sectionPosition = categorySection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
      const addAnimationClass = (element) => {
        return new Promise(resolve => {
          element.classList.add('animated');
          element.addEventListener('animationend', resolve, { once: true });
        });
      };

      Promise.all([
        addAnimationClass(leftCard),
        addAnimationClass(centerCard),
        addAnimationClass(rightCard)
      ]).then(() => {
        window.removeEventListener('scroll', debouncedAnimate);
      });
    }
  }

  const debouncedAnimate = debounce(animateCategoryCards);

  //  category animations
  if (document.querySelector('.category-section')) {
    debouncedAnimate();
    window.addEventListener('scroll', debouncedAnimate);
  }

  // Category cards interaction
  const categoryCards = document.querySelectorAll('.category-card');
  if (categoryCards.length > 0) {
    categoryCards.forEach(card => {
      card.style.cursor = 'pointer';
      
      card.addEventListener('click', function() {
        if (this.resetTimeout) {
          clearTimeout(this.resetTimeout);
        }

        categoryCards.forEach(c => {
          c.classList.remove('clicked');
          if (c.resetTimeout) clearTimeout(c.resetTimeout);
        });
        
        this.classList.add('clicked');
        
        this.resetTimeout = setTimeout(() => {
          this.classList.remove('clicked');
          delete this.resetTimeout;
        }, 3000);
      });
    });
  }





  // Contact cards 
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-show");
          contactObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".contact-card").forEach(card => {
    contactObserver.observe(card);
  });
});

// Album image slider for About Us page
if (document.querySelector('.albumSwiper')) {
  var albumSwiper = new Swiper('.albumSwiper', {
    slidesPerView: 4,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: { slidesPerView: 4 },
      576: { slidesPerView: 2 },
      0: { slidesPerView: 1 }
    }
  });
}
