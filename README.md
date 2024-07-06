# Crypto Tracker

Crypto Tracker is a web application that allows users to track and view detailed information about various cryptocurrencies. Users can search for specific coins, paginate through the list of coins, sort the list by price and volume, add their favorite coins to a list for easy access, and view detailed information and historical price charts for each coin.

## Features

- Display a list of cryptocurrencies with basic information
- Search functionality for finding specific cryptocurrencies
- Pagination for navigating through the list of coins
- Sorting options for price and volume
- Favorite coin list for quick access
- Detailed view for each cryptocurrency, including:
  - Current price and market data
  - Historical price charts with selectable time ranges (24h, 30d, 3m)
- Responsive design for desktop and mobile devices

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Chart.js (for rendering price charts)


- **APIs:**
  - CoinGecko API (for fetching cryptocurrency data)

- **Other Tools and Libraries:**
  - Axios (for making HTTP requests from the server)
  - CORS (for handling Cross-Origin Resource Sharing)
  

## Project Structure

The project is structured as follows:

```
crypto-tracker/

│   ├── index.html
│   ├── favorites.html
│   ├── coins.html
│   ├── styles.css
│   ├── app.js
│   ├── favorites.js
│   └── coins.js
└── README.md
```

- The `crypto-tracker/` directory contains all the frontend files.
## Hosted Link
https://b-das.github.io/crypto-tracker/

## Setup and Running the Project

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker
   ```

2. Open your web browser and navigate to `http://localhost:3001` to view the application.

## Usage

- **Home Page:** Displays a list of cryptocurrencies. You can search for specific coins, sort the list, and add coins to your favorites.
- **Favorites Page:** Shows your list of favorite cryptocurrencies for quick access.
- **Coin Detail Page:** Provides detailed information about a specific cryptocurrency, including a price chart with selectable time ranges.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Acknowledgments

- Data provided by [CoinGecko API](https://www.coingecko.com/en/api/documentation)
- Chart functionality powered by [Chart.js](https://www.chartjs.org/)