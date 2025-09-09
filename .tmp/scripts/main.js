"use strict";

AOS.init();
document.body.classList.add('no-scroll');

// Enhanced observer that can watch multiple elements
function createAOSObserver() {
  var elementsToWatch = ['.content-wrapper', '.wedding-details-container', '.program-schedule', '.count-down-container'];
  var observedElements = new Set();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !observedElements.has(entry.target)) {
        // Mark this element as observed
        observedElements.add(entry.target);

        // Refresh AOS when any new section becomes visible
        AOS.refresh();
      }
    });
  }, {
    threshold: 0.1,
    // Trigger when 10% visible
    rootMargin: '100px' // Start observing 100px before coming into view
  });

  // Start observing all target elements
  elementsToWatch.forEach(function (selector) {
    var element = document.querySelector(selector);
    if (element) {
      observer.observe(element);
    }
  });
  return observer;
}

// Global observer variable
var aosObserver;
document.getElementById('main-button').addEventListener('click', function () {
  var containerMain = document.querySelector('.card-cover-wrapper');
  var container = document.querySelector('.content-wrapper');
  var container2 = document.querySelector('.main-content-wrapper');
  var bottomNav = document.querySelector('.bottom-nav');

  // Hide the first section
  if (containerMain) {
    containerMain.style.opacity = '0';
    setTimeout(function () {
      containerMain.classList.add('hide');
      document.body.classList.remove('no-scroll');
    }, 500);
  }

  // Show the second section and bottom-nav
  if (container && bottomNav) {
    document.querySelector('.splash-screen').classList.add('swipe-up');
    setTimeout(function () {
      container.classList.remove('hide');
      container2.classList.remove('hide');
      bottomNav.classList.remove('hide');
    }, 800);
    setTimeout(function () {
      document.querySelector('.splash-screen').classList.add('swipe-up');
    }, 1200);

    // Start the AOS observer
    aosObserver = createAOSObserver();
  }
});
//# sourceMappingURL=main.js.map