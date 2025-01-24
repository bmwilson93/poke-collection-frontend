import React from 'react';
import './css/CardItem.css';

const CardItem = ({ name, setName, avgSellPrice, tcgPrices, imgSrc}) => {
  const displayAveragePrice = () => {
    if (avgSellPrice) {
      return avgSellPrice.toFixed(2);
    } else { // No cardMarkent Avg price, check for tcgplayer prices instead
      if (tcgPrices?.normal) {
        return tcgPrices.normal.market.toFixed(2);
      } else if (tcgPrices?.holofoil) {
        return tcgPrices.holofoil.market.toFixed(2);
      } else if (tcgPrices?.reverseHolofoil) {
        return tcgPrices.reverseHolofoil.market.toFixed(2);
      } else {
        return 'NA'
      }
    }
  }


  return (
    <div
      className="card-item hover-grow"
    >
      <img src={imgSrc} 
        className="cardlist-image"
        loading='lazy'
      />
      <span className="avg-price">Market Average: ${displayAveragePrice()}</span>
    </div>
  )
}

export default CardItem