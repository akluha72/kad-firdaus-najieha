"use strict";

AOS.init();
document.getElementById('main-button').addEventListener('click', function () {
  var cover = document.querySelector('.card-cover-wrapper');
  var content = document.querySelector('.content-wrapper');
  var bottomNav = document.querySelector('.bottom-nav');

  // Fade out cover
  cover.classList.add('fade-out');

  // After fade, hide it and show content
  setTimeout(function () {
    cover.classList.add('hide');
    content.classList.remove('hide');
    bottomNav.classList.remove('hide');
    document.body.classList.remove('no-scroll'); // Enable scrolling
  }, 600); // match CSS transition duration
});
//# sourceMappingURL=main.js.map