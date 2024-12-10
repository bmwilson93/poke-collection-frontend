// total cards in collection
const getTotalCards = (collection) => {
  let runningTotal = 0;
  for (let i = 0; i < collection.length; i++) {
    for (let j = 0; j < collection[i].cards.length; j++) {
      for (let k = 0; k < collection[i].cards[j].quantities.length; k++) {
        const qty = Object.values(collection[i].cards[j].quantities[k]);
        runningTotal += qty[0];
      }
    }
  }
  return runningTotal;
}

// total unique cards in collection
const getTotalUniqueCards = (collection) => {
  let runningTotal = 0;
  for (let i = 0; i < collection.length; i++) {
    for (let j = 0; j < collection[i].cards.length; j++) {
      runningTotal++;
    }
  }
  return runningTotal;
}

// completed sets

export {getTotalCards, getTotalUniqueCards}