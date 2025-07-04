// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
    
    // Initialize scroll position
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    }
  }

  // Close mobile menu when clicking nav links
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navbarCollapse.classList.contains('show')) {
        const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
        if (collapseInstance) {
          collapseInstance.hide();
        }
      }
    });
  });

  // Scroll top button
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    });

    scrollTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Initialize Isotope
  const isotopeLayouts = document.querySelectorAll('.isotope-layout');
  if (isotopeLayouts.length > 0 && typeof Isotope !== 'undefined') {
    isotopeLayouts.forEach(layout => {
      const container = layout.querySelector('.isotope-container');
      const filters = layout.querySelectorAll('.isotope-filters li');
      
      // Initialize Isotope
      const iso = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: layout.getAttribute('data-layout') || 'masonry',
        filter: layout.getAttribute('data-default-filter') || '*'
      });
      
      // Filter items on click
      filters.forEach(filter => {
        filter.addEventListener('click', function() {
          const filterValue = this.getAttribute('data-filter');
          layout.querySelector('.filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          iso.arrange({ filter: filterValue });
        });
      });
    });
  }

  // Navigation scrollspy
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.navmenu a');
  
  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.remove();
        }, 300);
      }, 500);
    });
  }
});