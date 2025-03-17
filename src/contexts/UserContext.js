import React, { useState } from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  
  return (
    <UserContext.Provider value={''}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;