import pokemon from 'pokemontcgsdk';

pokemon.configure({apiKey: process.env.REACT_APP_API_KEY});



const old_url = "https://api.pokemontcg.io/v2/";
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
    return data;

  } catch (error) {
    console.log(error);
    return {error: error}
  }
}

const getCardsBySet = async (setId) => {
  return await pokemon.card.all({ q: 'set.id:' + setId, orderBy: 'number'})
}

// getCards takes a search or query, and returns a list of cards
const getCardsBySearch = async (search, page = 1, pageSize = 25) => {
  let searchUrl = url + 'cards?q=name:*' + search.replace(/ /g, '.') + '*&page=' + page + '&pageSize=' + pageSize + '&orderBy=set.releaseDate';
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
  let setUrl = url + 'expansions?orderBy=releaseDate';
  return await fetchData(setUrl);
}

const testgetSets = async () => {
  return await pokemon.set.all()
}

export {getCardsBySearch, 
  getCardsBySet, 
  getSets, 
  getCardById
}