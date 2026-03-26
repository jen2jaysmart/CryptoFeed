// Fetch trending coins using CoinGecko API
const fetchTrendingCoins = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Check if the data exists and display it on the website
    if (data && data.coins) {
      displayCoins(data.coins);
    } else {
      throw new Error('No coins data available');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('coin-container').innerHTML = '<p>Failed to load data. Please try again later.</p>';
  }
};

const displayCoins = (coins) => {
  const container = document.getElementById('coin-container');
  container.innerHTML = ''; // Clear previous entries

  coins.forEach((coinObj) => {
    const coin = coinObj.item; // Extract coin object
    const coinDiv = document.createElement('div');
    coinDiv.classList.add('coin');

    coinDiv.innerHTML = `
      <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
      <p>Rank: ${coin.market_cap_rank}</p>
      <p><a href="https://www.coingecko.com/en/coins/${coin.id}" target="_blank">More Info</a></p>
    `;

    container.appendChild(coinDiv);
  });
};

// Load data on page load
window.addEventListener('DOMContentLoaded', fetchTrendingCoins);