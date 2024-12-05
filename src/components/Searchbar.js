import React from 'react'
import { useNavigate } from 'react-router-dom';

import './css/Searchbar.css'

const Searchbar = ({ getCards, setRecentSearch, recentSearch, small=false, search, setSearch }) => {

  const navigate = useNavigate();

  const searchCards = () => {
    setRecentSearch(search);
    getCards(search, 1)
  }

  const handleSubmit = () => {
    searchCards();
    navigate(`/search=/${search}`);
  }

  const isSmall = small ? 'make-small' : '';

  return (
    <div className="searchbar-container">
      <form
        onSubmit={(e) => {e.preventDefault(); handleSubmit();}}
      >
        <input
          type="text"
          placeholder="Search for a card"
          value={search}
          className={isSmall}
          onChange={(e) => setSearch(e.target.value)}></input>  
      </form>  
    </div>
  )
}

export default Searchbar