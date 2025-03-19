import React from 'react';
import { useCards } from '../hooks/useCards';

const CardContext = React.createContext();

export const CardProvider = ({ children }) => {
  const { cards, setCards, cardCount, setCardCount, pages, setPages, currentPage, setCurrentPage } = useCards();
  
  return (
    <CardContext.Provider value={{ cards, setCards, cardCount, setCardCount, pages, setPages, currentPage, setCurrentPage }}>
      {children}
    </CardContext.Provider>
  );
};

export default UserContext;