// Program Images Rotation
function setupProgramImageRotation() {
  const programContainers = document.querySelectorAll('.program-image-container');
  
  programContainers.forEach(container => {
      const images = container.querySelectorAll('img');
      let currentIndex = 0;
      
      // Function to rotate images
      function rotateImages() {
          images.forEach(img => img.classList.remove('active'));
          currentIndex = (currentIndex + 1) % images.length;
          images[currentIndex].classList.add('active');
      }
      
      setInterval(rotateImages, 3000 + Math.random() * 1000);
  });
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      // Don't prevent default for dropdown toggle
      if (this.classList.contains('dropdown-toggle')) return;
      
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Skip empty links
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
          });
      }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
      header.style.padding = '10px 0';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
      header.style.padding = '15px 0';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// Form submission (prevent default for demo)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formElements = form.elements;
      let isValid = true;
      
      for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].hasAttribute('required') && !formElements[i].value) {
              isValid = false;
              formElements[i].style.borderColor = 'red';
          } else if (formElements[i].type !== 'submit') {
              formElements[i].style.borderColor = '#ddd';
          }
      }
      
      if (isValid) {
          alert('Form submitted successfully! (Demo only)');
          form.reset();
      } else {
          alert('Please fill in all required fields.');
      }
  });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.mission-card, .program, .about-image, .about-text');

function checkReveal() {
  const triggerBottom = window.innerHeight * 0.8;
  
  revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
      }
  });
}

revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', checkReveal);

// Upcoming Services Slider
function setupServicesSlider() {
  const slides = document.querySelectorAll('.service-slide');
  const prevBtn = document.querySelector('.prev-service');
  const nextBtn = document.querySelector('.next-service');
  const indicators = document.querySelectorAll('.indicator');
  const sliderContainer = document.querySelector('.services-slider');
  let currentSlide = 0;
  const slideCount = slides.length;
  
  let slideInterval = setInterval(nextSlide, 5000);
  
  function updateSlider() {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[currentSlide].classList.add('active');
      indicators.forEach(indicator => indicator.classList.remove('active'));
      indicators[currentSlide].classList.add('active');
  }
  
  function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
  }
  
  function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlider();
  }
  
  function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSlider();
  }
  
  if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => {
          clearInterval(slideInterval);
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
          slideInterval = setInterval(nextSlide, 3000);
      });
  }
  
  if (prevBtn && nextBtn) {
      nextBtn.addEventListener('click', () => {
          nextSlide();
          resetInterval();
      });
      
      prevBtn.addEventListener('click', () => {
          prevSlide();
          resetInterval();
      });
  }
  
  indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
          currentSlide = parseInt(indicator.getAttribute('data-index'));
          updateSlider();
          resetInterval();
      });
  });
}

// Modal functionality
function setupModalFunctionality() {
  // Get modal elements
  const partnerModal = document.getElementById('partnerModal');
  const giveModal = document.getElementById('giveModal');
  const closeButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
  
  // Get dropdown menu items
  const partnerLink = document.querySelector('.dropdown-menu li:nth-child(2) a');
  const giveLink = document.querySelector('.dropdown-menu li:nth-child(1) a');
  
  // Open modals when clicking dropdown items
  if (partnerLink) {
      partnerLink.addEventListener('click', function(e) {
          e.preventDefault();
          openModal(partnerModal);
      });
  }
  
  if (giveLink) {
      giveLink.addEventListener('click', function(e) {
          e.preventDefault();
          openModal(giveModal);
      });
  }
  
  // Close modals when clicking close buttons
  closeButtons.forEach(button => {
      button.addEventListener('click', function() {
          closeAllModals();
      });
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal-overlay')) {
          closeAllModals();
      }
  });
  
  // Switch from Give to Partner modal
  const openPartnerFromGiveBtn = document.getElementById('openPartnerFromGive');
  if (openPartnerFromGiveBtn) {
      openPartnerFromGiveBtn.addEventListener('click', function() {
          closeModal(giveModal);
          setTimeout(() => {
              openModal(partnerModal);
          }, 300); // Small delay for smooth transition
      });
  }
  
  // Helper functions
  function openModal(modal) {
      closeAllModals(); // Close any open modals first
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
  }
  
  function closeModal(modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
  }
  
  function closeAllModals() {
      const modals = document.querySelectorAll('.modal-overlay');
      modals.forEach(modal => {
          modal.classList.remove('active');
      });
      document.body.style.overflow = ''; // Restore scrolling
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupProgramImageRotation();
  setupServicesSlider();
  checkReveal();
  setupModalFunctionality();
  
  // PARTNERS functionality
  // Get the dropdown toggle element
  let dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  // Toggle dropdown on click
  if (dropdownToggle) {
      dropdownToggle.addEventListener('click', function(e) {
          // Only prevent default on mobile
          if (window.innerWidth <= 768) {
              e.preventDefault(); // Prevent default link behavior
              dropdownMenu.classList.toggle('active');
              dropdown.classList.toggle('active');
          }
      });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
          dropdownMenu.classList.remove('active');
          dropdown.classList.remove('active');
      }
  });
  
  // Prevent dropdown from closing when clicking inside it
  if (dropdownMenu) {
      dropdownMenu.addEventListener('click', function(e) {
          e.stopPropagation();
      });
  }
  
  // Fix for iOS touch events
  if ('ontouchstart' in window) {
      document.body.classList.add('touch-device');
      
      // Special handling for touch devices
      if (dropdownToggle) {
          dropdownToggle.addEventListener('touchstart', function(e) {
              if (window.innerWidth <= 768) {
                  e.preventDefault();
                  dropdownMenu.classList.toggle('active');
                  dropdown.classList.toggle('active');
              }
          });
      }
  }
});