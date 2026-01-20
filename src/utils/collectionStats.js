import { getSets } from "./fetchData";

// total cards in collection
const getTotalCards = (collection) => {
  let runningTotal = 0;
  for (let i = 0; i < collection.length; i++) {
    for (let j = 0; j < collection?.[i]?.cards?.length; j++) {
      for (let k = 0; k < collection?.[i]?.cards?.[j]?.quantities?.length; k++) {
        const qty = Object.values(collection?.[i]?.cards?.[j]?.quantities[k]);
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
    for (let j = 0; j < collection?.[i]?.cards?.length; j++) {
      runningTotal++;
    }
  }
  return runningTotal;
}

// completed sets
const getCompletedSets = async (collection, allSets = []) => {
  let runningTotal = 0;
  // let allSets = await getSets();
  
  for (let i = 0; i < collection.length; i++) {
    for (let j = 0; j < allSets.length; j++) {
      if (collection[i].set_id === allSets[j].id) {
        if (collection?.[i]?.cards?.length == allSets[j].total) {
          runningTotal++;
          allSets.splice(j, 1);
        }
      }
    }
  }
  return runningTotal;
}

export {getTotalCards, getTotalUniqueCards, getCompletedSets}