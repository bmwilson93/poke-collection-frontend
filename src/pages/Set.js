import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardList from '../components/CardList';
import Loading from '../components/Loading';
import './css/Set.css';

import { getCardsBySet } from '../utils/fetchData';



const Set = ({ cardSort, setCardSort, filterState, setFilterState, scrollValue, setScrollValue, currentSet, setCurrentSet, cards, setCards, user, applyCollection }) => {
  const location = useLocation();
  const dataOfSet = location.state.set;

  const fetchAllCards = async () => {
    setCards([]);
    let allCards = [];

    let page = 1;
    let endOfSet = false;

    // Loop until all cards in set are fetched
    do {
      let response = await getCardsBySet(dataOfSet.id, page);
  
      if ('error' in response) {
        console.log("Error with getting cards");
        break;
      } else {
        allCards.push(...response.data);
        if (response.totalCount <= response.pageSize * page) {
          endOfSet = true;
        } else {
          page ++;
        }
      }
    } while (!endOfSet);   

    applyCollection(allCards);
  };

  useEffect(() => {
    if (cards.length > 0) {
      if (cards[0].set.id !== dataOfSet.id) {
        setScrollValue(0);
        fetchAllCards();
      }
    } else {
      setScrollValue(0);
      fetchAllCards();
    }
  }, []);


  return (
    <div className="set-container full-height">

      
      <div className="set-image-container">
        <img src={dataOfSet.images.logo} alt={dataOfSet.name} width='340px'/>
      </div>

      <div className="set-info-container">

        <div className="set-name-container">
          <h1>{dataOfSet.name}</h1>
          <p>Release Date: {dataOfSet.releaseDate}</p>
        </div>


        <div className="set-details">
          <p>Series: {dataOfSet.series}</p>
          <p>Printed Total: {dataOfSet.printedTotal}</p>
          <p>Total: {dataOfSet.total}</p>
          <img src={dataOfSet.images.symbol} alt={dataOfSet.name + " symbol"} width='40px' />
        </div>

      </div>


      <div className="card-list-container2">
        {cards.length > 0 
        ? <CardList cardSort={cardSort} setCardSort={setCardSort} filterState={filterState} setFilterState={setFilterState} cards={cards} user={user} scrollValue={scrollValue} setScrollValue={setScrollValue}/>
        : <Loading />}
        
      </div>

      <button className="back-to-top-btn" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to Top</button>
    </div>
  )
}

export default Set