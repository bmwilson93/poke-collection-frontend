import { useState, useEffect } from 'react'

export const useUser = () => {
  const [user, setUser] = userState(null);
  const [checkingUser, setcheckingUser] = useState(true);

  
}