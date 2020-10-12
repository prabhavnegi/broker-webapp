import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EnhancedTableToolbar from './ClientList2';
import SideDrawer from './sideDrawer';
import PrimarySearchAppBar from './AppBarComponent';
import Container from '@material-ui/core/Container';

//backend imports
import {auth,firestore,getUserDocument} from "../../firebase";
import EnhancedPropTable from './PropertyList';

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

/* async componentDidMount() {
  const res=await getter();
  console.log('in card');
    console.log(itemList[0]);
    return(
      <Card>
        <image src={itemList[0].photourl} alt="not loading  "></image>
        
      </Card>
    );
} */


/* 
const getter=()=> {
  console.log('hi');
   Axios.get('http://localhost:5000')
  .then((res =>{
    console.log(res.data);
    var x=res.data;
    itemList.append(x);
  }));
}


useEffect(() => {
  getter();
  console.log('in card');
    console.log(itemList[0]);
    return(
      <Card>
        <image src={itemList[0].photourl} alt="not loading  "></image>
        
      </Card>
    );
});
 */
const ClippedDrawer=()=> {
  const classes = useStyles();
  var flag=1;
  
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
  properties.docs.forEach(p => {
    const z = p.data()
    setHidden(hidden=>({...hidden,[z.name]:false}))
    setDocs(docs=>[...docs,z])
  })
}



  return (
    <div className={classes.root}>
  
      
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        {/* <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar> */}
        <PrimarySearchAppBar avatar={user.photo_url} signOut={signOut}></PrimarySearchAppBar>
      </AppBar>
      
      <SideDrawer></SideDrawer>
      <Container component="main" maxWidth="xl">
      <main className={classes.content}>
        <Toolbar />
        {flag===1 ? <h1>No properties present. To upload click on Upload Folder</h1>:<h1>Card</h1>}
        <EnhancedTableToolbar></EnhancedTableToolbar>
        <EnhancedPropTable></EnhancedPropTable>
      </main>
      </Container>
    </div>
  );
}

export default ClippedDrawer;