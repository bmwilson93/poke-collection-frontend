import React from 'react'
import { useNavigate } from 'react-router-dom';
import CardItem from './CardItem'
import './css/CardList.css';

import checkmark from '../assets/check-circle-solid-36.png'

const CardList = ({ cards }) => {
  const navigate = useNavigate();

  // save collected and notCollected my filtering cards
  const collectedCards = cards.filter();

  const notCollectedCards = cards.filter();
  
  // then take the list of cards var and turn it into a function that takes cards as arg
  // then call the function from the component, and view only what is selected
  // use a state to manage which filter is selected and shown

  // Renders a list of cards that is stored in a cards state the App.js file
  const listOfCards = cards.map(card => 
    <li key={card.id} onClick={() => navigate(`/card/${card.id}`, {state:{card: card}})}>
      
      {card.collected ? <img src={checkmark} className='checkmark-list' /> : <></>}
      {card.collectedQuantity}
      
      <CardItem name={card.name} 
        setName={card.set.name} 
        avgSellPrice={card.cardmarket && card.cardmarket.prices && card.cardmarket.prices.averageSellPrice}
        // tcgAvgSellPrice={card.tcgplayer && card.tcgplayer.prices && card.tcgplayer.prices.holofoil || card.tcgplayer.prices.reverseHolofoil || card.tcgplayer.prices.normal}
        imgSrc={card.images.small}/>
    </li>
  )

  return (
    <div className="card-list-container">

      <ul className="card-list">
        {listOfCards}
      </ul>

    </div>
  )
}

export default CardList