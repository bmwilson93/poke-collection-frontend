import { useState, useEffect } from 'react';
import { getCardsBySearch } from '../utils/fetchData';
import { setCollected } from '../utils/setcollected';

export const useCards = (user) => {
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(-1);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
};