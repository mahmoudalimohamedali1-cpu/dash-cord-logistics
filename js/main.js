/**
 * Fleet Pro - Main JavaScript
 * Logistics Platform Interactive Features
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initScrollToTop();
  initFAQAccordion();
  initTabs();
  initChartAnimations();
  initCounterAnimations();
});

/**
 * Navbar scroll effects
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.navbar-menu');
  
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggle.classList.remove('active');
      menu.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
    }
  });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-right, .scale-in');
  
  if (!animatedElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Scroll to top button
 */
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-to-top');
  
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (!faqItems.length) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (!question) return;
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Tabs functionality
 */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');
  
  if (!tabContainers.length) return;
  
  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const parent = container.parentElement;
    const contents = parent.querySelectorAll('.tab-content');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-tab');
        
        // Remove active from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Remove active from all contents
        contents.forEach(content => content.classList.remove('active'));
        
        // Add active to clicked button
        this.classList.add('active');
        
        // Add active to target content
        const targetContent = parent.querySelector(`#${targetId}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });
}

/**
 * Chart bar animations
 */
function initChartAnimations() {
  const chartBars = document.querySelectorAll('.chart-bar');
  
  if (!chartBars.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);
  
  chartBars.forEach(bar => {
    bar.style.animationPlayState = 'paused';
    observer.observe(bar);
  });
}

/**
 * Counter animations for stats
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (!counters.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

/**
 * Animate a single counter
 */
function animateCounter(element) {
  const text = element.textContent;
  
  // Extract number from text (handles formats like "+500", "99.9%", "+50K")
  const hasPlus = text.includes('+');
  const hasPercent = text.includes('%');
  const hasK = text.includes('K');
  
  let numericValue;
  let cleanText = text.replace(/[+%K]/g, '');
  
  if (cleanText.includes('.')) {
    numericValue = parseFloat(cleanText);
  } else {
    numericValue = parseInt(cleanText);
  }
  
  if (isNaN(numericValue)) return;
  
  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;
  const increment = numericValue / steps;
  
  let current = 0;
  let step = 0;
  
  const timer = setInterval(function() {
    step++;
    current = (step / steps) * numericValue;
    
    if (step >= steps) {
      current = numericValue;
      clearInterval(timer);
    }
    
    let displayValue;
    if (Number.isInteger(numericValue)) {
      displayValue = Math.round(current);
    } else {
      displayValue = current.toFixed(1);
    }
    
    let finalText = '';
    if (hasPlus) finalText += '+';
    finalText += displayValue;
    if (hasK) finalText += 'K';
    if (hasPercent) finalText += '%';
    
    element.textContent = finalText;
  }, stepDuration);
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href === '#') return;
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/**
 * Form validation helper
 */
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  });
  
  return isValid;
}

/**
 * Add loading state to buttons
 */
function setButtonLoading(button, loading = true) {
  if (loading) {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText;
  }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
  // Remove existing toasts
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add styles dynamically
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
  
  .form-input.error,
  .form-select.error,
  .form-textarea.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
  }
`;
document.head.appendChild(style);

/**
 * Handle contact form submission
 */
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm(this)) {
      showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);
    
    // Simulate form submission
    setTimeout(() => {
      setButtonLoading(submitBtn, false);
      showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
      this.reset();
    }, 2000);
  });
}

