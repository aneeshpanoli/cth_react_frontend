import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory}  from "react-router-dom";
import AvatarMenu from '../navigation/avatarMenu';
import Avatar from '@material-ui/core/Avatar';
import cthLogo from '../../Assets/img/cth.svg'
import Button from '@material-ui/core/Button';
import DashProject from './dashProject';
import DashTasks from './dashChallenges';
import DashActivity from './dashActivity';
import DashApprove from './dashApprove';
import HistoryIcon from '@material-ui/icons/History';
import DraftsIcon from '@material-ui/icons/Drafts';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Navbar from '../navigation/TopNav'

import { useDispatch, useTrackedState } from 'reactive-react-redux';
import React, { useEffect, useRef } from 'react';
import { MATCH_ID } from '../backend/EsQueries'
import { useParams} from 'react-router-dom'
import { queryEsById } from '../data/axiosComponent'
import { updateSelectedProject } from '../redux/actions'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 5,
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function CloseButton(){
  let history = useHistory();
  return (
    <div style={{position: 'absolute', right: 5, display: 'flex'}}>
    <Navbar />
    <Button variant="text"  
            color="inherit" 
            onClick={() => history.goBack()}
            >
            <CloseIcon />
            </Button>
            </div>
  )
}


export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = React.useState(0);
  let params = useParams();
  const dispatch = useDispatch();
  console.log(useTrackedState());
  const { selectedProject } = useTrackedState();
  useEffect(() =>{
    if (!selectedProject){
        let query = MATCH_ID(params.id);
        queryEsById(query, dispatch, updateSelectedProject);
    }
}, []);
  


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleIconClick = (index) => {
    setClicked(index);
    console.log(index);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
      color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          
          <CloseButton />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        {['Project', 'Tasks', 'History', 'Drafts'].map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{[<AccountTreeIcon onClick={() => handleIconClick(index)}/>, 
            <AssignmentIcon onClick={() => handleIconClick(index)}/>, 
          <HistoryIcon onClick={() => handleIconClick(index)}/>, 
          <DraftsIcon onClick={() => handleIconClick(index)}/>][index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Verfication', 'Funding'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
            {[<VerifiedUserIcon onClick={() => handleIconClick(index+10)}/>,
            <AccountBalanceIcon onClick={() => handleIconClick(index+10)}/>,
            
          ][index]}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
         <ListItem button>
         
          </ListItem>
      </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {clicked === 0 &&
        <DashProject/>
        } 
        {clicked === 1 &&
        <DashTasks/>
        } 
        {clicked === 2 &&
        <DashActivity />
        } 
        {clicked === 10 &&
        <DashApprove />
        } 
      </main>
    </div>
  );
}
