(function () {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-label', nav.classList.contains('is-open') ? 'إغلاق القائمة' : 'فتح القائمة');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
      });
    });
  }
})();

(function () {
  var themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }

  function setTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    themeToggle.setAttribute('aria-checked', dark ? 'true' : 'false');
    themeToggle.setAttribute('aria-label', dark ? 'تفعيل الوضع الفاتح' : 'تبديل الوضع الليلي');
  }

  themeToggle.addEventListener('click', function () {
    setTheme(!isDark());
  });

  themeToggle.setAttribute('aria-checked', isDark() ? 'true' : 'false');
  if (isDark()) themeToggle.setAttribute('aria-label', 'تفعيل الوضع الفاتح');
})();

(function () {
  var section = document.getElementById('market-insights');
  var counters = document.querySelectorAll('#market-insights [data-target]');
  if (!section || !counters.length) return;

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animateValue(el, start, end, duration) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = easeOutQuad(progress);
      var current = Math.round(start + (end - start) * eased);
      el.textContent = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  var animated = false;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              animateValue(el, 0, target, 1800);
            }
          });
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(section);
})();

(function () {
  function initAccordion(accordion) {
    if (!accordion) return;
    var triggers = accordion.querySelectorAll('[data-accordion-trigger]');
    var items = accordion.querySelectorAll('.curriculum-accordion-item');

    function closeAll() {
      items.forEach(function (item) {
        item.classList.remove('is-open');
        var btn = item.querySelector('[data-accordion-trigger]');
        var panel = item.querySelector('.curriculum-accordion-content');
        var inner = item.querySelector('.accordion-content-inner');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (panel && inner) panel.style.maxHeight = '0';
      });
    }

    function openItem(item) {
      var panel = item.querySelector('.curriculum-accordion-content');
      var inner = item.querySelector('.accordion-content-inner');
      var btn = item.querySelector('[data-accordion-trigger]');
      if (!panel || !inner) return;
      var height = inner.scrollHeight;
      panel.style.maxHeight = height + 'px';
      item.classList.add('is-open');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.curriculum-accordion-item');
        if (!item) return;
        var isOpen = item.classList.contains('is-open');
        closeAll();
        if (!isOpen) {
          openItem(item);
        }
      });
    });
  }

  initAccordion(document.getElementById('curriculum-accordion'));
  initAccordion(document.getElementById('faq-accordion'));
})();
