// Main App Components
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Component Imports
import Header from './components/Header';
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';

// Page Imports
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Sets from './pages/Sets';
import Set from './pages/Set';
import Card from './pages/Card';
import Login from './pages/Login';
import SIgnup from './pages/SIgnup';
import Account from './pages/Account';
import NoPage from './pages/NoPage';

import { fetchData } from './utils/fetchData';
import { setCollected } from './utils/setcollected';



function App() {
  const location = useLocation();

  const [cards, setCards] = useState([]);
  const [sets, setSets] = useState([]);
  const [currentSet, setCurrentSet] = useState("");
  const [cardCount, setCardCount] = useState(-1);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentSearch, setRecentSearch] = useState("");

  const [search, setSearch] = useState("");

  const [user, setUser] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    fetchUser(); // check if the user is logged in on load
  }, [])
  
  
  
  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/isloggedin', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'GET',
        credentials: "include",
        withCredentials: true
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const applyCollection = (cardArray = cards) => {
    if (user) {
      let collectedCards = setCollected(cardArray, user.collection);
      setCards(collectedCards);
    }
    setCards(cardArray);
  }

  useEffect(() => applyCollection(), [user]);

  const url = "https://api.pokemontcg.io/v2/";


  // Call API to get results for search (search from Searchbar.js)
  const getCards = async (search, page=1) => {
    setCards([]);
    
    //build the url with search query
    let fixedSearch = search.replace(/ /g, '.')
    let searchTerm = "cards?q=name:*" + fixedSearch + "*" + "&page=" + page + "&pageSize=25"
    let query = url + searchTerm

    let result = await fetchData(query);

    // set the card list and total results found
    if('error' in result) {
      console.log("found an error");
    } else { // No errors, set the data in states

      // setCards(result.data,);
      applyCollection(result.data);

      setCardCount(result.totalCount);
      setPages(Math.ceil(result.totalCount / result.pageSize));
      setCurrentPage(result.page);
      
    }
  } 

  const [searchbarState, setSearchbarState] = useState(
    <Searchbar 
      getCards={getCards} 
      setRecentSearch={setRecentSearch} 
      recentSearch={recentSearch}
    />
  )

  return (
    <div className="App">
      <Header getCards={getCards} setRecentSearch={setRecentSearch} recentSearch={recentSearch} searchbarState={searchbarState} search={search} setSearch={setSearch} user={user}/>
      {/* <TestPage /> */}
      <Routes>
        <Route path="/" element={<Home getCards={getCards} setRecentSearch={setRecentSearch} recentSearch={recentSearch} search={search} setSearch={setSearch}/>} searchbarState={searchbarState}/>
        <Route path="/search=/:id" element={<SearchResult cards={cards} currentPage={currentPage} pages={pages} getCards={getCards} recentSearch={recentSearch} cardCount={cardCount}/>} />
        <Route path="/sets" element={<Sets sets={sets} setSets={setSets} setCurrentSet={setCurrentSet}/>} />
        <Route path="/set/:id" element={<Set currentSet={currentSet} setCurrentSet={setCurrentSet} cards={cards} setCards={setCards} user={user} applyCollection={applyCollection}/>} />
        <Route path="/card/:id" element={<Card user={user} setUser={setUser} applyCollection={applyCollection}/>} />
        <Route path="/login" element={<Login setUser={setUser} applyCollection={applyCollection}/>} />
        <Route path="/signup" element={<SIgnup setUser={setUser} />} />
        <Route path="/account/:username" element={<Account user={user} setUser={setUser}/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>

      <Footer searchbarState={searchbarState}/>
    </div>
  );
}

export default App;