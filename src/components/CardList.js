import { useContext } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import CardContext from '../contexts/CardContext';
import FilterContext from '../contexts/FilterContext';

import CardItem from './CardItem'
import './css/CardList.css';

import { sortByPrice } from '../utils/sortByPrice';

import checkmark from '../assets/check-circle-solid-36.png'
import mailIcon from '../assets/mail-send-regular-36.png'

const CardList = ({ scrollValue, setScrollValue }) => {
  const { user } = useContext(UserContext);
  const { cards } = useContext(CardContext);
  const { cardsFilter, setCardsFilter, cardsSort, setCardsSort } = useContext(FilterContext);
  const navigate = useNavigate();
  const [mappedCards, setMappedCards] = useState([]);


  // Set to saved scroll on page load
  useEffect(() => {
    setTimeout(() => {window.scrollTo(0, scrollValue)}, 10);
  }, [mappedCards]);

  // Trying this out,to see if I can get this to run once the filter or sort state updates
  useEffect(() => {
    handleDisplayCardlist();
  }, [cardsFilter, cardsSort])


  const mapCards = (cardlist) => {
    return cardlist.map((card) => {
      return (<li key={card.id} onClick={() => {
        setScrollValue(window.scrollY);
        navigate(`/card/${card.id}`)}
      }>
        
      {card.collected ? <img src={checkmark} className='checkmark-list' /> : <></>}
      {card.collectedQuantity}

      {card.incoming ? <img src={mailIcon} className='incoming-list' /> : <></>}
      
      <CardItem card={card}/>
    </li>);
    })
  }


  const handleDisplayCardlist = () => {
    // check the filter
    let filteredCards = [];
    if (cardsFilter === "collected") {
      filteredCards = cards.filter(card => Object.hasOwn(card, "collected"));
    } else if (cardsFilter === 'notCollected') {
      filteredCards = cards.filter(card => !Object.hasOwn(card, "collected"));
    } else if (cardsFilter === 'incoming') {
      filteredCards = cards.filter(card => Object.hasOwn(card, "incoming"));
    } else { // all cards
      filteredCards.push(...cards);
    }
    // check the sort and map accordingly
    if (cardsSort === 'revNumber') {
      setMappedCards(mapCards(filteredCards.toReversed()));
      // Simply add else if here to add more sort options
    } else if (cardsSort === 'price h-l') {
      setMappedCards(mapCards(sortByPrice(filteredCards, 'high')));
    } else if (cardsSort === 'price l-h') {
      setMappedCards(mapCards(sortByPrice(filteredCards, 'low')));
    } else {
      setMappedCards(mapCards(filteredCards));
    }
  }


  return (
    <div className="card-list-container">

      

      {user
      ? <div className='filter-container'>
          <button 
            onClick={() => {setScrollValue(0, 0); setCardsFilter('all')}} 
            className={cardsFilter === 'all' ? 'selected' : ''}
          >
            All Cards
          </button>
          <button 
            onClick={() => { setScrollValue(0, 0); setCardsFilter('collected')}} 
            className={cardsFilter === 'collected' ? 'selected' : ''}
          >
            Collected
          </button>
          <button 
            onClick={() => { setScrollValue(0, 0); setCardsFilter('notCollected')}} 
            className={cardsFilter === 'notCollected' ? 'selected' : ''}
          >
            Not Collected
          </button>
          <button 
            onClick={() => { setScrollValue(0, 0); setCardsFilter('incoming')}} 
            className={cardsFilter === 'incoming' ? 'selected' : ''}
          >
            Incoming
          </button>
        </div>
      : <></>
      }

      <div className='sort-container'>
        <p>Sort by: {}</p>
        <select
          value={cardsSort}
          onChange={(e) => {setScrollValue(0, 0); setCardsSort(e.target.value)}}
        >
          <option value='number'>Set Number -asc-</option>
          <option value='revNumber'>Set Number -desc-</option>
          <option value='price h-l'>Price high-low</option>
          <option value='price l-h'>Price low-high</option>
        </select>
      </div>
      
      <ul className="card-list">
        {mappedCards}
      </ul>

    </div>
  )
}

export default CardList