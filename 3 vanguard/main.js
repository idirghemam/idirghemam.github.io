/* ==========================================================
   VANGUARD NETWORK & SECURITY
   main.js — interactions, validation, scroll effects
   ========================================================== */

(function () {
  'use strict';

  // Cache DOM references once
  var header    = document.getElementById('header');
  var menuBtn   = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var form      = document.getElementById('ticket-form');

  // --------------------------------------------------------
  // 1.  Header background on scroll
  // --------------------------------------------------------
  var lastScroll = 0;

  function onScroll() {
    var y = window.scrollY;
    if ((y > 40) !== (lastScroll > 40)) {
      header.classList.toggle('scrolled', y > 40);
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();                       // set initial state


  // --------------------------------------------------------
  // 2.  Smooth-scroll for all #hash links
  // --------------------------------------------------------
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute('href');
    if (id === '#') return;

    var target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    closeMobileNav();
  });


  // --------------------------------------------------------
  // 3.  Mobile nav toggle
  // --------------------------------------------------------
  function closeMobileNav() {
    mobileNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', function () {
    var willOpen = !mobileNav.classList.contains('open');
    mobileNav.classList.toggle('open', willOpen);
    menuBtn.setAttribute('aria-expanded', String(willOpen));
    document.body.style.overflow = willOpen ? 'hidden' : '';
  });


  // --------------------------------------------------------
  // 4.  Contact form — field-level validation
  // --------------------------------------------------------
  var fields = [
    { input: document.getElementById('input-name'),    wrap: document.getElementById('f-name') },
    { input: document.getElementById('input-company'), wrap: document.getElementById('f-company') },
    { input: document.getElementById('input-issue'),   wrap: document.getElementById('f-issue') }
  ];

  // Clear errors while typing
  fields.forEach(function (f) {
    f.input.addEventListener('input', function () {
      f.wrap.classList.remove('has-error');
      f.input.classList.remove('invalid');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;

    fields.forEach(function (f) {
      var empty = f.input.value.trim() === '';
      f.wrap.classList.toggle('has-error', empty);
      f.input.classList.toggle('invalid', empty);
      if (empty) valid = false;
    });

    if (!valid) {
      // Focus the first invalid field
      var first = fields.find(function (f) { return f.input.classList.contains('invalid'); });
      if (first) first.input.focus();
      return;
    }

    // Success: swap form for confirmation
    form.style.display = 'none';
    document.getElementById('form-title').style.display = 'none';
    document.getElementById('success-msg').classList.add('show');
  });


  // --------------------------------------------------------
  // 5.  Scroll-reveal (Intersection Observer)
  // --------------------------------------------------------
  var revealTargets = document.querySelectorAll('.rv');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        // Stagger siblings inside the same parent
        var el = entry.target;
        var siblings = el.parentElement.querySelectorAll('.rv');
        var idx = Array.prototype.indexOf.call(siblings, el);
        el.style.transitionDelay = (idx * 0.07) + 's';

        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: show everything immediately
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

})();
