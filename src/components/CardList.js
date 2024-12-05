import React from 'react'
import { useNavigate } from 'react-router-dom';
import CardItem from './CardItem'
import './css/CardList.css';

const CardList = ({ cards }) => {
  const navigate = useNavigate();

  // Renders a list of cards that is stored in a cards state the App.js file
  const listOfCards = cards.map(card => 
    <li key={card.id} onClick={() => navigate(`/card/${card.id}`, {state:{card: card}})}>
      
      {card.collected ? <p>collected {}</p> : <></>}
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