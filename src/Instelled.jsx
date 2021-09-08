import React, { useContext, useEffect, useState } from 'react';
import { BrewsContext } from './Contexts/brews.context';
import BarraLaterale from './Util/BarraLaterale';
import { installati as getInstallati } from './Util/Commands';

export default function Installed() {
  const [brews] = useContext(BrewsContext);
  const [installati, setInstallati] = useState({});

  useEffect(() => {
    let installati = getInstallati();

    let daMettere = {};

    installati.forEach((installatoString) => {
      let brew = brews[installatoString];
      daMettere[installatoString] = brew;
    });

    setInstallati(daMettere);
  }, []);
  return (
    <>
      <BarraLaterale />

      {Object.keys(installati).map((stringBrew) => {
        return <div key={stringBrew}>{installati[stringBrew].token}</div>;
      })}
    </>
  );
}
