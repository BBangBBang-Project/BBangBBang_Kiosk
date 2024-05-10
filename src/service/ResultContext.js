// ResultContext.js
import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();

export const useResult = () => useContext(ResultContext);

export const ResultProvider = ({children}) => {
  const [result, setResult] = useState('');
  const [isRecording, setIsRecording] = React.useState(false); //색 변경 위해 추가


  return (
    <ResultContext.Provider
      value={{result, setResult, isRecording, setIsRecording}}>
      {children}
    </ResultContext.Provider>
  );
};
