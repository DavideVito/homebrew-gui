import React, { useState } from 'react';

import { useContext } from 'react';

import { BrewsContext } from '../Contexts/app.context';

import BrewCard from './Brew';

import { Grid, Button } from '@material-ui/core';

const Brews = () => {
  let [brews] = useContext(BrewsContext);

  let [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {brews.splice(currentIndex, 5).map((brew) => {
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
      <div style={{ marginTop: '20px' }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setCurrentIndex(currentIndex - 20);
          }}
        >
          Previous {20}
        </Button>

        <Button
          style={{ marginLeft: '25px' }}
          color="primary"
          variant="contained"
          onClick={() => {
            setCurrentIndex(currentIndex + 20);
          }}
        >
          Next {20}
        </Button>
      </div>
    </div>
  );
};

export default Brews;
