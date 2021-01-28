import React, { useState } from 'react';

import { useContext } from 'react';

import { SelectedBrewsContext } from '../Contexts/selectedBrew.context';
import { InstallingContext } from '../Contexts/installProgress.context';
import BrewCard from '../Brews/Brew';

import BarraLaterale from '../Util/Appbar';

import { Grid, Button } from '@material-ui/core';

import { install } from '../Util/Commands';

import { Link } from 'react-router-dom';

const Queue = () => {
  let [selectedBrews] = useContext(SelectedBrewsContext);

  let [installingBrew, setIsInstalling] = useContext(InstallingContext);

  const installAll = () => {
    let br = selectedBrews.reduce((acc, cur) => {
      if (acc.token) return acc.token + ' ' + cur.token + ' ';
      return acc + cur.token + ' ';
    });
    let comando = install(br);

    setIsInstalling(null !== null);
  };

  React.useEffect(() => {
    console.log('queue');
  }, []);

  return (
    <div>
      <BarraLaterale />

      {selectedBrews.length !== 0 ? (
        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {selectedBrews.map((brew) => {
              return (
                <React.Fragment key={brew.token}>
                  <Grid item xs>
                    <BrewCard
                      name={brew.name[0]}
                      desc={brew.desc}
                      brew={brew}
                    />
                  </Grid>
                  <div style={{ marginLeft: '10px' }}></div>
                </React.Fragment>
              );
            })}
          </Grid>

          <Button variant="contained" color="primary" onClick={installAll}>
            Install all
          </Button>
        </div>
      ) : (
        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            You didn't select any brew to install, pls go back to the home and
            add something to the list
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Queue;
