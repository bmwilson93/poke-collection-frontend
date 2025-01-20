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

  const sortByPrice = (cardArray, option = 'high') => {
    let newArray = [...cardArray];
    
    if (option === 'high') { // high to low
      newArray.sort((x, y) => {
        // If card has cardmarket prices
        if (x.cardmarket?.prices?.averageSellPrice && y.cardmarket?.prices?.averageSellPrice) {
          return y.cardmarket.prices.averageSellPrice - x.cardmarket.prices.averageSellPrice;
        }

        // If card has tcgplayer prices
        if (x.tcgplayer?.prices && y.tcgplayer?.prices) {

          // check the possible combos for 1st card normal
          if (x.tcgplayer.prices.normal && y.tcgplayer.prices.normal) {
            return y.tcgplayer.prices.normal.market - x.tcgplayer.prices.normal.market;
          } 
          else if (x.tcgplayer.prices.normal && y.tcgplayer.prices.holofoil) {
            return y.tcgplayer.prices.holofoil.market - x.tcgplayer.prices.normal.market;
          } 
          else if (x.tcgplayer.prices.normal && y.tcgplayer.prices.reverseHolofoil) {
            return y.tcgplayer.prices.reverseHolofoil.market - x.tcgplayer.prices.normal.market;
          }

          // check the possible combos for 1st card holo
          if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.normal) {
            return y.tcgplayer.prices.normal.market - x.tcgplayer.prices.holofoil.market;
          } 
          else if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.holofoil) {
            return y.tcgplayer.prices.holofoil.market - x.tcgplayer.prices.holofoil.market;
          } 
          else if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.reverseHolofoil) {
            return y.tcgplayer.prices.reverseHolofoil.market - x.tcgplayer.prices.holofoil.market;
          }

          // check the possible combos for 1st card reverseHolo
          if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.normal) {
            return y.tcgplayer.prices.normal.market - x.tcgplayer.prices.reverseHolofoil.market;
          } 
          else if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.holofoil) {
            return y.tcgplayer.prices.holofoil.market - x.tcgplayer.prices.reverseHolofoil.market;
          } 
          else if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.reverseHolofoil) {
            return y.tcgplayer.prices.reverseHolofoil.market - x.tcgplayer.prices.reverseHolofoil.market;
          }
        }

        // no prices for card, just return 0 to keep array in same order
        return 0;        
      });

    } else { // low to high
      newArray.sort((x, y) => {
        if (x.cardmarket?.prices?.averageSellPrice && y.cardmarket?.prices?.averageSellPrice) {
          // If card has cardmarket prices
          return x.cardmarket.prices.averageSellPrice - y.cardmarket.prices.averageSellPrice;
        }

        // If card has tcgplayer prices
        if (x.tcgplayer?.prices && y.tcgplayer?.prices) {

          // check the possible combos for 1st card normal
          if (x.tcgplayer.prices.normal && y.tcgplayer.prices.normal) {
            return x.tcgplayer.prices.normal.market - y.tcgplayer.prices.normal.market;
          } 
          else if (x.tcgplayer.prices.normal && y.tcgplayer.prices.holofoil) {
            return x.tcgplayer.prices.normal.market - y.tcgplayer.prices.holofoil.market;
          } 
          else if (x.tcgplayer.prices.normal && y.tcgplayer.prices.reverseHolofoil) {
            return x.tcgplayer.prices.normal.market - y.tcgplayer.prices.reverseHolofoil.market;
          }

          // check the possible combos for 1st card holo
          if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.normal) {
            return x.tcgplayer.prices.holofoil.market - y.tcgplayer.prices.normal.market;
          } 
          else if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.holofoil) {
            return x.tcgplayer.prices.holofoil.market - y.tcgplayer.prices.holofoil.market;
          } 
          else if (x.tcgplayer.prices.holofoil && y.tcgplayer.prices.reverseHolofoil) {
            return x.tcgplayer.prices.holofoil.market - y.tcgplayer.prices.reverseHolofoil.market;
          }

          // check the possible combos for 1st card reverseHolo
          if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.normal) {
            return x.tcgplayer.prices.reverseHolofoil.market - y.tcgplayer.prices.normal.market;
          } 
          else if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.holofoil) {
            return x.tcgplayer.prices.reverseHolofoil.market - y.tcgplayer.prices.holofoil.market;
          } 
          else if (x.tcgplayer.prices.reverseHolofoil && y.tcgplayer.prices.reverseHolofoil) {
            return x.tcgplayer.prices.reverseHolofoil.market - y.tcgplayer.prices.reverseHolofoil.market;
          }
        }

        // no prices for card, just return 0 to keep array in same order
        return 0;    
      });
    }
    return newArray;
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
    } else if (cardSort === 'price h-l') {
      setMappedCards(mapCards(sortByPrice(filteredCards, 'high')));
    } else if (cardSort === 'price l-h') {
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

      <div className='sort-container'>
        <p>Sort by: {}</p>
        <select
          value={cardSort}
          onChange={(e) => {setCardSort(e.target.value)}}
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