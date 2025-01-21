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

import { fetchData } from "./fetchData";

const getCollectionValue = async (collection) => {
  let collectionValue = 0;

  // loop through the collected sets
  for (let set = 0; set < collection.sets.length; set++) {
    console.log("starting the collection sets loop");
    let fetchedCards = [];
    let url = "https://api.pokemontcg.io/v2/cards?q=set.id:" + collection.sets[set].set_id + "&orderBy=number";
    let result = await fetchData(url);
    // console.log(result);
    if('error' in result) {
      console.log("found an error");
    } else {
      fetchedCards.push(result.data);
    }
    console.log(fetchedCards);
    console.log(collection.sets[set].cards.length);

    // loop through the cards in the collected set
    for (let card = 0; card < collection.sets[set].cards.length; card++) {
      console.log("starting the cards in the set loop");

      console.log(fetchedCards.length);

      // loop through the fetched cards to find the cards that are collected
      for (let i = 0; i < fetchedCards[0].length; i++) {
        console.log("starting the fetchedCards loop");

        if (fetchedCards[0][i].id === collection.sets[set].cards[card].card_id) {
          console.log("found the collected card");
          
          // loop through the card variant quantites
          for (let variant = 0; variant < collection.sets[set].cards[card].quantities.length; variant++) {
            console.log('starting the variant loop')
            
            // get the variant name from the object
            let cardVariant = Object.keys(collection.sets[set].cards[card].quantities[variant])[0];
            console.log(`Card variant: ${cardVariant}`)

            // check if the card has tcgplayer prices
            if (fetchedCards[0][i].tcgplayer?.prices && fetchedCards[0][i].tcgplayer.prices[cardVariant]) {
              console.log("Using TCGPLAYER prices")
              collectionValue += fetchedCards[0][i].tcgplayer.prices[cardVariant].market * collection.sets[set].cards[card].quantities[variant][cardVariant]
              console.log(fetchedCards[0][i].tcgplayer.prices[cardVariant].market)
              console.log(collection.sets[set].cards[card].quantities[variant][cardVariant])

            } else if (fetchedCards[0][i].cardmarket?.prices?.averageSellPrice) { // check if the card has cardmarket instead
              console.log("useing Cardmarket prices")
              collectionValue += fetchedCards[0][i].cardmarket.prices.averageSellPrice * collection.sets[set].cards[card].quantities[variant][cardVariant]
              console.log(fetchedCards[0][i].cardmarket.prices.averageSellPrice * collection.sets[set].cards[card].quantities[variant][cardVariant])

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