// Page that displays the detailed information for a specific card

import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import CardContext from '../contexts/CardContext';

import { getTypeImage } from '../utils/getTypeImage';
import checkmark from '../assets/check-circle-solid-48.png';

import CardCollectionSection from '../components/CardCollectionSection';
import CardInfoPrices from '../components/CardInfoPrices';
import CardInfoDetails from '../components/CardInfoDetails';
import Loading from '../components/Loading';

import './Card.css';

const Card = () => {
  const { user } = useContext(UserContext);
  const { cards, getCard } = useContext(CardContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const [card, setCard] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //Window Size
  // Get window size for rendering collection section
  const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  const [windowSize, setWindowSize] = useState(getWindowSize());

  // Tracks the window size to correctly display the collection buttons
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  // END Window Size


  useEffect(() => {
    const findCard = async () => {
      // on load, find the card in the cards state using the id from the params
      const cardData = cards.find(card => card?.id === id);
      if (cardData) {
        setCard(cardData);
      } else { // card isn't in the cards state, fetch the card directly
        setLoading(true);
        let response = await getCard(id);
        if (response.error) {
          setError(true);
        }
        setLoading(false);
      }
    }

    findCard();

  },[])

  useEffect(() => {
    if (!card.id) {
      const cardData = cards.find(card => card?.id === id);
      if (cardData) {
        setCard(cardData);
      }
    }
  }, [cards])

  const subtypes = card?.subtypes ? card?.subtypes.map((item) => <span key={item.id}>{item} </span>) : <></>

  
  return (
    <div className="card-container">

      {loading ? 
      <div className="loading"><Loading></Loading></div>
      : error ?
        <div className="full-height center">
          <h2>There was an issue with loading the card</h2>
        </div> 
      :
      <>

        {/* Collection Section - Only shows if screen is smaller than 820px wide */}
        {user && windowSize.innerWidth <= 820
          ? <CardCollectionSection 
              card={card} 
              setCard={setCard}
            />
          : <></>
        }

        <div id='back-btn'>
          <button onClick={() => navigate(`/set/${card?.expansion?.id}`)}>&lt; Back to Cards</button>
        </div>
        
        {/* Card Image */}
        <div className="image-container">
          <img className="card-image" src={card?.images?.[0]?.large} alt={card?.name}/>

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

          {/* ollection Section - Only shows if screen is larger than 820px wide */}
          {user && windowSize.innerWidth > 820
          ? <CardCollectionSection 
              card={card} 
              setCard={setCard}
            />
          : <></>
        }

          <CardInfoPrices card={card}/>
          <CardInfoDetails card={card} />
          
        </div>

      </>}

    </div>
  )
}

export default Card