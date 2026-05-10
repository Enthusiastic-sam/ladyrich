/* ============================================================
   Lady Rich Glorious Light Foundation — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* === NAVIGATION: SCROLL EFFECT === */
  const navbar = document.querySelector('.navbar');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* === HAMBURGER MENU === */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) closeMenu();
    });

    function closeMenu() {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  /* === SCROLL REVEAL === */
  const revealItems = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window && revealItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  /* === CONTACT FORM === */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const successMsg = document.getElementById('form-success');
    const errorMsg   = document.getElementById('form-error');
    const submitBtn  = contactForm.querySelector('.form-submit');
    const originalBtnText = submitBtn.textContent;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      successMsg.style.display = 'none';
      errorMsg.style.display   = 'none';

      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending…';

      try {
        const response = await fetch(contactForm.action, {
          method:  'POST',
          body:    new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.reset();
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          throw new Error('Submission failed');
        }
      } catch {
        errorMsg.style.display = 'block';
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } finally {
        submitBtn.disabled    = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

});
