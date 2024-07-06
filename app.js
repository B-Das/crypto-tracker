const API_BASE_URL = 'https://api.coingecko.com/api/v3';
let currentPage = 1;
let coinsPerPage = 20;

// DOM elements
const coinList = document.getElementById('coin-list');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const currentPageSpan = document.getElementById('current-page');

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Fetch coins from API
async function fetchCoins(page, sortBy = 'market_cap_desc') {
    const response = await fetch(`${API_BASE_URL}/coins/markets?vs_currency=usd&order=${sortBy}&per_page=${coinsPerPage}&page=${page}&sparkline=false`);
    return response.json();
}

// Render coin list
function renderCoinList(coins) {
    coinList.innerHTML = '';
    coins.forEach(coin => {
        const coinElement = document.createElement('div');
        coinElement.classList.add('coin-item');
        coinElement.innerHTML = `
            <img src="${coin.image}" alt="${coin.name}">
            <h3>${coin.name}</h3>
            <p>Price: $${coin.current_price}</p>
            <p>24h Volume: $${coin.total_volume}</p>
            <button class="favorite-btn" data-id="${coin.id}">Add to Favorites</button>
        `;
        coinList.appendChild(coinElement);
    });
}

// Update page
async function updatePage() {
    const coins = await fetchCoins(currentPage, sortSelect.value);
    renderCoinList(coins);
    currentPageSpan.textContent = currentPage;
}

// Event listeners
searchInput.addEventListener('input', debounce(async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const coins = await fetchCoins(1, sortSelect.value);
    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm) || 
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    renderCoinList(filteredCoins);
}, 300));

sortSelect.addEventListener('change', updatePage);

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    updatePage();
});

// Add to favorites
coinList.addEventListener('click', (e) => {
    if (e.target.classList.contains('favorite-btn')) {
        const coinId = e.target.getAttribute('data-id');
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(coinId)) {
            favorites.push(coinId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            e.target.textContent = 'Added to Favorites';
        }
    }
});

// Initial page load
updatePage();
