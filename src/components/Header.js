import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

import Searchbar from './Searchbar';
import './css/Header.css';
import userLogo from '../assets/user-solid-24.png';

// import logo from '../assets/Pokecoin.png';
import logo from '../assets/logo.png';

const Header = ({ setRecentSearch, search, setSearch}) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return (
    <header className={location.pathname !== '/' ? 'add-margin' : ''}>
        <div className="home-container">
          <Link to='/' className="header-home-link white-link">
            <img src={logo} alt="logo" width="40px"/>
            <span className="header-title">Pok&eacute;-Collect</span>
          </Link>

          {/* If not on the home page, dispaly the search bar in the header */}
          {location.pathname !== '/' 
          ? <Searchbar 
              setRecentSearch={setRecentSearch} 
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