import React, { useContext } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.global.css';
import { BrewsProvider } from './Contexts/app.context';
import { BrewsContext } from './Contexts/app.context';
import { InstallingProvider } from './Contexts/installProgress.context';
import { InstalledProvider } from './Contexts/installed.context';
import { InstalledContext } from './Contexts/installed.context';
import { SearchedProvider } from './Contexts/searchedText.context';
import { SelectedBrewsProvider } from './Contexts/selectedBrew.context';

import { installati as checkInstallati } from './Util/Commands';

import Brews from './Brews';

import BarraLaterale from './Util/Appbar';
import Queue from './Queue';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Home = () => {
  const [brews, setBrews] = useContext(BrewsContext);
  const [installed, setInstalled] = useContext(InstalledContext);

  const classes = useStyles();
  const theme = useTheme();

  const fetchJson = async () => {
    let ris = await fetch('https://formulae.brew.sh/api/cask.json');
    let data = await ris.json();

    setBrews(data);
  };

  useEffect(() => {
    let installati = checkInstallati();

    setInstalled(installati);
  }, []);

  useEffect(() => {
    fetchJson();

    return () => {
      setBrews([]);
    };
  }, []);

  return (
    <>
      <div>
        <BarraLaterale />
      </div>

      <div style={{ marginLeft: '150px', overflow: 'auto' }}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Brews />
        </main>
      </div>
    </>
  );
};

export default function App() {
  return (
    <BrewsProvider>
      <SelectedBrewsProvider>
        <InstallingProvider>
          <InstalledProvider>
            <SearchedProvider>
              <Router>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/Queue" exact component={Queue} />
                </Switch>
              </Router>
            </SearchedProvider>
          </InstalledProvider>
        </InstallingProvider>
      </SelectedBrewsProvider>
    </BrewsProvider>
  );
}
//<Route path="/Queue" exact component={Queue} />
