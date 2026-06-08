document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.querySelector('.liquid-navbar');
  const handleScroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();


  const dots = document.querySelectorAll('.dot-new');
  const cards = document.querySelectorAll('.sport-card-new');
  const leftPanel = document.querySelector('.carousel-side-panel.left');
  const rightPanel = document.querySelector('.carousel-side-panel.right');
  const track = document.querySelector('.carousel-track');
  let currentIndex = 0;
  let autoPlayTimer = null;

  const setActiveCard = (index) => {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    currentIndex = index;

    dots.forEach(d => d.classList.remove('active'));
    cards.forEach(c => {
      c.classList.remove('active');
      c.style.opacity = '0';
      c.style.transform = 'scale(0.95)';
    });

    if (dots[index]) dots[index].classList.add('active');
    const activeCard = cards[index];
    if (activeCard) {
      activeCard.classList.add('active');
      activeCard.style.opacity = '1';
      activeCard.style.transform = 'scale(1)';
    }
  };

  const startAutoPlay = () => {
    autoPlayTimer = setInterval(() => {
      setActiveCard(currentIndex + 1);
    }, 3000);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  };

  startAutoPlay();

  const carouselSection = document.querySelector('.sports-carousel-section-new');
  if (carouselSection) {
    carouselSection.addEventListener('mouseenter', stopAutoPlay);
    carouselSection.addEventListener('mouseleave', startAutoPlay);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      setActiveCard(index);
      startAutoPlay();
    });
  });

  if (leftPanel) {
    leftPanel.addEventListener('click', () => {
      stopAutoPlay();
      setActiveCard(currentIndex - 1);
      startAutoPlay();
    });
  }
  if (rightPanel) {
    rightPanel.addEventListener('click', () => {
      stopAutoPlay();
      setActiveCard(currentIndex + 1);
      startAutoPlay();
    });
  }

  if (track) {
    let startX = 0;
    let isDragging = false;

    const handleStart = (e) => {
      startX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      isDragging = true;
      stopAutoPlay();
    };

    const handleEnd = (e) => {
      if (!isDragging) return;
      const endX = e.type.startsWith('touch') ? e.changedTouches[0].clientX : e.clientX;
      const diffX = endX - startX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          setActiveCard(currentIndex - 1);
        } else {
          setActiveCard(currentIndex + 1);
        }
      }
      isDragging = false;
      startAutoPlay();
    };

    track.addEventListener('touchstart', handleStart, { passive: true });
    track.addEventListener('touchend', handleEnd, { passive: true });
    track.addEventListener('mousedown', handleStart);
    track.addEventListener('mouseup', handleEnd);
    track.addEventListener('mouseleave', () => { isDragging = false; });
  }

  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.target.includes('.');
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(el => animateCounter(el));
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

function closeSiteLoadPopup() {
  const popup = document.getElementById('siteLoadPopup');
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openJoinUsPopup() {
  const popup = document.getElementById('joinUsPopup');
  if (popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeJoinUsPopup() {
  const popup = document.getElementById('joinUsPopup');
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openFaqPopup() {
  const popup = document.getElementById('faqPopup');
  if (popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeFaqPopup() {
  const popup = document.getElementById('faqPopup');
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function submitJoinUsForm(event) {
  event.preventDefault();

  const name = document.getElementById('joinName').value;
  const number = document.getElementById('joinNumber').value;
  const venueName = document.getElementById('joinVenueName').value;
  const location = document.getElementById('joinLocation').value;
  const otherInfo = document.getElementById('joinOtherInfo').value;

  const sportsCheckboxes = document.querySelectorAll('input[name="joinSports"]:checked');
  const sports = Array.from(sportsCheckboxes).map(cb => cb.value).join(', ');

  const whatsappMessage = encodeURIComponent(
    `New Venue Registration Details:\n\n` +
    `Name: ${name}\n` +
    `Contact Number: ${number}\n` +
    `Venue Name: ${venueName}\n` +
    `Venue Location: ${location}\n` +
    `Sports Available: ${sports || 'None selected'}\n\n` +
    `Additional Information:\n${otherInfo}`
  );

  window.open(`https://wa.me/9156860802?text=${whatsappMessage}`, '_blank');
  event.target.reset();
  closeJoinUsPopup();
}

function submitSolidForm(event) {
  event.preventDefault();

  const venueName = document.getElementById('venueName').value;
  const contactName = document.getElementById('contactName').value;
  const contactNumber = document.getElementById('contactNumber').value;
  const contactEmail = document.getElementById('contactEmail').value;
  const venueLocation = document.getElementById('venueLocation').value;

  const sportsCheckboxes = document.querySelectorAll('input[name="sports"]:checked');
  const sports = Array.from(sportsCheckboxes).map(cb => cb.value).join(', ');

  const otherInfo = document.getElementById('otherInfo').value;

  const whatsappMessage = encodeURIComponent(
    `New Venue Application Details:\n\n` +
    `Contact Person: ${contactName}\n` +
    `Contact Number: ${contactNumber}\n` +
    `Contact Email: ${contactEmail}\n` +
    `Venue Name: ${venueName}\n` +
    `Venue Location: ${venueLocation}\n` +
    `Sports Available: ${sports || 'None selected'}\n\n` +
    `Additional Information:\n${otherInfo}`
  );

  window.open(`https://wa.me/9156860802?text=${whatsappMessage}`, '_blank');
  event.target.reset();
}

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.style.display = 'none';

      const popup = document.getElementById('siteLoadPopup');
      if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }, 600);
  }, 4000); // Wait for the full 4s animation cycle
});
