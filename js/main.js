document.addEventListener('DOMContentLoaded', () => {
    // --- Active Navigation Link Styling ---
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        // Remove any existing active class first
        link.classList.remove('active');

        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});
