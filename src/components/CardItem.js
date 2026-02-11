import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import FilterContext from '../contexts/FilterContext';
import './css/CardItem.css';

import checkmark from '../assets/check-circle-solid-36.png'
import mailIcon from '../assets/mail-send-regular-36.png'

import { variants } from '../utils/variantList';
import { formatLabel } from '../utils/formatLabel';

const CardItem = ({ card, setScrollValue }) => {
  const navigate = useNavigate();
  const { toggleDisplayVariants } = useContext(FilterContext);

  const displayAveragePrice = () => {
    // If card has variants array
    if (card?.variants && card.variants.length > 0) {
      // Check variants in the specified order
      for (const variantName of variants) {
        // Find the variant with this name
        const variant = card.variants.find(v => v.name === variantName);
        if (variant?.prices && variant.prices.length > 0) {
          // Find NM price first, or use first price
          const nmPrice = variant.prices.find(p => p.condition === "NM");
          const priceData = nmPrice || variant.prices[0];
          
          if (priceData?.market) {
            return priceData.market.toFixed(2);
          } else if (priceData?.low) {
            return priceData.low.toFixed(2);
          }
        }
      }
      
      // Fallback: check any variant if none found in specific order
      for (const variant of card.variants) {
        if (variant?.prices && variant.prices.length > 0) {
          const nmPrice = variant.prices.find(p => p.condition === "NM");
          const priceData = nmPrice || variant.prices[0];
          
          if (priceData?.market) {
            return priceData.market.toFixed(2);
          } else if (priceData?.low) {
            return priceData.low.toFixed(2);
          }
        }
      }
    }

    // Fallback to NA if no variants or prices found
    return '--';
  };

  const hasVariantCollected = (card, variant) => {
    if (card?.collectedQuantities) {
      let result = card.collectedQuantities.filter(obj => Object.hasOwn(obj, variant.name))
      if (result.length > 0) return true
    }
    return false;
  }

  const hasVariantIncoming = (card, variant) => {
    if (card?.incomingVariants) {
      let result = card.incomingVariants.filter(obj => Object.hasOwn(obj, variant.name))
      if (result.length > 0) return true
    }
    return false;
  }

  const handleCardClick = () => {
    // Save the current scroll position BEFORE navigation
    const scrollPosition = window.scrollY;
    console.log('Saving scroll position:', scrollPosition);
    
    // Save to state (if using prop)
    setScrollValue(scrollPosition);
    
    // Save to sessionStorage as backup
    sessionStorage.setItem('set-scroll-position', scrollPosition.toString());
    sessionStorage.setItem('last-card-id', card.id);
    
    // Navigate to card page
    navigate(`/card/${card.id}`);
  }


  return (
    <li key={card.id} 
      data-card-id={card.id}
      className={!toggleDisplayVariants ? 'hide card-list-card' :"card-list-card"}>
      {card.collected && !toggleDisplayVariants ? <img src={checkmark} className='checkmark-list' /> : <></>}
      {card.incoming && !toggleDisplayVariants ? <img src={mailIcon} className='incoming-list' /> : <></>}
      
      <div
        onClick={() => {handleCardClick()}}
        className="card-item hover-grow"
      >
        <img src={card?.images[0]?.small} 
          className="cardlist-image"
          loading='lazy'
          alt={card?.name}
        />
        <span className="avg-price">Market Average: ${displayAveragePrice()}</span>
      </div>

      {card?.variants && toggleDisplayVariants
        ? <div>
            <ul
              className='card-variant-list'
            >
              {card.variants.map(variant => (
                <li className='card-variant'>
                  <span>{formatLabel(variant.name)}</span>
                  <div className='box'>
                    {hasVariantCollected(card, variant) ? <img src={checkmark} className='master-check'/> : <></>}
                    {hasVariantIncoming(card, variant) ? <img src={mailIcon} className='master-check'/> : <></>}
                  </div>
                </li>))}
            </ul>
          </div> 
        : <></>}
    </li>
  )
}

export default CardItem