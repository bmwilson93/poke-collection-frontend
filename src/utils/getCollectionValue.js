// Get Collection Value
// uses the user collection to determine a rough estimate of the collection value


// Iterate over the sets in the collection
// for each set in the collection, call the API to get the cards in that set
//
// for each card in the set in the collection 
// iterate to find that card in the set, and check the prices
//
// first check tcgplayer prices, then check cardmarket if no tcgplayer
// 
// add the value to the running total
//
// return the total

import { getCardsBySet } from "./fetchData";

const getCollectionValue = async (collection) => {
  let collectionValue = 0;

  // loop through the collected sets
  for (let set = 0; set < collection.sets.length; set++) {
    console.log("starting the collection sets loop");
    let fetchedCards = [];

    let page = 1;
    let endOfSet = false;

    do {
      let response = await getCardsBySet(collection.sets[set].set_id, page);

      if ('error' in response) {
        console.log("Error with getting cards");
        endOfSet = true;
        // break;
      } else {
        fetchedCards.push(...response.data);
        console.log(fetchedCards);
        if (response.totalCount <= response.pageSize * page) {
          endOfSet = true;
        } else {
          page ++;
        }
      }
    } while (!endOfSet);

    // loop through the cards in the collected set
    for (let card = 0; card < collection.sets[set].cards.length; card++) {
      console.log("starting the cards in the set loop");

      console.log(fetchedCards.length);

      // loop through the fetched cards to find the cards that are collected
      for (let i = 0; i < fetchedCards.length; i++) {
        console.log("starting the fetchedCards loop");

        if (fetchedCards[i].id === collection.sets[set].cards[card].card_id) {
          console.log("found the collected card");
          
          // loop through the card variant quantites
          for (let variant = 0; variant < collection.sets[set].cards[card].quantities.length; variant++) {
            console.log('starting the variant loop')
            
            // get the variant name from the object
            let cardVariant = Object.keys(collection.sets[set].cards[card].quantities[variant])[0];
            console.log(`Card variant: ${cardVariant}`)

            // check if the card has tcgplayer prices
            if (fetchedCards[i].tcgplayer?.prices && fetchedCards[i].tcgplayer.prices[cardVariant]) {
              console.log("Using TCGPLAYER prices")
              collectionValue += fetchedCards[i].tcgplayer.prices[cardVariant].market * collection.sets[set].cards[card].quantities[variant][cardVariant]
              console.log(fetchedCards[i].tcgplayer.prices[cardVariant].market)
              console.log(collection.sets[set].cards[card].quantities[variant][cardVariant])

            } else if (fetchedCards[i].cardmarket?.prices?.averageSellPrice) { // check if the card has cardmarket instead
              console.log("useing Cardmarket prices")
              collectionValue += fetchedCards[i].cardmarket.prices.averageSellPrice * collection.sets[set].cards[card].quantities[variant][cardVariant]
              console.log(fetchedCards[i].cardmarket.prices.averageSellPrice * collection.sets[set].cards[card].quantities[variant][cardVariant])

            }
          }
        }
      }
    }
  }

  console.log(collectionValue)
  return collectionValue;
}

export {getCollectionValue}