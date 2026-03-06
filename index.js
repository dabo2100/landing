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
