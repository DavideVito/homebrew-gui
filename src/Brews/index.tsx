import React, { useState, useContext } from 'react';

import { Grid, Button } from '@material-ui/core';

import PropTypes from 'prop-types';
import BrewCard from './BrewCard';

import { SearchedContext } from '../Contexts/searchedText.context';
import { Brew } from './Brew';

const Brews = (props): JSX.Element => {
  const [brews] = useState(props.brews);

  const [text] = useContext(SearchedContext);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (brews == null) {
    return <div>Loading..</div>;
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {Object.keys(brews)
          .filter((brewString) => {
            const brew = brews[brewString];

            const a = brew.token.startsWith(text);
            const b = brew.name[0].startsWith(text);
            return a || b;
          })
          .splice(currentIndex, 10)
          .map((brewString) => {
            const brew = brews[brewString];
            return (
              <React.Fragment key={brew.token}>
                <Grid item xs>
                  <BrewCard
                    name={brew.name}
                    desc={brew.description}
                    brew={brew}
                  />
                </Grid>
                <div style={{ marginLeft: '10px' }} />
              </React.Fragment>
            );
          })}
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setCurrentIndex(currentIndex - 5);
          }}
        >
          Previous {20}
        </Button>

        <Button
          style={{ marginLeft: '25px' }}
          color="primary"
          variant="contained"
          onClick={() => {
            setCurrentIndex(currentIndex + 5);
          }}
        >
          Next {20}
        </Button>
      </div>
    </div>
  );
};

export default Brews;
