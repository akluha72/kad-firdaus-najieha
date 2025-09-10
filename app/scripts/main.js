AOS.init();
document.body.classList.add('no-scroll');

// Enhanced observer that can watch multiple elements
function createAOSObserver() {
    const elementsToWatch = [
        '.content-wrapper',
        '.wedding-details-container',
        '.program-schedule',
        '.count-down-container'
    ];

    const observedElements = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !observedElements.has(entry.target)) {
                // Mark this element as observed
                observedElements.add(entry.target);

                // Refresh AOS when any new section becomes visible
                AOS.refresh();

            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '100px' // Start observing 100px before coming into view
    });

    // Start observing all target elements
    elementsToWatch.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            observer.observe(element);
        }
    });

    return observer;
}

// Global observer variable
let aosObserver;

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

    const audio = document.getElementById('bg-audio');
    if (audio.paused) {
        audio.play();
    }

    // Show the second section and bottom-nav
    if (container && bottomNav) {

        setTimeout(function () {
            container.classList.remove('hide');
            bottomNav.classList.remove('hide');
        }, 800)

        setTimeout(function () {
            document.querySelector('.splash-screen').classList.add('swipe-up');
        }, 1800)

        container2.classList.remove('hide');
        aosObserver = createAOSObserver();
    }
});

