// Page that displays the detailed information for a specific card

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { getTypeImage } from '../utils/getTypeImage';
import { formatLabel } from '../utils/formatLabel';
import { getCard } from '../utils/fetchData';
import checkmark from '../assets/check-circle-solid-48.png';

import CardCollectionSection from '../components/CardCollectionSection';
import CardInfoDetails from '../components/CardInfoDetails';

import './Card.css';

const Card = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const getTheCard = async () => {
    console.log("get the card")
    const response = await getCard(id);
    console.log(response);
    if ('error' in response) {
      console.log("found an error");
    } else {
      navigate(`/card/${response.data.id}`, {state:{card: response.data}})
      navigate(0);
    }

  }

  const [card, setCard] = useState(location?.state?.card || {})
  
  
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

  useEffect(() => {
    console.log("fresh load")

    if (!card.id) {
      getTheCard();
    }
  },[])

  const subtypes = card?.subtypes ? card?.subtypes.map((item) => <span key={item.id}>{item} </span>) : <></>

  
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

      <div id='back-btn'>
        <button onClick={() => navigate(`/set/${card?.set?.id}`, {state:{set: card?.set}})}>&lt; Back to Cards</button>
      </div>
      
      {/* Card Image */}
      <div className="image-container">
        <img className="card-image" src={card?.images?.large} alt={card?.name}/>

        {/* Checkmark for collected card */}
        {card?.collected 
        ? <img src={checkmark} alt={''} className='checkmark-card'/>
        : <></>}
      </div>

      

      {/* Card Info */}
      <div className="card-info-container">

        {/* Card Title Section */}
        <div className="card-info-title bottom-border">
          <div className="card-name-container">
            <h1 className="card-name">{card.name}</h1>
            
            <span className="card-type">
              {card?.supertype} {card?.subtypes ?  <> - {subtypes}</> : ""}
            </span>
          
          </div>
          <div className="card-hp-container">
            {card?.hp 
              ? <span className="card-hp">HP {card?.hp}</span>
              : null
            }
            {card?.types 
              ? <img className="type-image"src={getTypeImage(card?.types[0])} alt=""/>
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
          {card?.tcgplayer
            ? <a href={card?.tcgplayer?.url} className='bold' target='_blank' rel="noreferrer">Buy Now From TCGPlayer</a>
            : <></>}
          <p className="update-date">Last Updated {card?.tcgplayer?.updatedAt}</p>

          {/* Check if card has TCGplayer section */}
          {card?.tcgplayer?.prices 
            ?<div className="pricing-container">
            {/* Renders the prices for each card price type found */}
            {Object.keys(card?.tcgplayer?.prices || {}).map(key => (
                <div className={`${key}-price-container prices-container`}>
                  <div>
                    <p className="price-title">{formatLabel(key)} Market</p>
                    <p className="price price-market">
                      ${card?.tcgplayer?.prices[key].market?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="price-title">{formatLabel(key)} Low</p>
                    <p className="price price-low">
                    ${card?.tcgplayer?.prices[key].low?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="price-title">{formatLabel(key)} Mid</p>
                    <p className="price price-mid">
                    ${card?.tcgplayer?.prices[key].mid?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="price-title">{formatLabel(key)} High</p>
                    <p className="price price-high">
                    ${card?.tcgplayer?.prices[key].high?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            }      
            </div>
            : 
            card?.cardmarket?.prices
            ? <div>
              <p className='price-title'>Average Sell Price</p>
              <p className='price price-market'>${card?.cardmarket?.prices?.averageSellPrice.toFixed(2)}</p>
            </div>
            : <span class="no-prices">No Prices Found</span>
          }
          
        </div>

        {/* Card Details Section */}
        <CardInfoDetails card={card} />
        
      </div>
    </div>
  )
}

export default Card