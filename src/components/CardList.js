import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardItem from './CardItem'
import './css/CardList.css';

import checkmark from '../assets/check-circle-solid-36.png'

const CardList = ({ filterState, setFilterState, cards, user, scrollValue, setScrollValue }) => {
  const navigate = useNavigate();
  const [mappedCards, setMappedCards] = useState([]);
  const [cardSort, setCardSort] = useState('number');


  // TODO DELTE BELOW HERE --
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
  
  // TODO, add states to hold collected and notCollected
  // save collected and notCollected my filtering cards
  const collectedCards = cards.filter(card => Object.hasOwn(card, "collected"));
  const notCollectedCards = cards.filter(card => !Object.hasOwn(card, "collected"));

  // Renders a list of cards that is stored in a cards state the App.js file
  
  const doCards = () => {
    let retCard = cards.map(card => makeCard(card));
    window.scrollTo(0, scrollValue);
    return retCard;
  }

  // TODO, currently, these arrays are calculated once, not dynamicaly
  // need to set a function that maps the correct card list based on both filter and sort
  // and save in a state
  const listOfCards = doCards();
  const listOfCardsCollected = collectedCards.map(card => makeCard(card))
  const listOfCardsNotCollected = notCollectedCards.map(card => makeCard(card))
  // TODO DELETE ABOVE HERE --

  // Set to saved scroll on page load
  useEffect(() => {
    setTimeout(() => {window.scrollTo(0, scrollValue)}, 10);
  }, []);


  const mapCards = (cardlist) => {
    return cardlist.map((card) => {
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
    })
  }


  // WORK IN PROGRESS
  const handleDisplayCardlist = () => {
    // check the filter
    let filteredCards = [];
    if (filterState === "collected") {
      filteredCards = cards.filter(card => Object.hasOwn(card, "collected"));
    } else if (filterState === 'notCollected') {
      filteredCards === cards.filter(card => !Object.hasOwn(card, "collected"));
    } else { // all cards
      filteredCards.push(...cards);
    }
    // check the sort and map accordingly
    if (cardSort === 'revNumber') {
      setMappedCards(mapCards(filteredCards.toReversed()));
    } else {
      setMappedCards(mapCards(filteredCards));
    }
  }


  return (
    <div className="card-list-container">

      {user
      ? <div className='filter-container'>
          <button 
            onClick={() => setFilterState('all')} 
            className={filterState === 'all' ? 'selected' : ''}
          >
            All Cards
          </button>
          <button 
            onClick={() => setFilterState('collected')} 
            className={filterState === 'collected' ? 'selected' : ''}
          >
            Collected
          </button>
          <button 
            onClick={() => setFilterState('notCollected')} 
            className={filterState === 'notCollected' ? 'selected' : ''}
          >
            Not Collected
          </button>
        </div>
      : <></>
      }
      
      {/* TODO, update to display the mappedCards state */}
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