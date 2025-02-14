const url = "https://api.pokemontcg.io/v2/";

const options = {
  headers: {
    'X-Api-Key': process.env.REACT_APP_API_KEY,
  }
}

const fetchData = async (url) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const getCardsBySet = async () => {
  
}

// getCards takes a search or query, and returns a list of cards
const getCardsBySearch = async (search, page = 1, pageSize = 25) => {
  let searchUrl = url + 'cards?q=name:*' + search + '*&page=' + page + '&pageSize=' + pageSize + '&orderBy=set.releaseDate';
  let cards = await fetchData(searchUrl);
  if ('error' in cards) {
    return [];
  }
  return cards.data;
}

const getSets = async () => {

}

export {getCards, getSets}