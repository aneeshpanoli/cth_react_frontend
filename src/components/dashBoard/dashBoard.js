import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory}  from "react-router-dom";
import AvatarMenu from '../navigaton/avatarMenu';
import Avatar from '@material-ui/core/Avatar';
import cthLogo from '../../Assets/img/cth.svg'
import DashProject from './dashProject'
import HistoryIcon from '@material-ui/icons/History';
import DraftsIcon from '@material-ui/icons/Drafts';

import { useDispatch, useTrackedState } from 'reactive-react-redux';
import React, { useEffect, useRef } from 'react';
import { MATCH_ID } from '../data/EsQueries'
import { useParams} from 'react-router-dom'
import { queryEsById } from '../data/axiosComponent'
import { updateSelectedProject } from '../redux/actions'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
      marginLeft: drawerWidth,
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

function CloseButton(){
  let history = useHistory();
  return (
    <div style={{position: 'absolute', right: 5, display: 'flex'}}>
    <AvatarMenu />
    <Button variant="text"  
            color="inherit" 
            onClick={() => history.goBack()}
            >
            <CloseIcon />
            </Button>
            </div>
  )
}

function DashBoardDrawer(props) {
  
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
  console.log(selectedProject);
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {['Project', 'Tasks', 'History', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{[<AccountTreeIcon/>, <AssignmentIcon />, 
          <HistoryIcon />, <DraftsIcon />][index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Verfication', 'Funding', 'Activity'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <AccountTreeIcon /> : <AccountTreeIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
         <ListItem button>
         
          </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <IconButton>
            <Avatar src={cthLogo}>

            </Avatar>
         
          <Typography variant="h6" noWrap>
             Civic Tech Hub
          </Typography>
          </IconButton>
          <CloseButton />
        </Toolbar>
        
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
        <DashProject/>
      </main>
    </div>
  );
}

export default DashBoardDrawer;
