import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CardContext from '../contexts/CardContext';

import CardList from '../components/CardList';
import Loading from '../components/Loading';
import './css/Set.css';


const Set = ({ scrollValue, setScrollValue }) => {
  const { cards, getAllSetCards } = useContext(CardContext);
  const location = useLocation();
  const [expansionData, setExpansionData] = useState(location.state.set)

  useEffect(() => {
    if (cards.length > 0) {
      if (cards?.[0]?.set?.id !== expansionData?.id) {
        setScrollValue(0);
        getAllSetCards(expansionData?.id);
      }
    } else {
      setScrollValue(0);
      getAllSetCards(expansionData?.id);
    }
  }, []);


  return (
    <div className="set-container full-height">

      
      <div className="set-image-container">
        <img src={expansionData?.logo} alt={expansionData?.name} width='340px'/>
      </div>

      <div className="set-info-container">

        <div className="set-name-container">
          <h1>{expansionData?.name}</h1>
          <p>Release Date: {expansionData?.release_date}</p>
        </div>


        <div className="set-details">
          <p>Series: {expansionData?.series}</p>
          <p>Printed Total: {expansionData?.printed_total}</p>
          <p>Total: {expansionData?.total}</p>
          <img src={expansionData?.symbol} alt={expansionData?.name + " symbol"} width='40px' />
        </div>

      </div>


      <div className="card-list-container2">
        {cards.length > 0 
        ? <CardList scrollValue={scrollValue} setScrollValue={setScrollValue}/>
        : <Loading />}
        
      </div>

      <button className="back-to-top-btn" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to Top</button>
    </div>
  )
}

export default Set