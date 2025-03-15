import { useState, useEffect } from 'react'

export const useUser = () => {
  const [user, setUser] = userState(null);
  const [checkingUser, setcheckingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_PATH}/isloggedin`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'GET',
          credentials: "include",
          withCredentials: true
        });

        if (response.status === 200) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
      setCheckingUser(false);
    }
  })
}