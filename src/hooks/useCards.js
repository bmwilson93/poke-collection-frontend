import { useState, useEffect } from 'react';
import { getCardsBySearch, getCardsBySet, getCardById } from '../utils/fetchData';
import { setCollected } from '../utils/setcollected';

export const useCards = (user) => {
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(-1);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const applyCollection = (cardArray = cards) => {
    if (user) {
      let collectedCards = setCollected(cardArray, user.collection);
      setCards(collectedCards);
    } else {
      setCards(cardArray);
    }
  };

  const getAllSetCards = async (setId) => {
    setCards([]);
    let allCards = [];
    allCards = await getCardsBySet(setId);
    applyCollection(allCards);
  }

  const getCards = async (search, page = 1) => {
    setCards([]);
    setCardCount(-1);

    const result = await getCardsBySearch(search, page);

    if ('error' in result) {
      console.error('Error with searching cards.');
    } else {
      setCardCount(result.totalCount);
      setPages(Math.ceil(result.totalCount / result.pageSize));
      setCurrentPage(result.page);
      applyCollection(result.data);
    }
  };

  const getCard = async (id) => {
    let card = await getCardById(id);
    if (card.error) {
      applyCollection([]);
      return card;
    }
    applyCollection([card]);
    return card;
  }

  const clearCards = () => {
    setCards([]);
    setCardCount(-1);
  }

  useEffect(() => applyCollection(), [user]);

  return { cards, setCards, cardCount, pages, currentPage, getCards, getCard, getAllSetCards, clearCards };
};