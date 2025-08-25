document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Layout Toggle ---
    const layoutToggle = document.getElementById('layout-toggle');
    const pageWrapper = document.getElementById('page-wrapper');

    // Check for saved preference in localStorage
    const navPreference = localStorage.getItem('selyn-nav-layout');

    // Apply the saved preference on page load, but only for desktop screens
    if (window.innerWidth > 992 && navPreference === 'vertical') {
        pageWrapper.classList.add('nav-vertical');
    }

    if (layoutToggle && pageWrapper) {
        layoutToggle.addEventListener('click', () => {
            if (pageWrapper.classList.contains('nav-vertical')) {
                pageWrapper.classList.remove('nav-vertical');
                localStorage.setItem('selyn-nav-layout', 'horizontal');
            } else {
                pageWrapper.classList.add('nav-vertical');
                localStorage.setItem('selyn-nav-layout', 'vertical');
            }
        });
    }

    // --- Active Navigation Link Styling ---
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        // Get the href attribute and compare it to the current page
        const linkPage = link.getAttribute('href');

        // Remove any existing active class first
        link.classList.remove('active');

        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});
