/* Dr. Sherin Mansour — language toggle, FAQ accordion, mobile nav, scroll reveal */
(function () {
  var html = document.documentElement;

  function setLang(lang) {
    lang = (lang === 'en') ? 'en' : 'ar';
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    var t = html.getAttribute('data-title-' + lang);
    if (t) document.title = t;
    try { localStorage.setItem('lang', lang); } catch (e) {}
    closeMenus();
    // animate the container that just became visible
    revealIn(document.querySelector(lang === 'ar' ? '.ar-only' : '.en-only'));
  }

  function closeMenus() {
    document.querySelectorAll('.navlinks.open').forEach(function (n) { n.classList.remove('open'); });
  }

  // ---- gentle scroll reveal ----
  var io = null;
  var SEL = '.eyebrow,.h2,.tcard,.ccard,.ecard,.rcard,.stat,.bigstat,.qitem,.cell,' +
            '.about-photos,.portrait,.map-embed,.mlist,.clist,.trustline';

  function revealIn(root) {
    if (!root) return;
    var reduce = !window.matchMedia || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (reduce || !('IntersectionObserver' in window)) return; // no motion: content stays fully visible
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    }
    root.querySelectorAll(SEL).forEach(function (el) {
      if (el.dataset.rev) return;
      el.dataset.rev = '1';
      el.classList.add('reveal');
      var sibs = el.parentElement ? el.parentElement.children : [];
      var idx = Array.prototype.indexOf.call(sibs, el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 0.06, 0.36) + 's';
      // anything already in or above the viewport shows immediately; the rest animate on scroll
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('in');
      else io.observe(el);
    });
  }

  // restore saved language (default Arabic)
  var saved = 'ar';
  try { saved = localStorage.getItem('lang') || 'ar'; } catch (e) {}
  setLang(saved);

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-toggle-lang]');
    if (t) { setLang(html.getAttribute('lang') === 'ar' ? 'en' : 'ar'); return; }

    var burger = e.target.closest('[data-nav-toggle]');
    if (burger) {
      var menu = burger.closest('header').querySelector('.navlinks');
      if (menu) menu.classList.toggle('open');
      return;
    }

    var q = e.target.closest('.qitem .q');
    if (q) { q.parentElement.classList.toggle('open'); return; }

    // close mobile menu when a nav link is tapped
    if (e.target.closest('.navlinks a')) closeMenus();
  });
})();
