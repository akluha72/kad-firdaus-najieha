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

    // Show the second section and bottom-nav
    if (container && bottomNav) {
        setTimeout(function () {
            container.classList.remove('hide');
            container2.classList.remove('hide');
            bottomNav.classList.remove('hide');

            // Start the AOS observer
            aosObserver = createAOSObserver();
        }, 500);
    }
});





// Function to create separator animation observer
function createSeparatorObserver() {
    // Find all separator elements
    const separators = document.querySelectorAll('.seperator');

    if (separators.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const separator = entry.target;
                const line = separator.querySelector('.line');
                const img = separator.querySelector('img');

                // Add animation classes
                if (line && !line.classList.contains('line-fade-right')) {
                    console.log("adding animaiotn for the line")
                    line.classList.add('line-fade-right');
                } else {
                    console.log("element cant be found");
                }

                if (img && !img.classList.contains('img-fade-in')) {
                    console.log("adding animation for the bg image");
                    img.classList.add('img-fade-in');
                }

                console.log('Separator animation triggered');

                // Optional: Stop observing this separator after animation starts
                // observer.unobserve(separator);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of separator is visible
        rootMargin: '0px' // No margin, trigger exactly when visible
    });

    // Start observing all separators
    separators.forEach(separator => {
        observer.observe(separator);
    });

    return observer;
}

// Initialize separator observer when content becomes visible
// You can call this function in your existing code when content-wrapper is shown
function initSeparatorAnimations() {
    // Small delay to ensure elements are rendered
    setTimeout(() => {
        createSeparatorObserver();
    }, 100);
}

// Auto-initialize if content is already visible
document.addEventListener('DOMContentLoaded', function () {
    const contentWrapper = document.querySelector('.main-content-wrapper');
    if (contentWrapper && !contentWrapper.classList.contains('hide')) {
        initSeparatorAnimations();
    }
});