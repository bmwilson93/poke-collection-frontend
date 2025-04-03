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


const sortByPrice = (cardArray, option = 'high') => {
  let newArray = [...cardArray];

  if (option === 'high') {
    newArray.sort((x, y) => {

      if (x.tcgplayer?.prices) {
        if (y.tcgplayer?.prices) {

          for (let i = 0; i < variants.length; i++) {
            if (x.tcgplayer.prices[variants[i]]) {
              for (let j = 0; j < variants.length; j++) {
                if (y.tcgplayer.prices[variants[j]]) {
                  return getMarketPrice(y, variants[j]) - getMarketPrice(x, variants[i]);
                }
              }
            }
          }
          return 0;

        } else if (y.cardmarket?.prices) {
          
          for (let i = 0; i < variants.length; i++) {
            if (x.tcgplayer.prices[variants[i]]) {
              return y.cardmarket.prices.averageSellPrice - getMarketPrice(x, variants[i]);
            }
          }

        } else { // y doesn't have price
          return -1;
        }


      } else if (x.cardmarket?.prices) {

        if (y.tcgplayer?.prices) {
          for (let j = 0; j < variants.length; j++) {
            if (y.tcgplayer.prices[variants[j]]) {
              return  getMarketPrice(y, variants[j]) - x.cardmarket.prices.averageSellPrice;
            }
          }
        } else if (y.cardmarket?.prices) {
          return y.cardmarket.prices.avgSellPrice - x.cardmarket.prices.averageSellPrice;
        }


      } else { // x doesn't have price data
        return 1;
      }
    });
  } else { 
    newArray.sort((x, y) => {
      
      if (x.tcgplayer?.prices) {
        if (y.tcgplayer?.prices) {

          for (let i = 0; i < variants.length; i++) {
            if (x.tcgplayer.prices[variants[i]]) {
              for (let j = 0; j < variants.length; j++) {
                if (y.tcgplayer.prices[variants[j]]) {
                  return getMarketPrice(x, variants[i]) - getMarketPrice(y, variants[j]);
                }
              }
            }
          }
          return 0;

        } else if (y.cardmarket?.prices) {
          
          for (let i = 0; i < variants.length; i++) {
            if (x.tcgplayer.prices[variants[i]]) {
              return getMarketPrice(x, variants[i]) - y.cardmarket.prices.averageSellPrice;
            }
          }

        } else { // y doesn't have price
          return 1;
        }


      } else if (x.cardmarket?.prices) {

        if (y.tcgplayer?.prices) {
          for (let j = 0; j < variants.length; j++) {
            if (y.tcgplayer.prices[variants[j]]) {
              return x.cardmarket.prices.averageSellPrice - getMarketPrice(y, variants[j]);
            }
          }
        } else if (y.cardmarket?.prices) {
          return x.cardmarket.prices.averageSellPrice - y.cardmarket.prices.avgSellPrice;
        }


      } else { // x doesn't have price data
        return -1;
      }


    });
  }
  return newArray;
}

export {sortByPrice}