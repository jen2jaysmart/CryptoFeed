// Fetch trending coins from DEX Screener API
const fetchTrendingCoins = async () => {
  try {
    // Updated API endpoint
    const response = await fetch('https://api.dexscreener.com/latest/dex/search',{headers: {accept: "application/json"} });
    const data = await response.json();
if(data)return;}}