import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import { SelectedBrewsContext } from '../Contexts/selectedBrew.context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { InstallingContext } from '../Contexts/installProgress.context';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SearchedContext } from '../Contexts/searchedText.context';

const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth + 15,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function BarraLaterale(props) {
  let [isInsatlling] = useContext(InstallingContext);
  let [selectedBrews] = useContext(SelectedBrewsContext);
  let [searchedText, setSearchedText] = useContext(SearchedContext);
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key={'All Apps'}>
          <Link to="/">
            <ListItemText primary={'All Apps'} />
          </Link>
        </ListItem>
        <ListItem button key={'Queue'}>
          <Link to="/Queue">
            <ListItemText primary={`Queue ${selectedBrews.length}`} />
          </Link>
        </ListItem>
        <ListItem button key={'Doctor'}>
          <ListItemText primary={'Run Doctor'} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Homebrew GUI
          </Typography>
          <TextField
            placeholder="Search your brew"
            style={{ justifyContent: 'right', marginLeft: '100px' }}
            value={searchedText}
            onKeyPress={(event) => {
              //debugger;
              setSearchedText(searchedText + event.key);
            }}
          />
          <div className={classes.search}>
            <div className={classes.searchIcon} style={{ marginLeft: 'auto' }}>
              {isInsatlling.length !== 0 ? (
                <CircularProgress color="secondary" />
              ) : (
                <></>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="permanent"
        open={true}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
}
export default BarraLaterale;
