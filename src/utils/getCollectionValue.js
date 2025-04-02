// Get Collection Value
// uses the user collection to determine a rough estimate of the collection value

import { getCardsBySet } from "./fetchData";

const getCollectionValue = async (collection) => {
  // Use an object to avoid race conditions
  const result = { value: 0 };

  await Promise.all(collection.sets.map(async (set) => {
    try {
      const fetchedCards = await getCardsBySet(set.set_id);
      const cardLookup = fetchedCards.reduce((acc, card) => {
        acc[card.id] = card;
        return acc;
      }, {});

      set.cards.forEach(collectedCard => {
        const matchedCard = cardLookup[collectedCard.card_id];
        if (!matchedCard) {
          console.warn(`Card ${collectedCard.card_id} not found in set ${set.set_id}`);
          return;
        }

        collectedCard.quantities.forEach(variantObj => {
          const [variant, quantity] = Object.entries(variantObj)[0];
          const price = matchedCard.tcgplayer?.prices?.[variant]?.market || 
                       matchedCard.cardmarket?.prices?.averageSellPrice;

          if (price) {
            const contribution = price * quantity;
            result.value += contribution;
            console.log(`Added $${contribution} for ${variant} variant of card ${collectedCard.card_id}`);
          } else {
            console.warn(`No price found for ${variant} variant of card ${collectedCard.card_id}`);
          }
        });
      });
    } catch (error) {
      console.error(`Error processing set ${set.set_id}:`, error);
    }
  }));

  console.log(`Total collection value: $${result.value}`);
  return result.value;
};

export { getCollectionValue };