// Fetch trending pairs using DEX Screener API
const fetchTrendingPairs = async () => {
  try {
    const response = await fetch('https://api.dexscreener.com/latest/dex/search');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Check if the data exists and display it on the website
    if (data && data.pairs) {
      displayPairs(data.pairs);
    } else {
      throw new Error('No pairs data available');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('coin-container').innerHTML = '<p>Failed to load data. Please try again later.</p>';
  }
};

const displayPairs = (pairs) => {
  const container = document.getElementById('coin-container');
  container.innerHTML = ''; // Clear previous entries

  pairs.forEach((pair) => {
    const pairDiv = document.createElement('div');
    pairDiv.classList.add('pair');

    pairDiv.innerHTML = `
      <h3>${pair.baseToken.name} (${pair.baseToken.symbol.toUpperCase()})</h3>
      <p>Exchange: ${pair.dexName}</p>
      <p>Price: $${pair.priceUsd}</p>
      <p><a href="${pair.url}" target="_blank">View Pair Details</a></p>
    `;

    container.appendChild(pairDiv);
  });
};

// Load data on page load
window.addEventListener('DOMContentLoaded', fetchTrendingPairs);