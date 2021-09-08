import React, { useContext, useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

import './App.global.css';

import { makeStyles } from '@material-ui/core/styles';
import { LineType } from 'react-terminal-ui';
import { BrewsProvider, BrewsContext } from './Contexts/brews.context';

import { InstallingProvider } from './Contexts/installProgress.context';
import {
  InstalledProvider,
  InstalledContext,
} from './Contexts/installed.context';

import { SearchedProvider } from './Contexts/searchedText.context';
import {
  SelectedBrewsContext,
  SelectedBrewsProvider,
} from './Contexts/selectedBrew.context';

import { installati as checkInstallati, run } from './Util/Commands';

import Brews from './Brews';

import BarraLaterale from './Util/BarraLaterale';
import Queue from './Queue';

import { CommandsProvider } from './Contexts/command.context';
import Installed from './Instelled';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Home = ({ brews }) => {
  const setInstalled = useContext(InstalledContext)[1];

  const [selectedBrews] = useContext(SelectedBrewsContext);

  const [comando, setComando] = useState('');

  useEffect(() => {
    const s = `brew install --cask ${selectedBrews.reduce((acc, val) => {
      return `${acc + val.token} `;
    }, '')}`;

    setComando(s);
  }, [selectedBrews]);

  const classes = useStyles();

  useEffect(() => {
    const installati = checkInstallati();
    setInstalled(installati);
  }, []);

  return (
    <>
      <div>
        <BarraLaterale />
      </div>

      <div style={{ marginLeft: '150px', overflow: 'auto' }}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Brews brews={brews} />
          <div style={{ width: '100%', maxHeight: '150px', marginTop: '15px' }}>
            {comando.length > 21 ? (
              <>
                <Typography variant="h6" component="pre">
                  {comando}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    run(comando);
                  }}
                >
                  run
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default function App({ brews }) {
  return (
    <CommandsProvider>
      <SelectedBrewsProvider>
        <InstallingProvider>
          <InstalledProvider>
            <SearchedProvider>
              <Router>
                <Switch>
                  <Route path="/" exact>
                    <Home brews={brews} />
                  </Route>
                  <Route path="/installed" exact component={Installed} />
                  <Route path="/Queue" exact component={Queue} />
                </Switch>
              </Router>
            </SearchedProvider>
          </InstalledProvider>
        </InstallingProvider>
      </SelectedBrewsProvider>
    </CommandsProvider>
  );
}
// <Route path="/Queue" exact component={Queue} />
