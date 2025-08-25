document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const pageWrapper = document.getElementById('page-wrapper');

    if (menuToggle && sidebar && pageWrapper) {
        menuToggle.addEventListener('click', (e) => {
            // Stop the click from immediately propagating to the document listener
            e.stopPropagation();
            sidebar.classList.toggle('is-open');
            pageWrapper.classList.toggle('menu-open');
        });
    }

    // Close the sidebar if the user clicks outside of it
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('is-open')) {
            // Check if the click was outside the sidebar and not on the toggle button itself
            if (!sidebar.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                 sidebar.classList.remove('is-open');
                 pageWrapper.classList.remove('menu-open');
            }
        }
    });

    // Dynamically set the active class on the correct navigation link
    const navLinks = document.querySelectorAll('.sidebar nav a');
    // Get the current page name (e.g., "index.html", "contact.html")
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
