import React from 'react';
import { useUser } from '../hooks/useUser';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { user, setUser, checkingUser } = useUser();
  
  return (
    <UserContext.Provider value={{ user, setUser, checkingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;