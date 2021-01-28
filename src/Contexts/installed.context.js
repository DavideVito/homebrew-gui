import React, {
  useState,
  createContext
} from "react";

export const InstalledContext = createContext();

export const InstalledProvider = props => {
  let [installed, setInstalled] = useState([]);

  return ( <
    InstalledContext.Provider value = {
      [installed, setInstalled]
    } > {
      " "
    } {
      props.children
    } {
      " "
    } <
    /InstalledContext.Provider>
  );
};
