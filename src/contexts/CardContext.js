import React from 'react';
import { useCards } from '../hooks/useCards';

const CardContext = React.createContext();

export const CardProvider = ({ user, children }) => {
  const { 
    cards, 
    setCards, 
    cardCount, 
    setCardCount, 
    pages, 
    setPages, 
    currentPage, 
    setCurrentPage, 
    getAllSetCards, 
    getCards 
  } = useCards(user);
  
  return (
    <CardContext.Provider value={{ 
      cards, 
      setCards, 
      cardCount, 
      setCardCount, 
      pages, 
      setPages, 
      currentPage, 
      setCurrentPage, 
      getAllSetCards, 
      getCards 
    }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;