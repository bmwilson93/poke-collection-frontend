import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardItem from './CardItem'
import './css/CardList.css';

import checkmark from '../assets/check-circle-solid-36.png'

const CardList = ({ filterState, setFilterState, cards, user, scrollValue, setScrollValue }) => {
  const navigate = useNavigate();
  // const [filterState, setFilterState] = useState('all');

  const makeCard = (card) => {
    return (<li key={card.id} onClick={() => {
      setScrollValue(window.scrollY);
      navigate(`/card/${card.id}`, {state:{card: card}})}
    }>
      
    {card.collected ? <img src={checkmark} className='checkmark-list' /> : <></>}
    {card.collectedQuantity}
    
    <CardItem name={card.name} 
      setName={card.set.name} 
      avgSellPrice={card.cardmarket && card.cardmarket.prices && card.cardmarket.prices.averageSellPrice}
      imgSrc={card.images.small}/>
  </li>);
  }
  
  // save collected and notCollected my filtering cards
  const collectedCards = cards.filter(card => Object.hasOwn(card, "collected"));
  const notCollectedCards = cards.filter(card => !Object.hasOwn(card, "collected"));

  // Renders a list of cards that is stored in a cards state the App.js file
  
  const doCards = () => {
    let retCard = cards.map(card => makeCard(card));
    window.scrollTo(0, scrollValue);
    return retCard;
  }
  const listOfCards = doCards();
  const listOfCardsCollected = collectedCards.map(card => makeCard(card))
  const listOfCardsNotCollected = notCollectedCards.map(card => makeCard(card))

  useEffect(() => {
    setTimeout(() => {window.scrollTo(0, scrollValue)}, 10);
  }, []);

  return (
    <div className="card-list-container">

      {user
      ? <div className='filter-container'>
          <button onClick={() => setFilterState('all')} className={filterState === 'all' ? 'selected' : ''}>All Cards</button>
          <button onClick={() => setFilterState('collected')} className={filterState === 'collected' ? 'selected' : ''}>Collected</button>
          <button onClick={() => setFilterState('notCollected')} className={filterState === 'notCollected' ? 'selected' : ''}>Not Collected</button>
        </div>
      : <></>
      }
      
      <ul className="card-list">
        {filterState === 'all' 
          ? listOfCards
          : filterState === 'collected'
            ? listOfCardsCollected
            : listOfCardsNotCollected}
      </ul>

    </div>
  )
}

export default CardList