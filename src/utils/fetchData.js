// import pokemon from 'pokemontcgsdk';

// pokemon.configure({apiKey: process.env.REACT_APP_API_KEY});

const url = "https://api.scrydex.com/pokemon/v1/en/"

const options = {
  headers: {
    'X-Api-Key': process.env.REACT_APP_API_KEY,
    'X-Team_ID': process.env.REACT_APP_TEAM_ID
  }
}

const fetchData = async (url) => {
  try {
    console.log("fetching data")
    const response = await fetch(url, options);
    const data = await response.json().catch((error) => ({error: error}));
    console.log("Fetched Data:")
    console.log(data);
    return data;

  } catch (error) {
    console.log(error);
    return {error: error}
  }
}

const getCardsBySet = async (expansionId) => {
  // return await pokemon.card.all({ q: 'set.id:' + setId, orderBy: 'number'})

  let cards = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  console.log("Starting GetCardsBySet");

  while (hasMore) {
    console.log(`Fetching page ${page}`);
    let results = await fetchData(`${url}expansions/${expansionId}/cards?orderBy=number&page=${page}&include=prices`);

    if (results.error) {
      console.log("Error fetching cards:", results.error);
      break;
    }

    if (results.data && results.data.length > 0) {
      cards.push(...results.data);
      // If we got fewer cards than page size, we're at the end
      if (results.data.length < pageSize) {
        hasMore = false;
        console.log("Reached end of set");
      } else {
        page++;
      }
    } else {
      // No data returned, done
      hasMore = false;
      console.log("No more cards found");
    }
  }

  console.log(`Returning ${cards.length} cards`);
  return cards;
}

// getCards takes a search or query, and returns a list of cards
const getCardsBySearch = async (search, page = 1, pageSize = 25) => {
  let searchUrl = url + 'cards?q=name:*' + search.replace(/ /g, '.') + '*&page=' + page + '&pageSize=' + pageSize + '&orderBy=set.releaseDate&include=prices';
  return await fetchData(searchUrl);
}

const getCardById = async (id) => {
    console.log("getting card by Id");

    let data = await fetchData(`${url}cards/${id}`)

    if (data.error) {
      return data;
    }
    console.log("no error I guess");
    console.log(data)
    // console.log(data.data);
    return data.data
}

const getSets = async () => {
  // let setUrl = url + 'expansions?orderBy=releaseDate';
  // return await fetchData(setUrl);

  let sets = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  console.log("Starting GetSets");

  while (hasMore) {
    console.log(`Fetching page ${page}`);
    let results = await fetchData(`${url}expansions?orderBy=release_date&page=${page}`);

    if (results.error) {
      console.log("Error fetching sets:", results.error);
      break;
    }

    if (results.data && results.data.length > 0) {
      sets.push(...results.data);
      // If we got fewer sets than page size, we're at the end
      if (results.data.length < pageSize) {
        hasMore = false;
        console.log("Reached end of sets");
      } else {
        page++;
      }
    } else {
      // No data returned, done
      hasMore = false;
      console.log("No more sets found");
    }
  }

  console.log(`Returning ${sets.length} sets`);
  return sets;
}

export {getCardsBySearch, 
  getCardsBySet, 
  getSets, 
  getCardById
}