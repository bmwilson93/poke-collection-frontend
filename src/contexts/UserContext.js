import React from 'react';
import { useUser } from '../hooks/useUser';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { user, setUser, checkingUser, updateCollection } = useUser();
  
  return (
    <UserContext.Provider value={{ user, setUser, checkingUser, updateCollection }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;