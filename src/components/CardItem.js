import React from 'react';
import './css/CardItem.css';

import { variants } from '../utils/variantList';

const CardItem = ({ card }) => {
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


  return (
    <div
      className="card-item hover-grow"
    >
      <img src={card?.images[0]?.small} 
        className="cardlist-image"
        loading='lazy'
      />
      <span className="avg-price">Market Average: ${displayAveragePrice()}</span>
    </div>
  )
}

export default CardItem