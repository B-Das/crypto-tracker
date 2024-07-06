const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const coinInfo = document.getElementById('coin-info');
const priceChart = document.getElementById('price-chart');
const timeRangeButtons = document.getElementById('time-range-buttons');

let chart;

// Get coin ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const coinId = urlParams.get('id');

// Fetch coin data from API
async function fetchCoinData(coinId) {
    const response = await fetch(`${API_BASE_URL}/coins/${coinId}`);
    return response.json();
}

// Fetch historical price data
async function fetchHistoricalData(coinId, days) {
    const response = await fetch(`${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
    return response.json();
}

// Render coin information
function renderCoinInfo(coinData) {
    coinInfo.innerHTML = `
        <img src="${coinData.image.large}" alt="${coinData.name}">
        <h2>${coinData.name} (${coinData.symbol.toUpperCase()})</h2>
        <p>Rank: ${coinData.market_cap_rank}</p>
        <p>Price: $${coinData.market_data.current_price.usd}</p>
        <p>Market Cap: $${coinData.market_data.market_cap.usd}</p>
        <p>24h Change: ${coinData.market_data.price_change_percentage_24h.toFixed(2)}%</p>
        <p>Description: ${coinData.description.en}</p>
    `;
}

// Create price chart
function createPriceChart(priceData) {
    const ctx = priceChart.getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: priceData.map(data => new Date(data[0]).toLocaleDateString()),
            datasets: [{
                label: 'Price (USD)',
                data: priceData.map(data => data[1]),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            }
        }
    });
}

// Update chart data
async function updateChartData(days) {
    const historicalData = await fetchHistoricalData(coinId, days);
    createPriceChart(historicalData.prices);
}

// Event listener for time range buttons
timeRangeButtons.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const days = e.target.getAttribute('data-range');
        updateChartData(days);
    }
});

// Initialize page
async function initPage() {
    try {
        const coinData = await fetchCoinData(coinId);
        renderCoinInfo(coinData);
        await updateChartData(1); // Default to 24h chart
    } catch (error) {
        console.error('Error fetching coin data:', error);
        coinInfo.innerHTML = '<p>Error loading coin data. Please try again later.</p>';
    }
}

initPage();
