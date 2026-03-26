// Fetch trending coins from DEX Screener API
const fetchTrendingCoins = async () => {
  try {
    const response = await fetch('https://api.dexscreener.com/latest/dex/pairs');
    const data = await response.json();

    if (data.pairs) {
      displayCoins(data.pairs.slice(0, 10)); // Display top 10 trending coins
    } else {
      console.error('No pairs found in data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const displayCoins = (coins) => {
  const container = document.getElementById('coin-container');
  container.innerHTML = ''; // Clear previous entries

  coins.forEach((coin) => {
    const coinDiv = document.createElement('div');
    coinDiv.classList.add('coin');

    coinDiv.innerHTML = `
      <h3>${coin.baseToken.symbol} / ${coin.quoteToken.symbol}</h3>
      <p>Price: ${coin.priceUsd.toFixed(2)} USD</p>
      <p>Volume: $${(coin.volume || 0).toLocaleString()}</p>
    `;

    container.appendChild(coinDiv);
  });
};

// Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const coins = document.querySelectorAll('.coin');

  coins.forEach((coin) => {
    const title = coin.querySelector('h3').innerText.toLowerCase();
    coin.style.display = title.includes(searchTerm) ? 'block' : 'none';
  });
});

// Load data on page load
window.addEventListener('DOMContentLoaded', fetchTrendingCoins);