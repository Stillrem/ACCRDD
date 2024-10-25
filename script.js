    function updateDots() {
    const accepted = parseInt(document.getElementById('accepted').value, 10);
    const declined = parseInt(document.getElementById('declined').value, 10);
    const totalOffers = accepted + declined;

    if (totalOffers > 100) {
        document.getElementById('result').textContent = "Total offers cannot exceed 100.";
        return;
    }

    const dotsContainer = document.getElementById('dots-container');
    dotsContainer.innerHTML = '';

    for (let i = 0; i < accepted; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot accepted';
        dotsContainer.appendChild(dot);
    }

    for (let i = 0; i < declined; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot declined';
        dotsContainer.appendChild(dot);
    }

    const acceptanceRate = (accepted / totalOffers) * 100;
    document.getElementById('result').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
}

// Initialize the dots on page load
document.addEventListener('DOMContentLoaded', updateDots);
