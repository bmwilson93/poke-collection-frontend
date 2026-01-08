// Sort by Price
// Takes an array of card objects, and an option ('high' or 'low)
// Sorts the array of cards depending on the option and returns a new array with the results

import { variants } from "./variantList";

// Helper Function to get the market price from card variants
const getMarketPrice = (item) => {
  // Check if card has variants array
  if (!item?.variants || item.variants.length === 0) {
    return 0;
  }
  
  // Check variants in priority order (from variants list)
  for (const variantName of variants) {
    // Find the variant with this name
    const variant = item.variants.find(v => v.name === variantName);
    if (variant?.prices && variant.prices.length > 0) {
      // Find NM price first, or use first available price
      const nmPrice = variant.prices.find(p => p.condition === "NM");
      const priceData = nmPrice || variant.prices[0];
      
      if (priceData?.market) {
        return priceData.market;
      } else if (priceData?.low) {
        return priceData.low;
      }
    }
  }
  
  // If no price found in priority order, check any variant
  for (const variant of item.variants) {
    if (variant?.prices && variant.prices.length > 0) {
      const nmPrice = variant.prices.find(p => p.condition === "NM");
      const priceData = nmPrice || variant.prices[0];
      
      if (priceData?.market) {
        return priceData.market;
      } else if (priceData?.low) {
        return priceData.low;
      }
    }
  }
  
  return 0;
};

const getBestPrice = (item) => {
  const price = getMarketPrice(item);
  
  if (price > 0) {
    return { price, source: 'variants' };
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

export { sortByPrice };