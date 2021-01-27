import React, {
  useState,
  createContext
} from "react";

export const BrewsContext = createContext();

export const BrewsProvider = props => {
  let [brews, setBrews] = useState([]);

  return ( <
    BrewsContext.Provider value = {
      [brews, setBrews]
    } > {
      " "
    } {
      props.children
    } {
      " "
    } <
    /BrewsContext.Provider>
  );
};
