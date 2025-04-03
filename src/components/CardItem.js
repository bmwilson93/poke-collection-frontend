import React from 'react';
import './css/CardItem.css';

import { variants } from '../utils/variantList';

const CardItem = ({ card }) => {
  const displayAveragePrice = () => {
    for (const variant of variants) {
      const priceData = card.tcgplayer?.prices?.[variant];
      if (priceData) {
        const price = priceData.market || priceData.mid;
        if (price) return price.toFixed(2);
      }
    }
    
    // Fallback to cardmarket price if no TCG price found
    return card.cardmarket?.prices?.averageSellPrice?.toFixed(2) || 'NA';
  };


  return (
    <div
      className="card-item hover-grow"
    >
      <img src={card.images.small} 
        className="cardlist-image"
        loading='lazy'
      />
      <span className="avg-price">Market Average: ${displayAveragePrice()}</span>
    </div>
  )
}

export default CardItem