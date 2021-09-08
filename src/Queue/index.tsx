import React, { useContext } from 'react';

import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { SelectedBrewsContext } from '../Contexts/selectedBrew.context';
import { InstallingContext } from '../Contexts/installProgress.context';
import BrewCard from '../Brews/BrewCard';

import BarraLaterale from '../Util/BarraLaterale';

import { install } from '../Util/Commands';

const Queue = () => {
  const [selectedBrews] = useContext(SelectedBrewsContext);

  const [installingBrew, setIsInstalling] = useContext(InstallingContext);

  const installAll = () => {
    const br = selectedBrews.reduce((acc, cur) => {
      if (acc.token) return `${acc.token} ${cur.token} `;
      return `${acc + cur.token} `;
    });
    const comando = install(br);

    setIsInstalling(null !== null);
  };

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
                  <div style={{ marginLeft: '10px' }} />
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
