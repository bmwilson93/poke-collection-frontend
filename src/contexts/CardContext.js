import React from 'react';
import { useCards } from '../hooks/useCards';

const CardContext = React.createContext();

export const CardProvider = ({ user, children }) => {
  const { 
    cards, 
    cardCount, 
    pages, 
    currentPage, 
    getAllSetCards, 
    getCards,
    getCard,
    clearCards 
  } = useCards(user);
  
  return (
    <CardContext.Provider value={{ 
      cards, 
      cardCount, 
      pages, 
      currentPage, 
      getCards,
      getCard,
      getAllSetCards,
      clearCards
    }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;