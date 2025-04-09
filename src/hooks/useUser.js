import { useState, useEffect } from 'react'
import { fetchAPI } from '../utils/fetchAPI';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchAPI('isloggedin', 'GET', null);
      
      if (response.user) {
        setUser(response.user);
      }

      setCheckingUser(false);
    }

    fetchUser();
  }, []);


  let requestQueue = [];
  let isProcessing = false;

  const processQueue = async () => {
    if (isProcessing || requestQueue.length === 0) return;
    
    isProcessing = true;
    const { cardId, setId, action, variant } = requestQueue.shift(); // Get next request
    
    try {
      const body = JSON.stringify({
        card_id: cardId,
        set_id: setId,
        variant: variant
      });
      const response = await fetchAPI(`collection/${action}`, 'POST', body);
      if (response.user) setUser(response.user);
    } finally {
      isProcessing = false;
      processQueue(); // Process next item
    }
  };

  const updateCollection = async (cardId, setId, action, variant) => {
    requestQueue.push({ cardId, setId, action, variant });
    processQueue();
  }

  return { user, setUser, checkingUser, updateCollection};
};