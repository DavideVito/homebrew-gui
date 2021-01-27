import React, {
  useState,
  createContext
} from "react";

export const SelectedBrewsContext = createContext();

export const SelectedBrewsProvider = props => {
  let [selectedBrews, setSelectedBrews] = useState([]);

  return ( <
    SelectedBrewsContext.Provider value = {
      [selectedBrews, setSelectedBrews]
    } > {
      " "
    } {
      props.children
    } {
      " "
    } <
    /SelectedBrewsContext.Provider>
  );
};
