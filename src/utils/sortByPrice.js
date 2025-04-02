// Sort by Price
// Takes an array of card objects, and an option ('high' or 'low)
// Sorts the array of cards depending on the option and returns a new array with the results

import { variants } from "./variantList";

// Helper Function to get the market price for a given variant
const getMarketPrice = (item, variant) => {
  return item.tcgplayer?.prices?.[variant]?.market || item.tcgplayer?.prices?.[variant]?.mid || 0;
};

const sortByPrice = (cardArray, option = 'high') => {
  let newArray = [...cardArray];

  if (option === 'high') {
    newArray.sort((x, y) => {
      for (let i = 0; i < variants.length; i++) {
        for (let j = 0; j < variants.length; j++) {
          if (x.tcgplayer?.prices?.[variants[i]] && y.tcgplayer?.prices?.[variants[j]]) {
            return getMarketPrice(y, variants[j]) - getMarketPrice(x, variants[i]);
          }

        }
      }

      // If no common variant is found, return 0 (no change in order)
      return 0;
    });
  } else { 
    newArray.sort((x, y) => {
      for (let i = 0; i < variants.length; i++) {
        for (let j = 0; j < variants.length; j++) {
          if (x.tcgplayer?.prices?.[variants[i]] && y.tcgplayer?.prices?.[variants[j]]) {
            return getMarketPrice(x, variants[i]) - getMarketPrice(y, variants[j]);
          }
        }
      }

      // If no common variant is found, return 0 (no change in order)
      return 0;
    });
  }
  return newArray;
}

export {sortByPrice}