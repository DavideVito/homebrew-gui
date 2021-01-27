import React, { useState } from 'react';

import { useContext } from 'react';

import { SelectedBrewsContext } from '../Contexts/selectedBrew.context';

import BrewCard from '../Brews/Brew';

import { Grid } from '@material-ui/core';

import { Link } from 'react-router-dom';

const Queue = () => {
  let [selectedBrews, setSelectedBrews] = useContext(SelectedBrewsContext);

  React.useEffect(() => {
    console.log('queue');
  }, []);

  if (selectedBrews.length !== 0) {
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {selectedBrews.map((brew) => {
            return (
              <React.Fragment key={brew.token}>
                <Grid item xs>
                  <BrewCard name={brew.name[0]} desc={brew.desc} brew={brew} />
                </Grid>
                <div style={{ marginLeft: '10px' }}></div>
              </React.Fragment>
            );
          })}
        </Grid>
      </div>
    );
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        You didn't select any brew to install, pls go back to{' '}
        <Link to="/">Home</Link> and add some fresh packages
      </Grid>
    </div>
  );
};

export default Queue;
