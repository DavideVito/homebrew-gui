import React, { useState, createContext } from 'react';

export const CommandsContext = createContext();

export const CommandsProvider = (props) => {
  let [command, setCommand] = useState('');

  return (
    <CommandsContext.Provider value={[command, setCommand]}>
      {props.children}
    </CommandsContext.Provider>
  );
};
