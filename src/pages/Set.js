import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardList from '../components/CardList';
import Loading from '../components/Loading';
import './css/Set.css';

import { fetchData } from '../utils/fetchData';



const Set = ({ scrollValue, setScrollValue, currentSet, setCurrentSet, cards, setCards, user, applyCollection }) => {
  const location = useLocation();
  const dataOfSet = location.state.set;

  const fetchAllCards = async () => {
    setCards([]);
    let allCards = [];

    const url = "https://api.pokemontcg.io/v2/cards?q=set.id:" + dataOfSet.id  + "&orderBy=number"

    let responseData = await fetchData(url);

    if ('error' in responseData) {
      console.log("found an error");
    } else {
        allCards.push(...responseData.data);
        if (responseData.totalCount > responseData.pageSize) {
          responseData = await fetchData(url + "&page=2");
          allCards.push(...responseData.data);
        }
      // setCards(allCards);
      // console.log(allCards.length);
      applyCollection(allCards);
    }
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
    <div className="set-container">
      <div className="set-image-container">
        <img src={dataOfSet.images.logo} alt={dataOfSet.name} width='340px'/>
      </div>

      <div className="set-name-container">
        <h1>{dataOfSet.name}</h1>
      </div>

      <div className="card-list-container2">
        {cards.length > 0 
        ? <CardList cards={cards} user={user} scrollValue={scrollValue} setScrollValue={setScrollValue}/>
        : <Loading />}
        
      </div>

      <button className="back-to-top-btn" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to Top</button>
    </div>
  )
}

export default Set