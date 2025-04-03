// Sort by Price
// Takes an array of card objects, and an option ('high' or 'low)
// Sorts the array of cards depending on the option and returns a new array with the results

import { variants } from "./variantList";

// Helper Function to get the market price for a given variant
const getMarketPrice = (item, variant) => {
  return item.tcgplayer?.prices?.[variant]?.market 
      || item.tcgplayer?.prices?.[variant]?.mid 
      || 0;
};

const getBestPrice = (item) => {
  // Check TCG prices first (in variant priority order)
  for (const variant of variants) {
    const price = getMarketPrice(item, variant);
    if (price > 0) return { price, source: 'tcg' };
  }
  
  // Fallback to cardmarket
  if (item.cardmarket?.prices?.averageSellPrice) {
    return { price: item.cardmarket.prices.averageSellPrice, source: 'cardmarket' };
  }
  
  return { price: 0, source: 'none' };
};

const sortByPrice = (cardArray, option = 'high') => {
  return [...cardArray].sort((a, b) => {
    const { price: priceA, source: sourceA } = getBestPrice(a);
    const { price: priceB, source: sourceB } = getBestPrice(b);

    // Items with prices come before items without
    if (sourceA === 'none' && sourceB !== 'none') return 1;
    if (sourceB === 'none' && sourceA !== 'none') return -1;
    
    // Sort by price (adjust direction based on option)
    return option === 'high' ? priceB - priceA : priceA - priceB;
  });
};

export {sortByPrice}