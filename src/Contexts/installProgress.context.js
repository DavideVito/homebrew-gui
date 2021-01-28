import React, {
  useState,
  createContext
} from "react";

export const InstallingContext = createContext();

export const InstallingProvider = props => {
  let [installing, setInstalling] = useState([]);

  return ( <
    InstallingContext.Provider value = {
      [installing, setInstalling]
    } > {
      " "
    } {
      props.children
    } {
      " "
    } <
    /InstallingContext.Provider>
  );
};
