import pokemon from 'pokemontcgsdk';

pokemon.configure({apiKey: process.env.REACT_APP_API_KEY});



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

// const getCardsBySet = async (setId, page = 1) => {
//   let searchUrl = url + 'cards?q=set.id:' + setId + '&orderBy=number&page=' + page;
//   return await fetchData(searchUrl);
// }

const getCardsBySet = async (setId) => {
  return await pokemon.card.all({ q: 'set.id:' + setId, orderBy: 'number'})
}

// getCards takes a search or query, and returns a list of cards
const getCardsBySearch = async (search, page = 1, pageSize = 25) => {
  let searchUrl = url + 'cards?q=name:*' + search.replace(/ /g, '.') + '*&page=' + page + '&pageSize=' + pageSize + '&orderBy=set.releaseDate';
  return await fetchData(searchUrl);
}



const getCard = async (id) => {
  return await fetchData(`${url}cards/${id}`)
}

const testgetCard = async (id) => {
  return await pokemon.card.find(id)
}

const getSets = async () => {
  let setUrl = url + 'sets?orderBy=releaseDate';
  return await fetchData(setUrl);
}

const testgetSets = async () => {
  return await pokemon.set.all()
}

export {getCardsBySearch, 
  getCardsBySet, 
  getSets, 
  getCard, 
  testgetCard,
  testgetSets
}