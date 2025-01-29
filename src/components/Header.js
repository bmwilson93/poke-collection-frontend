import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Searchbar from './Searchbar';
import './css/Header.css';
import userLogo from '../assets/user-solid-24.png';

// import logo from '../assets/Pokecoin.png';
import logo from '../assets/logo.png';

const Header = ({ getCards, setRecentSearch, recentSearch, searchbarState, search, setSearch, user}) => {
  const location = useLocation();

  return (
    <header>
        <div className="home-container">
          <Link to='/' className="header-home-link white-link">
            <img src={logo} alt="logo" width="40px"/>
            <span className="header-title">Pok&eacute;-Collect</span>
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
          
          {user 
          ? <span>
              <Link to={`/account/${user.username}`} className='set-link white-link'>
                {/* <img src={userLogo} /> */}
                Hi, {user.username}
              </Link>
            </span> 
          : <Link to='/login' className='set-link white-link'>Log In</Link>
          }

        </nav>
    </header>

  )
}

export default Header