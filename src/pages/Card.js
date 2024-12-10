// Page that displays the detailed information for a specific card

import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchAPI } from '../utils/fetchAPI';

import { getTypeImage } from '../utils/getTypeImage';
import checkmark from '../assets/check-circle-solid-48.png';

import './css/Card.css';

const Card = ({ user, setUser, applyCollection }) => {
  const location = useLocation();

  const [card, setCard] = useState(location.state.card)
  // const card = location.state.card;
  const navigate = useNavigate();

  // Card State - to track quantity chages for display

  const subtypes = card.subtypes ? card.subtypes.map((item) => <span key={item.id}>{item} </span>) : <></>

  // runs the call to the backend to update the collection
  const handleCollectionClick = async (action, variant) => {
    const body = JSON.stringify({
      "card_id": card.id,
      "set_id": card.set.id,
      "variant": variant
    })
    const response = await fetchAPI(`collection/${action}`, 'POST', body)
    setUser(response);

    //update the card state
    setCard(prevCard => {

      if (!prevCard.collected) {

        prevCard.collected = true;
        prevCard.collectedQuantities = [{[variant]: 1}]

      } else {

        let found = false;
        for (let i = 0; i < prevCard.collectedQuantities.length; i++) {
          if (Object.hasOwn(prevCard.collectedQuantities[i], variant)) {
            found = true;
            if (action === "add" ) {
              prevCard.collectedQuantities[i][variant]++;
            } else { // remove
              prevCard.collectedQuantities[i][variant]--;
              if (prevCard.collectedQuantities[i][variant] === 0) prevCard.collectedQuantities.splice(i, 1)
              if (prevCard.collectedQuantities.length < 1) {
                delete prevCard.collected;
              }
            }
          }
        }

        if (!found && action === "add") { // variant not found, add it to the collectedQuantities array
          prevCard.collectedQuantities.push({[variant]: 1})
        }
      }


      return prevCard;
    })
  }  


  // Displays the collected qty
  const displayQuantities = (variant) => {
    if (card.collectedQuantities) {
      for (let i = 0; i < card.collectedQuantities.length; i++) {
        if (Object.hasOwn(card.collectedQuantities[i], variant)) return card.collectedQuantities[i][variant];
      }
    }
    return 0;
  }

  // Map each of the card details (attacks, abilities, rules, etc...)
  const abilities = (card.abilities 
    ? card.abilities.map((ability) => {
      return (
        <li>
          <div className="ability-container">
            <span className="ability-name">{ability.name}</span>
            {ability.text}
          </div>
        </li>
      )
    }) 
    : null)

  const attacks = (card.attacks 
    ? card.attacks.map((attack) => {
      return (
        <li>
          <div className="attack-container">

            <div className="attack-title">
              <div className="align-left">
                <div className="attack-cost-container">
                  {attack.cost.map((cost) => 
                    <img className="type-image" src={getTypeImage(cost)} alt={cost} />
                  )}
                </div>
                <span className="attack-name">{attack.name}</span>
              </div>
              <div className="align-right">
                <span className="attack-damage">{attack.damage}</span>
              </div>
            </div>

            <div className='attack-details'>
              <p>{attack.text}</p>
            </div>

          </div>
        </li>
      )
    }) : null
  )

  const rules = (card.rules ? card.rules.map((rule) => {
    return (
      <li className="info-item">{rule}</li>
    )
  }) : null
  )


  return (
    <div className="card-container">

      

      {/* Card Image */}
      <div className="image-container">
        <img className="card-image" src={card.images.large} alt={card.name}/>

        {/* Checkmark for collected card */}
        {card.collected 
        ? <img src={checkmark} className='checkmark-card'/>
        : <></>}
      </div>

      {/* Card Info */}
      <div className="card-info-container">

        {/* Card Title Section */}
        <div className="card-info-title bottom-border">
          <div className="card-name-container">
            <h1 className="card-name">{card.name}</h1>
            
            <span className="card-type">
              {card.supertype} {card.subtypes ?  <> - {subtypes}</> : ""}
            </span>
          
          </div>
          <div className="card-hp-container">
            {card.hp 
              ? <span className="card-hp">HP {card.hp}</span>
              : null
            }
            {card.types 
              ? <img className="type-image"src={getTypeImage(card.types[0])} alt=""/>
              : null
            }
          </div>
        </div>


        <div className="card-collection bottom-border">
          <h2 className='price-header bold'>Your Collection</h2>
          {/* If card has tcgplayer prices, use them to display card variants */}
            {card.tcgplayer
            ? <ul>
                {[<li key='normal' className='section-title'>
                    <span className='variant'>Normal</span>
                    <div>
                      <button 
                        className='collection-btn' 
                        onClick={() => handleCollectionClick('remove', 'normal')}
                      >-</button>
                      <span className='variant variant-total'>
                        {displayQuantities('normal')} {/* Quantity */}
                      </span>
                      <button 
                        className='collection-btn' 
                        onClick={() => handleCollectionClick('add', 'normal')}
                      >+</button>
                    </div>
                  </li>, 

                  <li key='reverseHolofoil' className='section-title'>
                  <span className='variant'>Reverse Holofoil</span>
                  <div>
                    <button 
                      className='collection-btn' 
                      onClick={() => handleCollectionClick('remove', 'reverseHolofoil')}
                    >-</button>
                    <span className='variant variant-total'>
                      {displayQuantities('reverseHolofoil')}
                    </span>
                    <button 
                      className='collection-btn' 
                      onClick={() => handleCollectionClick('add', 'reverseHolofoil')}
                    >+</button>
                  </div>
                </li>, 

                <li key='holofoil' className='section-title'>
                <span className='variant'>Holofoil</span>
                <div>
                  <button 
                    className='collection-btn' 
                    onClick={() => handleCollectionClick('remove', 'holofoil')}
                  >-</button>
                  <span className='variant variant-total'>
                    {displayQuantities('holofoil')}
                  </span>
                  <button 
                    className='collection-btn' 
                    onClick={() => handleCollectionClick('add', 'holofoil')}
                  >+</button>
                </div>
              </li>, 

              <li key='1stEditionHolofoil' className='section-title'>
              <span className='variant'>1st Edition Holofoil</span>
              <div>
                <button 
                  className='collection-btn' 
                  onClick={() => handleCollectionClick('remove', '1stEditionHolofoil')}
                >-</button>
                <span className='variant variant-total'>
                  {displayQuantities('1stEditionHolofoil')}
                </span>
                <button 
                  className='collection-btn' 
                  onClick={() => handleCollectionClick('add', '1stEditionHolofoil')}
                >+</button>
              </div>
            </li>, 

            <li key='1stEditionNormal' className='section-title'>
            <span className='variant'>1st Edition Normal</span>
            <div>
              <button 
                className='collection-btn' 
                onClick={() => handleCollectionClick('remove', '1stEditionNormal')}
              >-</button>
              <span className='variant variant-total'>
                {displayQuantities('1stEditionNormal')}
              </span>
              <button 
                className='collection-btn' 
                onClick={() => handleCollectionClick('add', '1stEditionNormal')}
              >+</button>
            </div>
          </li>, 
                ].filter(li => {
                  if (card.tcgplayer.prices.hasOwnProperty(li.key)) return true;
                })}
              </ul>
            : <ul>
                <li>Normal</li>
                <li>Reverse Holofoil</li>
                <li>Holofoil</li>
              </ul>
            }
        </div>


        {/* Prices Section */}
        <div className="card-info-prices bottom-border">
          <h2 className="price-header bold">Prices</h2>
          {card.tcgplayer
            ? <a href={card.tcgplayer.url} className='bold' target='_blank' rel="noreferrer">Buy Now From TCGPlayer</a>
            : <></>}
          <p className="update-date">Last Updated {card.tcgplayer.updatedAt}</p>

          {/* Check if card has TCGplayer section */}
          {card.tcgplayer.prices 
            ?<div className="pricing-container">
            {/* Renders the prices for each card price type found */}
            
            {card.tcgplayer.prices.normal 
            ? <div className="normal-price-container prices-container">
                <div>
                  <p className="price-title">Normal Market</p>
                  <p className="price price-market">
                    ${card.tcgplayer.prices.normal.market.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="price-title">Normal Low</p>
                  <p className="price price-low">
                    ${card.tcgplayer.prices.normal.low.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="price-title">Normal Mid</p>
                  <p className="price price-mid">
                    ${card.tcgplayer.prices.normal.mid.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="price-title">Normal High</p>
                  <p className="price price-high">
                    ${card.tcgplayer.prices.normal.high.toFixed(2)}
                  </p>
                </div>
              </div>
            : null}
            
            {card.tcgplayer.prices.holofoil 
            ? <div className="holofoil-price-container prices-container">
                <div>
                  <p className="price-title">Holofoil Market</p>
                  <p className="price price-market">
                    ${card.tcgplayer.prices.holofoil.market.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="price-title">Holofoil Low</p>
                  <p className="price price-low">
                    ${card.tcgplayer.prices.holofoil.low.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="price-title">Holofoil Mid</p>
                  <p className="price price-mid">
                    ${card.tcgplayer.prices.holofoil.mid.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="price-title">Holofoil High</p>
                  <p className="price price-high">
                    ${card.tcgplayer.prices.holofoil.high.toFixed(2)}
                  </p>
                </div>
              </div>
            : null}
            
            {card.tcgplayer.prices.reverseHolofoil 
            ? <div className="reverse-holofoil-price-container prices-container">
                <div>
                  <p className="price-title">Reverse Holofoil Market</p>
                  <p className="price price-market">
                    ${card.tcgplayer.prices.reverseHolofoil.market.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="price-title">Reverse Holofoil Low</p>
                  <p className="price price-low">
                    ${card.tcgplayer.prices.reverseHolofoil.low.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="price-title">Reverse Holofoil Mid</p>
                  <p className="price price-mid">
                    ${card.tcgplayer.prices.reverseHolofoil.mid.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="price-title">Reverse Holofoil High</p>
                  <p className="price price-high">
                    ${card.tcgplayer.prices.reverseHolofoil.high.toFixed(2)}
                  </p>
                </div>
              </div>
            : null}
            
            </div>
            : <span class="no-prices">No Prices Found</span>
          }
          
        </div>

        {/* Card Details Section */}
        <div className="card-info-details">
          {card.abilities
          ? <div className="card-abilities info-section">
              <p className="section-title">Abilities</p>
              <ul className="card-info-list">
                {abilities}
              </ul>
            </div>
          : <></>
          }

          {card.attacks
          ? <div className="card-attacks info-section">
              <p className="section-title">Attacks</p>
              <ul className="card-info-list">
                {attacks}
              </ul>
            </div>
          : <></>
          }

          {card.rules
          ? <div className="card-rules info-section">
              <p className="section-title">Rules</p>
              <ul className="card-info-list">{rules}</ul>
            </div>
          : <></>
          }
          
          <div className="bottom-border"></div>

          <div className="card-misc-info">
            <div className="info-line1 info-line section-title">
              <div className="weakness-container">
                <p>Weakness</p>
                {card.weaknesses 
                  ? <ul>{card.weaknesses.map((item) => <li><img className="type-image" src={getTypeImage(item.type)} alt={item.type}/><span className="type-value">{item.value}</span></li>)}</ul> 
                  : <p>N/A</p>
                }
              </div>

              <div className="resistance-container">
                <p>Resistance</p>
                {card.resistances 
                  ? <ul id="resistance-list">{card.resistances.map((item) => <li><img className="type-image" src={getTypeImage(item.type)} alt={item.type}/><span className="type-value">{item.value}</span></li>)}</ul> 
                  : <p>N/A</p>
                }
              </div>

              <div className="retreat-cost-container">
                <p>Retreat Cost</p>
                {card.retreatCost 
                  ? <ul>{card.retreatCost.map((item) => <li><img className="type-image" src={getTypeImage(item)} alt={item}/></li>)}</ul> 
                  : <p>N/A</p>
                }
              </div>
            </div>

            <div className="info-line2 info-line">
              <div className="center-text">
                <p>Artist</p>
                {card.artist ? card.artist : "N/A"}
              </div>
              <div className="center-text">
                <p>Rarity</p>
                {card.rarity}
              </div>
              <div className="center-text">
                <p>Set</p>
                <div className="card-set-container link"
                  onClick={() => navigate(`/set/${card.set.id}`, {state:{set: card.set}})}
                >
                  <span>{card.set.name}</span>
                  <img src={card.set.images.symbol} alt="" width="30px"/>
                </div>
              </div>
            </div>

            <div>
              <div className="card-number-container center-text">
                <p>Number</p>
                <p>{card.number} / {card.set.printedTotal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card