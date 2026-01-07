// find if the set is in the collection by setId,
// returns the set object, or null if not found
const findSet = (setId, sets) => {
  for (let i = 0; i < sets.length; i++) {
    if (setId === sets[i].set_id) return sets[i];
  }
  return null;
}

// look for a specific card in the set card array
// if found, return the card object, else return null
const findInSet = (cardId, cardArray) => {
  for (let i = 0; i < cardArray.length; i++) {
    if (cardId === cardArray[i].card_id) return cardArray[i];
  }
  return null;
}

// takes an array of cards, and the collection object, and returns the cards updated
// with collected and qty properties
const setCollected = (cards, collection) => {
  let currentSet = null;
  
  let updatedCards = cards.map(card => {
    // check the current set, and if the set is in the collection
    if (currentSet == null || card.expansion.id !== currentSet.set_id) {
      currentSet = findSet(card.expansion.id, collection.sets);
      if (!currentSet) {
        // If the card isn't in the set but has the collected property,
        // remove the collected property before returning the card
        if (card.collected) {
          delete card.collected;
          delete card.collectedQuantities;
        }
        return card }
    }

    const found = findInSet(card.id, currentSet.cards);
    if (found) {

      // TODO, update to check for incomming or wanted status 
      // in addition to the collected property
      card.collected = true;
      card.collectedQuantities = found.quantities;

    } else { // not found
      if (card.collected) {
        delete card.collected;
        delete card.collectedQuantities;
      }
    }
    return card;
  })

  return updatedCards;
}

export {setCollected}