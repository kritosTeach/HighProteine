// High Protein Quick Meals - Interactive Features
// Search, filters, forms, sticky elements, GA events

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle (if needed)
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('nav ul').classList.toggle('active');
    });
  }

  // Search functionality (client-side across recipes)
  const searchInput = document.querySelector('.search-input');
  const recipeCards = document.querySelectorAll('.recipe-card');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      recipeCards.forEach(card => {
        const title = card.querySelector('.recipe-title')?.textContent.toLowerCase() || '';
        const visible = title.includes(query);
        card.style.display = visible ? 'block' : 'none';
      });
    });
  }

  // Category filters
  const categoryBtns = document.querySelectorAll('.category-btn');
  const categories = ['breakfast', 'lunch', 'dinner', 'snack']; // Define categories
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      // Toggle active
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (category === 'all') {
        recipeCards.forEach(card => card.style.display = 'block');
        return;
      }
      
      recipeCards.forEach(card => {
        const cat = card.dataset.category || '';
        card.style.display = cat.includes(category) ? 'block' : 'none';
      });
    });
  });

  // Newsletter form (placeholder - integrate with EmailJS or Formspree)
  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing! (Demo - integrate with EmailJS)');
      newsletterForm.reset();
    });
  }

  // Contact form
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message sent! (Demo - integrate with Formspree)');
      contactForm.reset();
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
      
      // Close others
      document.querySelectorAll('.faq-answer').forEach(a => {
        a.style.maxHeight = '0px';
      });
      
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Sticky sidebar ads
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    let sticky = sidebar.offsetTop;
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= sticky) {
        sidebar.classList.add('sticky');
      } else {
        sidebar.classList.remove('sticky');
      }
    });
  }

  // Lazy load images (native)
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
  } else {
    // Fallback polyfill
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      images.forEach(img => imageObserver.observe(img));
    });
  }

  // Google Analytics placeholder (GA4)
  // Uncomment and replace G-XXXXXXXXXX with your ID
  /*
  (function() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  })();
  */

  // Recipe scroll spy for navigation (single page)
  const recipeSections = document.querySelectorAll('.recipe-section');
  window.addEventListener('scroll', () => {
    let current = '';
    recipeSections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    // Update nav active class
  });

  // Performance: Preload critical resources
  const preloadLinks = [
    '/css/style.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
  ];
  preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
});
