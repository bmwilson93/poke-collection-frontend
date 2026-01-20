import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

import Loading from '../components/Loading';

const Incoming = () => {
  const { user, setUser, checkingUser } = useContext(UserContext);
  const navigate = useNavigate();

  const getIncomingCards= (collection) => {
    const incomingCards = [];
    if (!collection || !collection.sets || !Array.isArray(collection.sets)) {
      return incomingCards;
    }
    collection.sets.forEach(set => {
      if (set.cards && Array.isArray(set.cards)) {
        set.cards.forEach(card => {
          if (card.hasOwnProperty('incoming')) {
            incomingCards.push(card);
          }
        });
      }
    });
    return incomingCards;
  }


  return (
    <div className='full-height'>
      {!user
        ? checkingUser
            ? <Loading />
            : <div>
                Sign into your account to view your incoming cards.
                <button onclick={navigate('/login')}>Sign In</button>
              </div>
        : <div className="card-list-container">
            <h2 style={{'margin-bottom': '50px'}}>Your Incoming Cards</h2>
            <ul className="card-list">
              {getIncomingCards(user.collection).map(card => (
                <li 
                  key={card?.card_id}
                  onClick={() => {
                    navigate(`/card/${card.card_id}`)
                  }}
                  style={{'cursor': 'pointer'}}
                  className='hover-grow'
                >
                  <img 
                    src={card?.incoming?.card_image}
                    className="cardlist-image"
                    loading='lazy'
                  />
                </li>
              ))}
            </ul>
          </div>
      }
    </div>
  )
}

export default Incoming