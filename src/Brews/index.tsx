import React, { useEffect, useState } from 'react';

import { useContext } from 'react';

import { BrewsContext } from '../Contexts/app.context';

import BrewCard from './Brew';

import { SearchedContext } from '../Contexts/searchedText.context';

import { Grid, Button } from '@material-ui/core';

const Brews = () => {
  let [brews] = useContext(BrewsContext);

  let [text] = useContext(SearchedContext);

  useEffect(() => {
    console.log(brews);
  }, [brews]);

  let [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {brews.splice &&
          brews
            .filter((brew) => {
              let a = brew.token.startsWith(text);
              let b = brew.name[0].startsWith(text);
              console.table({ token: brew.token, nome: brew.name[0], a, b });

              return a || b;
            })
            .splice(currentIndex, 5)

            .map((brew) => {
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
