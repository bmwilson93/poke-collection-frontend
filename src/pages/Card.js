// Page that displays the detailed information for a specific card

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import { getTypeImage } from '../utils/getTypeImage';
import { formatLabel } from '../utils/formatLabel';
import checkmark from '../assets/check-circle-solid-48.png';

import CardCollectionSection from '../components/CardCollectionSection';

import './Card.css';

const Card = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [card, setCard] = useState(location.state.card)
  
  
  // Get window size for rendering collection section
  const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }
  
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  
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

  const subtypes = card.subtypes ? card.subtypes.map((item) => <span key={item.id}>{item} </span>) : <></>

  
  return (
    <div className="card-container">

      {/* Collection Section - Only shows if screen is smaller than 820px wide */}
      {user && windowSize.innerWidth <= 820
        ? <CardCollectionSection 
            card={card} 
            setUser={setUser}
            setCard={setCard}
          />
        : <></>
      }
      
      {/* Card Image */}
      <div className="image-container">
        <img className="card-image" src={card.images.large} alt={card.name}/>

        {/* Checkmark for collected card */}
        {card.collected 
        ? <img src={checkmark} alt={''} className='checkmark-card'/>
        : <></>}
      </div>

      <div id='back-btn'>
      <button onClick={() => navigate(-1)}>&lt; Back to Cards</button>
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

        {/* Card Collection Section */}
        {user && windowSize.innerWidth > 820
        ? <CardCollectionSection 
            card={card} 
            setUser={setUser}
            setCard={setCard}
          />
        : <></>
      }

        {/* Prices Section */}
        <div className="card-info-prices bottom-border">
          <h2 className="price-header bold">Prices</h2>
          {card.tcgplayer
            ? <a href={card.tcgplayer?.url} className='bold' target='_blank' rel="noreferrer">Buy Now From TCGPlayer</a>
            : <></>}
          <p className="update-date">Last Updated {card.tcgplayer?.updatedAt}</p>

          {/* Check if card has TCGplayer section */}
          {card.tcgplayer?.prices 
            ?<div className="pricing-container">
            {/* Renders the prices for each card price type found */}
            {Object.keys(card.tcgplayer?.prices || {}).map(key => (
                <div className={`${key}-price-container prices-container`}>
                  <div>
                    <p className="price-title">{formatLabel(key)} Market</p>
                    <p className="price price-market">
                      ${card.tcgplayer?.prices[key].market?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="price-title">{formatLabel(key)} Low</p>
                    <p className="price price-low">
                    ${card.tcgplayer?.prices[key].low?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="price-title">{formatLabel(key)} Mid</p>
                    <p className="price price-mid">
                    ${card.tcgplayer?.prices[key].mid?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="price-title">{formatLabel(key)} High</p>
                    <p className="price price-high">
                    ${card.tcgplayer?.prices[key].high?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            }      
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