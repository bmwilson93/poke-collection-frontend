import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardItem from './CardItem'
import './css/CardList.css';

import checkmark from '../assets/check-circle-solid-36.png'

const CardList = ({ cardSort, setCardSort, filterState, setFilterState, cards, user, scrollValue, setScrollValue }) => {
  const navigate = useNavigate();
  const [mappedCards, setMappedCards] = useState([]);
  // const [cardSort, setCardSort] = useState('number');


  // Set to saved scroll on page load
  useEffect(() => {
    setTimeout(() => {window.scrollTo(0, scrollValue)}, 10);
  }, []);

  // Trying this out,to see if I can get this to run once the filter or sort state updates
  useEffect(() => {
    handleDisplayCardlist();
  }, [filterState, cardSort])


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


  const handleDisplayCardlist = () => {
    // check the filter
    let filteredCards = [];
    if (filterState === "collected") {
      filteredCards = cards.filter(card => Object.hasOwn(card, "collected"));
    } else if (filterState === 'notCollected') {
      filteredCards = cards.filter(card => !Object.hasOwn(card, "collected"));
    } else { // all cards
      filteredCards.push(...cards);
    }
    // check the sort and map accordingly
    if (cardSort === 'revNumber') {
      setMappedCards(mapCards(filteredCards.toReversed()));
      // Simply add else if here to add more sort options
    } else {
      setMappedCards(mapCards(filteredCards));
    }
  }


  return (
    <div className="card-list-container">

      <div className='sort-container'>
        <p>Sort by: {}</p>
        <select
          value={cardSort}
          onChange={(e) => {setCardSort(e.target.value)}}
        >
          <option value='number'>Set Number -asc-</option>
          <option value='revNumber'>Set Number -desc-</option>
        </select>
      </div>

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
      
      <ul className="card-list">
        {mappedCards}
      </ul>

    </div>
  )
}

export default CardList