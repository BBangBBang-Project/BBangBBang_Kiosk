// ResultContext.js
import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();

export const useResult = () => useContext(ResultContext);

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState('');
  

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};
