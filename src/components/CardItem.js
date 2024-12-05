import React from 'react';
import './css/CardItem.css';

const CardItem = ({ name, setName, avgSellPrice, tcgAvgSellPrice, imgSrc}) => {
  return (
    <div
      className="card-item hover-grow"
    >
      <img src={imgSrc} 
        className="cardlist-image"
        loading='lazy'
      />
      <span className="avg-price">Market Average: ${
      avgSellPrice ? avgSellPrice.toFixed(2) : 'NA'
      }</span>
    </div>
  )
}

export default CardItem