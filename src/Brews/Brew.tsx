import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { SelectedBrewsContext } from '../Contexts/selectedBrew.context';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { CircularProgress } from '@material-ui/core';

import { install } from '../Util/Commands';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minHeight: 150,
  },
});

const BrewCard = (props: any) => {
  let [selectedBrews, setSelectedBrews] = useContext(SelectedBrewsContext);

  let [comando, setComando] = useState(null);

  const classes = useStyles();

  const push = (brew) => {
    setSelectedBrews([...selectedBrews, brew]);
  };

  const remove = (brew) => {
    let a = selectedBrews.filter((b) => b.token !== brew.token);

    setSelectedBrews([...a]);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {comando ? (
          <>
            <CircularProgress color="primary" />

            <Button
              size="small"
              color="primary"
              onClick={() => {
                comando.kill('SIGINT');
                setComando(null);
              }}
            >
              Stop
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                let comando = install(props.brew.token);

                setComando(comando);
              }}
            >
              Install
            </Button>
          </>
        )}

        {selectedBrews.includes(props.brew) ? (
          <>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                remove(props.brew);
              }}
            >
              Remove from queue
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                push(props.brew);
              }}
            >
              Add to queue
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default BrewCard;
