import React from 'react';
import { useCards } from '../hooks/useCards';

const CardContext = React.createContext();

export const CardProvider = ({ user, children }) => {
  const { cards, setCards, cardCount, setCardCount, pages, setPages, currentPage, setCurrentPage, getAllSetCards, searchCards } = useCards(user);
  
  return (
    <CardContext.Provider value={{ cards, setCards, cardCount, setCardCount, pages, setPages, currentPage, setCurrentPage, getAllSetCards, searchCards }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;