import { useState, useEffect, useRef, useCallback } from 'react';
import { getCardsBySearch, getCardsBySet, getCardById } from '../utils/fetchData';
import { setCollected } from '../utils/setcollected';

export const useCards = (user) => {
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(-1);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use ref to always have current user value
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
    console.log('User ref updated to:', user);
  }, [user]);

  // Apply collection function - doesn't depend on cards
  const applyCollection = useCallback((cardArray) => {
    console.log('applyCollection called with:', cardArray?.length || 0, 'cards');
    console.log('Current user:', userRef.current);
    
    const currentUser = userRef.current;
    
    if (currentUser && currentUser.collection && cardArray) {
      console.log('Applying collection for user');
      let collectedCards = setCollected(cardArray, currentUser.collection);
      setCards(collectedCards);
    } else if (cardArray) {
      console.log('No user or collection, setting cards directly');
      setCards(cardArray);
    }
    // If cardArray is undefined, don't do anything
  }, []); // Empty dependencies - uses refs only

  const getAllSetCards = useCallback(async (setId) => {
    console.log('getAllSetCards called for setId:', setId);
    setCards([]);
    let allCards = await getCardsBySet(setId);
    console.log('Fetched', allCards.length, 'cards');
    applyCollection(allCards);
  }, [applyCollection]);

  const getCards = useCallback(async (search, page = 1) => {
    console.log('getCards called for search:', search, 'page:', page);
    setCards([]);
    setCardCount(-1);

    const result = await getCardsBySearch(search, page);

    if ('error' in result) {
      console.error('Error with searching cards.');
    } else {
      console.log('Search result:', result.totalCount, 'total cards');
      setCardCount(result.totalCount);
      setPages(Math.ceil(result.totalCount / result.pageSize));
      setCurrentPage(result.page);
      applyCollection(result.data);
    }
  }, [applyCollection]);

  const getCard = useCallback(async (id) => {
    console.log("getCard called for id:", id);
    console.log("Current user in getCard:", userRef.current);
    
    let card = await getCardById(id);
    if (card.error) {
      console.log("Card.error", card.error);
      applyCollection([]);
      return { error: card.error };
    }
    
    console.log("Card fetched successfully:", card.name);
    applyCollection([card]);
    return card;
  }, [applyCollection]);

  const clearCards = useCallback(() => {
    console.log('clearCards called');
    setCards([]);
    setCardCount(-1);
  }, []);

  // Update collection when user changes (if we have cards)
  useEffect(() => {
    console.log('useEffect: User changed to', user);
    console.log('Current cards length:', cards.length);
    
    // Only re-apply collection if we have cards AND user changed meaningfully
    if (cards.length > 0) {
      console.log('Re-applying collection for', cards.length, 'cards');
      
      // Create a copy to avoid infinite loop
      const currentCards = [...cards];
      
      // Re-apply collection with current cards
      const currentUser = userRef.current;
      if (currentUser && currentUser.collection) {
        console.log('Re-applying user collection');
        let collectedCards = setCollected(currentCards, currentUser.collection);
        setCards(collectedCards);
      }
      // If no user, cards stay as they are (no need to reset)
    }
  }, [user]); // Only depend on user, not cards

  return { 
    cards, 
    setCards, 
    cardCount, 
    pages, 
    currentPage, 
    getCards, 
    getCard, 
    getAllSetCards, 
    clearCards 
  };
};