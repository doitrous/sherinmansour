/* Dr. Sherin Mansour — language toggle, FAQ accordion, mobile nav */
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
  }

  function closeMenus() {
    document.querySelectorAll('.navlinks.open').forEach(function (n) { n.classList.remove('open'); });
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
