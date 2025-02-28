// Page that displays the detailed information for a specific card

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { getTypeImage } from '../utils/getTypeImage';
import { formatLabel } from '../utils/formatLabel';
import { getCard } from '../utils/fetchData';
import checkmark from '../assets/check-circle-solid-48.png';

import CardCollectionSection from '../components/CardCollectionSection';
import CardInfoPrices from '../components/CardInfoPrices';
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
        <CardInfoPrices />

        <CardInfoDetails card={card} />
        
      </div>
    </div>
  )
}

export default Card