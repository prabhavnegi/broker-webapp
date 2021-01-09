import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
/* import EnhancedTableToolbar from './ClientList2'; */
import SideDrawer from './sideDrawer';
import PrimarySearchAppBar from './AppBarComponent';
import Container from '@material-ui/core/Container';
import ClientList from './ClientList';
//backend imports
import {auth,firestore,getUserDocument} from "../../firebase";
import DataTable from './PropertyList';

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
var itemList=[];

const ClippedDrawer=()=> {
  const classes = useStyles();
  const [flag,setFlag]=useState(false);
  
  const [user,setUser] = useState({})
const [docs,setDocs] = useState([])
const [hidden,setHidden] = useState({})

const signOut = () =>{
  auth.signOut()
}

useEffect( () => {
  getUser()
  },[]) 

const getUser =  async () => {
  const user = auth.currentUser
   const userDoc=await getUserDocument(user.uid)
  setUser(userDoc)
  const userRef = firestore.collection('users');
  const properties =  await userRef.doc(`${user.uid}`).collection('property_details').get()
  if(properties.docs.length)
  {
    setFlag(true);
    properties.docs.forEach(p => {
      const z = p.data()
      setHidden(hidden=>({...hidden,[z.name]:false}))
      setDocs(docs=>[...docs,z])
    })
  }
}



  return (
    <div className={classes.root}>
  
      
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <PrimarySearchAppBar dp={user.photo_url} signOut={signOut}></PrimarySearchAppBar>
      </AppBar>
      
      <SideDrawer></SideDrawer>
      <Container component="main" maxWidth="xl">
      <main className={classes.content}>
        <Toolbar />
        {!flag ? <h1>No properties present. To upload click on Upload Folder</h1>:""}
        <ClientList />
        <DataTable></DataTable>
      </main>
      </Container>
    </div>
  );
}

export default ClippedDrawer;