import { useState, useEffect, useRef } from 'react'
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


  const requestQueue = useRef([]);
  const isProcessing = useRef(false);
  
  const processQueue = async () => {
    // Skip if already processing or queue is empty
    if (isProcessing.current || requestQueue.current.length === 0) return;
    
    isProcessing.current = true;
    const request = requestQueue.current.shift(); // Get next request
    
    try {
      const body = JSON.stringify({
        card_id: request.cardId,
        set_id: request.setId,
        variant: request.variant
      });
      const response = await fetchAPI(`collection/${request.action}`, 'POST', body);
      if (response.user) setUser(response.user);
    } finally {
      isProcessing.current = false;
      processQueue(); // Process next item
    }
  };
  
  const updateCollection = async (cardId, setId, action, variant) => {
    requestQueue.current.push({ cardId, setId, action, variant });
    console.log(requestQueue.current.length);
    processQueue();
  }

  return { user, setUser, checkingUser, updateCollection};
};