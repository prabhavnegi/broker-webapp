import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
/* import EnhancedTableToolbar from './ClientList2'; */
import SideDrawer from './sideDrawer';
import PrimarySearchAppBar from './AppBarComponent';
import Container from '@material-ui/core/Container';
import ClientList from './ClientList';
//backend imports
import {auth} from "../../firebase";
import DataTable from './PropertyList';
//import {UserContext} from "../../UserProvider/provider";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));


const ClippedDrawer=(props)=> {
  const classes = useStyles();
  console.log("DashBoard")
  const [updater, setUpdater] = useState(false)
  const [clientUpdate, clientUpdater] = useState(false)
const signOut = () =>{
  auth.signOut()
}

  return (
    <div className={classes.root}>
  
      
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <PrimarySearchAppBar dp={props.userData.photo_url} signOut={signOut}></PrimarySearchAppBar>
      </AppBar>
      
      <SideDrawer setUpdater={setUpdater} clientUpdater={clientUpdater}></SideDrawer>
      <Container component="main" maxWidth="xl">
      <main className={classes.content}>
        <Toolbar />
        <ClientList clientUpdate={clientUpdate} />
        <DataTable updater={updater} />
      </main>
      </Container>
    </div>
  );
}

export default ClippedDrawer;