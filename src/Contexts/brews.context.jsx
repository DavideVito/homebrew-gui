import React, { useState, createContext } from 'react';

export const BrewsContext = createContext();

export const BrewsProvider = (props) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [brews, _setBrews] = useState([]);

  const setBrews = (br) => {
    _setBrews(br);
  };

  return (
    <BrewsContext.Provider value={[brews, setBrews]}>
      {props.children}
    </BrewsContext.Provider>
  );
};
