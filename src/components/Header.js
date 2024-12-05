import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Searchbar from './Searchbar';
import './css/Header.css';

import logo from '../assets/Pokecoin.png';

const Header = ({ getCards, setRecentSearch, recentSearch, searchbarState, search, setSearch}) => {
  const location = useLocation();

  return (
    <header>
        <div className="home-container">
          <Link to='/' className="header-home-link white-link">
            <img src={logo} alt="logo" width="40px"/>
            <span className="header-title">Pok&eacute;mon TCG Dex</span>
          </Link>

          {/* If not on the home page, dispaly the search bar in the header */}
          {location.pathname !== '/' 
          ? <Searchbar 
              getCards={getCards} 
              setRecentSearch={setRecentSearch} 
              recentSearch={recentSearch} 
              small={true}
              search={search}
              setSearch={setSearch}
            /> 
          : null}
        </div>

        <nav>
          <Link to='/sets' className='set-link white-link'>Browse By Set</Link>
        </nav>
    </header>

  )
}

export default Header