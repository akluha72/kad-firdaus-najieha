AOS.init();

document.body.classList.add('no-scroll');

document.getElementById('main-button').addEventListener('click', function () {
  const containerMain = document.querySelector('.container-main.card-cover-wrapper');
  const container = document.querySelector('.container');
  const bottomNav = document.querySelector('.bottom-nav');

  // Hide the first section
  if (containerMain) {
    containerMain.style.opacity = '0'; // fade out
    setTimeout(() => {
      containerMain.classList.add('hide'); // then hide after transition
      document.body.classList.remove('no-scroll'); // Enable scrolling on the body
    }, 500); // duration of the fade effect
  }

  // Show the second section and bottom-nav
  if (container && bottomNav) {
    setTimeout(() => {
      container.classList.remove('hide');
      bottomNav.classList.remove('hide');
    }, 500); // after container-main fades out
  }
});


let lastScrollTop = 0;
const centerTop = document.querySelector('.center-top');

window.addEventListener('scroll', function () {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scroll down
    centerTop.classList.add('hidden');
  } else {
    // Scroll up
    centerTop.classList.remove('hidden');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});