// Sort by Price
// Takes an array of card objects, and an option ('high' or 'low)
// Sorts the array of cards depending on the option and returns a new array with the results

const sortByPrice = (cardArray, option = 'high') => {
  let newArray = [...cardArray];

  if (option === 'high') { // high to low
    newArray.sort((x, y) => {
      // If card has cardmarket prices
      if (x.cardmarket?.prices?.averageSellPrice && y.cardmarket?.prices?.averageSellPrice) {
        return y.cardmarket.prices.averageSellPrice - x.cardmarket.prices.averageSellPrice;
      }

      // If card has tcgplayer prices
      if (x.tcgplayer?.prices && y.tcgplayer?.prices) {

        // check the possible combos for 1st card normal
        if (x.tcgplayer.prices.normal && y.tcgplayer.prices.normal) {
          return y.tcgplayer.prices.normal.market - x.tcgplayer.prices.normal.market;
        } 
        else if (x.tcgplayer.prices.normal && y.tcgplayer.prices.holofoil) {
          return y.tcgplayer.prices.holofoil.market - x.tcgplayer.prices.normal.market;
        } 
        else if (x.tcgplayer.prices.normal && y.tcgplayer.prices.reverseHolofoil) {
          return y.tcgplayer.prices.reverseHolofoil.market - x.tcgplayer.prices.normal.market;
        } 

        // check the possible combos for 1st card holo
        if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.normal) {
          return y.tcgplayer.prices.normal.market - x.tcgplayer.prices.holofoil.market;
        } 
        else if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.holofoil) {
          return y.tcgplayer.prices.holofoil.market - x.tcgplayer.prices.holofoil.market;
        } 
        else if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.reverseHolofoil) {
          return y.tcgplayer.prices.reverseHolofoil.market - x.tcgplayer.prices.holofoil.market;
        }

        // check the possible combos for 1st card reverseHolo
        if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.normal) {
          return y.tcgplayer.prices.normal.market - x.tcgplayer.prices.reverseHolofoil.market;
        } 
        else if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.holofoil) {
          return y.tcgplayer.prices.holofoil.market - x.tcgplayer.prices.reverseHolofoil.market;
        } 
        else if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.reverseHolofoil) {
          return y.tcgplayer.prices.reverseHolofoil.market - x.tcgplayer.prices.reverseHolofoil.market;
        }
      }

    // no prices for card, just return 0 to keep array in same order
    return 0;        
  });

  } else { // low to high
    newArray.sort((x, y) => {
      if (x.cardmarket?.prices?.averageSellPrice && y.cardmarket?.prices?.averageSellPrice) {
        // If card has cardmarket prices
        return x.cardmarket.prices.averageSellPrice - y.cardmarket.prices.averageSellPrice;
      }

      // If card has tcgplayer prices
      if (x.tcgplayer?.prices && y.tcgplayer?.prices) {

        // check the possible combos for 1st card normal
        if (x.tcgplayer.prices.normal && y.tcgplayer.prices.normal) {
          return x.tcgplayer.prices.normal.market - y.tcgplayer.prices.normal.market;
        } 
        else if (x.tcgplayer.prices.normal && y.tcgplayer.prices.holofoil) {
          return x.tcgplayer.prices.normal.market - y.tcgplayer.prices.holofoil.market;
        } 
        else if (x.tcgplayer.prices.normal && y.tcgplayer.prices.reverseHolofoil) {
          return x.tcgplayer.prices.normal.market - y.tcgplayer.prices.reverseHolofoil.market;
        }

        // check the possible combos for 1st card holo
        if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.normal) {
          return x.tcgplayer.prices.holofoil.market - y.tcgplayer.prices.normal.market;
        } 
        else if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.holofoil) {
          return x.tcgplayer.prices.holofoil.market - y.tcgplayer.prices.holofoil.market;
        } 
        else if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.reverseHolofoil) {
          return x.tcgplayer.prices.holofoil.market - y.tcgplayer.prices.reverseHolofoil.market;
        }

        // check the possible combos for 1st card reverseHolo
        if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.normal) {
          return x.tcgplayer.prices.reverseHolofoil.market - y.tcgplayer.prices.normal.market;
        } 
        else if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.holofoil) {
          return x.tcgplayer.prices.reverseHolofoil.market - y.tcgplayer.prices.holofoil.market;
        } 
        else if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.reverseHolofoil) {
          return x.tcgplayer.prices.reverseHolofoil.market - y.tcgplayer.prices.reverseHolofoil.market;
        }
      }

      // no prices for card, just return 0 to keep array in same order
      return 0;    
    });
  }
  return newArray;
}

export {sortByPrice}