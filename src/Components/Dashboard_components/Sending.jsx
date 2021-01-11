import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import Link from '@material-ui/core/Link';
import SideDrawer from './sideDrawer';
import { useForm } from "react-hook-form";
import SelectClient from './SelectClient';
import SelectProperty from './SelectProperty';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    border: '1px solid rgba(.125,.125,.125,.125)',
    boxSizing: 'borderbox',
  },
}));
//var itemList=[];

const Sending=()=> {

  //var flag=1;

  
   /* function Copyright() {
      return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="/">
            Broker.com
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    }  */
  
  //const [modalShow,setModalShow]=useState(false);
  //const [edit,editProfile]=useState(false);
  //const [editpwd,changepwd]=useState(false);

  
  const [showClient,newshowclient]=useState(false);
  const [showProperty,newshowProperty]=useState(false);
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <div className={classes.root}>
  
      <button >clickkk</button>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Send Property
          </Typography>
        </Toolbar>
      </AppBar>
      <SelectClient show={showClient} onHide={() => newshowclient(false)}/>
      <SelectProperty show={showProperty} onHide={() => newshowProperty(false)}/>
      
      <SideDrawer ></SideDrawer>
      <main className={classes.content}>
      <Toolbar />
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className="card" style={{padding:'20px'}}>
          <div className="card-block">
            <h2 className="card-header text-center">Send Property</h2>
              <div className="card-body">
                <div className="row justify-content-md-center">
                  <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Button 
                        variant="outlined"
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={()=>newshowclient(true)}>
                        Select Client From Record
                        </Button>
                      
                      </Grid>
                    
                      <Grid item xs={12}>
                        <Button 
                        variant="outlined"
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={()=>newshowProperty(true)}
                        >Select Property From Record
                        </Button>    
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                        id="outlined-basic"
                        fullWidth
                        rows={6}
                        multiline
                        label="Enter Description/Message" 
                        variant="outlined" />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        Send 
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </Container> 
    </main>
  </div>
  );
}

export default Sending;