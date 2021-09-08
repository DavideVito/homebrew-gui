import React, { useState, createContext } from 'react';

export const SearchedContext = createContext();

export const SearchedProvider = (props) => {
  let [Searched, setSearched] = useState('');

  return (
    <SearchedContext.Provider value={[Searched, setSearched]}>
      {props.children}
    </SearchedContext.Provider>
  );
};
