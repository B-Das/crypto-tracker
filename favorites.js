const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const favoritesList = document.getElementById('favorites-list');

// Fetch coin data from API
async function fetchCoinData(coinId) {
    const response = await fetch(`${API_BASE_URL}/coins/${coinId}`);
    return response.json();
}

// Render favorite coins
async function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = ''; // Clear the list before rendering

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorite coins added yet.</p>';
        return;
    }

    for (const coinId of favorites) {
        try {
            const coinData = await fetchCoinData(coinId);
            const coinElement = document.createElement('div');
            coinElement.classList.add('coin-item');
            coinElement.innerHTML = `
                <img src="${coinData.image.small}" alt="${coinData.name}">
                <h3>${coinData.name}</h3>
                <p>Price: $${coinData.market_data.current_price.usd}</p>
                <p>24h Change: ${coinData.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                <button class="remove-favorite" data-id="${coinId}">Remove from Favorites</button>
                <a href="coins.html?id=${coinId}" class="view-details">View Details</a>
            `;
            favoritesList.appendChild(coinElement);
        } catch (error) {
            console.error(`Error fetching data for coin ${coinId}:`, error);
        }
    }
}

// Remove from favorites
favoritesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-favorite')) {
        const coinId = e.target.getAttribute('data-id');
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(id => id !== coinId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    }
});

// Initial render
renderFavorites();
