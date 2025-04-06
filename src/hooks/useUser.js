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

  return { user, setUser, checkingUser};
};