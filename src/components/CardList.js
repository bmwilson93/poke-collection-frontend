import { useContext } from 'react'
import { useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import CardContext from '../contexts/CardContext';
import FilterContext from '../contexts/FilterContext';

import CardItem from './CardItem'
import './css/CardList.css';

import { sortByPrice } from '../utils/sortByPrice';


const CardList = ({ scrollValue, setScrollValue }) => {
  const { user } = useContext(UserContext);
  const { cards } = useContext(CardContext);
  const { cardsFilter, setCardsFilter, cardsSort, setCardsSort, toggleDisplayVariants, setToggleDisplayVariants } = useContext(FilterContext);
  const [mappedCards, setMappedCards] = useState([]);


  // Set to saved scroll on page load
  useEffect(() => {
    if (mappedCards.length === 0) return;
      
      const lastCardId = sessionStorage.getItem('last-card-id');
      const savedScroll = sessionStorage.getItem('set-scroll-position');
      
      if (!lastCardId && !savedScroll) return;
      
      const restoreScroll = () => {
        // First try to find the specific card
        if (lastCardId) {
          const cardElement = document.querySelector(`[data-card-id="${lastCardId}"]`);
          if (cardElement) {
            // Scroll the card to a comfortable position (100px from top)
            const elementTop = cardElement.offsetTop;
            window.scrollTo({ 
              top: Math.max(0, elementTop - 100), 
              behavior: 'auto' 
            });
            
            console.log('Scrolled to card:', lastCardId, 'at position:', elementTop - 100);
            sessionStorage.removeItem('last-card-id');
            sessionStorage.removeItem('set-scroll-position');
            return;
          }
        }
        
        // Fallback to saved scroll position
        if (savedScroll) {
          const scrollPosition = parseInt(savedScroll, 10);
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          const targetPosition = Math.min(scrollPosition, maxScroll);
          
          console.log('Falling back to saved position:', targetPosition);
          window.scrollTo({ 
            top: targetPosition, 
            behavior: 'auto' 
          });
          
          sessionStorage.removeItem('set-scroll-position');
        }
      };
      
      // Wait for images to load
      const images = document.querySelectorAll('img');
      const checkImages = () => {
        const unloaded = Array.from(images).filter(img => !img.complete);
        if (unloaded.length === 0) {
          restoreScroll();
        } else {
          setTimeout(checkImages, 100);
        }
      };
      
      // Start checking after a brief delay
      setTimeout(checkImages, 10);
    }, [mappedCards]);

  // Trying this out,to see if I can get this to run once the filter or sort state updates
  useEffect(() => {
    handleDisplayCardlist();
  }, [cardsFilter, cardsSort])


  const mapCards = (cardlist) => {
    return cardlist.map((card) => {
      return (<CardItem card={card} setScrollValue={setScrollValue} toggleDisplayVariants={toggleDisplayVariants}/>)
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
{/* 
      {user && cardsFilter === 'collected'
      ? <div>
        <button>Partially Collected</button>
        <button>Fully Collected</button>
      </div>
      :<></>} */}

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

      <div className='variant-toggle-container'>
        <div><span>Show Card Variants: </span></div>
        <div>
          <label className="switch">
            <input type="checkbox" id='toggle' checked={toggleDisplayVariants} onChange={() => setToggleDisplayVariants(!toggleDisplayVariants)} />
            <span className='slider round'></span>
          </label>
        </div>
      </div>
      
      <ul className="card-list">
        {mappedCards}
      </ul>

    </div>
  )
}

export default CardList