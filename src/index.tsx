import React, { useContext, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrewsContext, BrewsProvider } from './Contexts/brews.context';
import App from './App';
import Brew from './Brews/Brew';

const Init = () => {
  const [brews, setBrews] = useState({});

  const fetchJson = async () => {
    const ris = await fetch('https://formulae.brew.sh/api/cask.json');
    const data = await ris.json();

    const daMettere = {};

    data.forEach((br: any) => {
      daMettere[br.token] = new Brew(br.name[0], br.desc, br.token);
    });

    setBrews(daMettere);
  };

  useEffect(() => {
    fetchJson();
  }, []);

  if (Object.keys(brews).length === 0) {
    return <div>Loading...</div>;
  }

  return <App brews={brews} />;
};

render(
  <>
    <BrewsProvider>
      <Init />
    </BrewsProvider>
  </>,
  document.getElementById('root')
);
