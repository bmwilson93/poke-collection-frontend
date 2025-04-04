import React from 'react'
import Searchbar from '../components/Searchbar';

import './css/Home.css'

const Home = ({ setRecentSearch, search, setSearch}) => {
  return (
    <div className="home-div full-height">
      <div className="title-container">
        <h1>Pok&eacute;-Collect</h1>
        <h3>The Ultimate Pok&eacute;mon Card Database and Collection App</h3>
        <Searchbar 
          setRecentSearch={setRecentSearch} 
          search={search} 
          setSearch={setSearch}
        />
      </div>

      {/* Decorateive Cards */}
      <div className="decoration-container">

        <div className="decoration-item decoration-left">
          <img className="hover-grow" src="https://images.pokemontcg.io/g1/1.png" alt="" />
        </div>

        <div className="decoration-item decoration-middle">
          <img className="hover-grow" src="https://images.pokemontcg.io/xy2/11.png" alt="" />
        </div>

        <div className="decoration-item decoration-right">
          <img className="hover-grow" src="https://images.pokemontcg.io/g1/17.png" alt="" />
        </div>

      </div>
    </div>
  )
}

export default Home