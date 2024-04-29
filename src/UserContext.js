// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginUsername, setLoginUsername] = useState('');

  return (
    <UserContext.Provider value={{ loginUsername, setLoginUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
