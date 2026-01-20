// Main App Components
import { useState, useEffect, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// import { useCards } from './hooks/useCards';
import UserContext from './contexts/UserContext';
import { CardProvider } from './contexts/CardContext';
import { FilterProvider } from './contexts/FilterContext';

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
import Incoming from './pages/Incoming';
import NoPage from './pages/NoPage';


function App() {
  const { user } = useContext(UserContext);

  const location = useLocation();

  // App wide states

  const [sets, setSets] = useState([]);
  const [currentSet, setCurrentSet] = useState("");
  
  const [search, setSearch] = useState(""); 
  const [recentSearch, setRecentSearch] = useState("");

  const [scrollValue, setScrollValue] = useState(0);
  const [setsScrollValue, setSetsScrollValue] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [searchbarState, setSearchbarState] = useState(
    <Searchbar 
      setRecentSearch={setRecentSearch} 
      recentSearch={recentSearch}
    />
  )

  return (
    <div className="App">
      <CardProvider user={user}>
      <FilterProvider>
        <Header 
        setRecentSearch={setRecentSearch} 
        search={search} 
        setSearch={setSearch} />
        
        <Routes>
          <Route 
            path="/" 
            element={<Home 
            setRecentSearch={setRecentSearch} 
            search={search} 
            setSearch={setSearch}/>} 
          />

          <Route 
            path="/search=/:id" 
            element={<SearchResult 
              scrollValue={scrollValue}
              setScrollValue={setScrollValue}
              recentSearch={recentSearch} 
            />} 
          />

          <Route 
            path="/sets" 
            element={<Sets 
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
              sets={sets} 
              setSets={setSets} 
              scrollValue={scrollValue}
              setScrollValue={setScrollValue}
            />} 
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
            element={<Account 
              sets={sets} 
              setSets={setSets} 
            />} 
          />
          <Route
            path="/account/incoming"
            element={<Incoming />}
          />
          <Route 
            path="*" 
            element={<NoPage />} 
          />
        </Routes>

        <Footer />
        </FilterProvider>
      </CardProvider>
    </div>
  );
}

export default App;