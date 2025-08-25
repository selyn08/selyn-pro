document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            if (question) {
                question.addEventListener('click', () => {
                    const currentlyActive = document.querySelector('.faq-item.active');

                    // If there's an active item and it's not the one we clicked, close it
                    if (currentlyActive && currentlyActive !== item) {
                        currentlyActive.classList.remove('active');
                    }

                    // Toggle the active state of the clicked item
                    item.classList.toggle('active');
                });
            }
        });
    }

    // Optional: Handle form submission to prevent default and show a message
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission for this demo
            alert('Merci pour votre message ! Nous vous répondrons bientôt.');
            contactForm.reset(); // Clear the form
        });
    }
});
