// Main App Components
import { useState, useEffect, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// import { useUser } from './hooks/useUser';
import { useCards } from './hooks/useCards';
import UserContext from './contexts/UserContext';

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


function App() {
  const { user } = useContext(UserContext);

  const location = useLocation();

  // App wide states

  // const { user, checkingUser, setCheckingUser, setUser } = useUser();
  const { cards, setCards, cardCount, pages, currentPage, getCards, applyCollection } = useCards(user);

  const [sets, setSets] = useState([]);
  const [currentSet, setCurrentSet] = useState("");
  const [recentSearch, setRecentSearch] = useState("");
  const [filterState, setFilterState] = useState('all'); // Filters for card list (IE: collected/not collected)
  const [cardSort, setCardSort] = useState('number'); // Sort options for card list
  const [selectedSort, setSelectedSort] = useState('newest'); // Sort for sets
  const [seriesFilter, setSeriesFilter] = useState('All') // Filter for sets by series
  const [search, setSearch] = useState("");
  const [scrollValue, setScrollValue] = useState(0);
  const [setsScrollValue, setSetsScrollValue] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => applyCollection(), [user]);

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
          <Route 
            path="/" 
            element={<Home 
            getCards={getCards} 
            setRecentSearch={setRecentSearch} 
            recentSearch={recentSearch} 
            search={search} 
            setSearch={setSearch}/>} 
            searchbarState={searchbarState}
          />
          <Route 
            path="/search=/:id" 
            element={<SearchResult 
              cardSort={cardSort}
              setCardSort={setCardSort}
              filterState={filterState}
              setFilterState={setFilterState}
              scrollValue={scrollValue}
              setScrollValue={setScrollValue}
              cards={cards} 
              currentPage={currentPage} 
              pages={pages} 
              getCards={getCards} 
              recentSearch={recentSearch} 
              cardCount={cardCount}
              // user={user}
            />} 
          />
          <Route 
            path="/sets" 
            element={<Sets 
              seriesFilter={seriesFilter}
              setSeriesFilter={setSeriesFilter}
              selectedSort={selectedSort} 
              setSelectedSort={setSelectedSort}
              sets={sets} 
              setSets={setSets} 
              setCurrentSet={setCurrentSet}
              setsScrollValue={setsScrollValue}
              setSetsScrollValue={setSetsScrollValue}
              />}
          />
          <Route 
            path="/set/:id" 
            element={<Set 
              cardSort={cardSort}
              setCardSort={setCardSort}
              filterState={filterState}
              setFilterState={setFilterState}
              scrollValue={scrollValue}
              setScrollValue={setScrollValue}
              currentSet={currentSet} 
              setCurrentSet={setCurrentSet} 
              cards={cards} 
              setCards={setCards} 
              // user={user} 
              applyCollection={applyCollection}/>} 
          />
          <Route 
            path="/card/:id" 
            element={<Card />} 
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/signup" 
            element={<SIgnup />} 
          />
          <Route 
            path="/account/:username" 
            element={<Account />} 
          />
          <Route 
            path="*" 
            element={<NoPage />} 
          />
        </Routes>

        <Footer searchbarState={searchbarState}/>
    </div>
  );
}

export default App;