document.addEventListener('DOMContentLoaded', () => {
    const offerNameEl = document.getElementById('offer-name');
    const offerPriceEl = document.getElementById('offer-price');

    // A map of offer keys to their display names and prices
    const offerData = {
        freemium: { name: 'Offre Freemium', price: '0€' },
        pro: { name: 'Offre Pro', price: '99€ / mois' },
        business: { name: 'Offre Business', price: '249€ / mois' },
        nomade: { name: 'Poste Nomade', price: '25€ / jour' },
        mensuel: { name: 'Abonnement Mensuel', price: '250€ / mois' }
    };

    // Get the 'offer' query parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const offerKey = params.get('offer');

    // Find the corresponding offer, or use a default if not found
    const selectedOffer = offerData[offerKey] || { name: 'Aucune offre sélectionnée', price: '-' };

    // Update the DOM with the offer details
    if (offerNameEl && offerPriceEl) {
        offerNameEl.textContent = selectedOffer.name;
        offerPriceEl.textContent = selectedOffer.price;
    }

    // Basic form validation feedback
    const form = document.getElementById('payment-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            // In a real application, you would have payment gateway integration (Stripe, etc.)
            // For this project, we just go to the confirmation page.
            // We can add a simple alert for demonstration.
            alert('Paiement en cours de traitement...');
        });
    }
});
