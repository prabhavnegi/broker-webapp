import React, { useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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


const PasswordReset = () => {

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" to="/homepage">
          Broker.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
          setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };

    const classes = useStyles();

  return (
    <div className={classes.root}>
    <CssBaseline />

    <main className={classes.content}>
    <Toolbar />
    <Container component="main" maxWidth="xs" style={{marginBottom: "10px"}}>
    <CssBaseline />
          {emailHasBeenSent && (
            <div>
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div>
              {error}
            </div>
          )}


      <div className={classes.paper}>
      <h2 className="card-header" style={{textAlign: "center",fontSize: "30px",backgroundColor:"#f8f9fa",marginBottom: "40px"}}>Reset Your Password</h2>
      <div className="card" style={{padding:'20px'}}>
        <div className="card-block">
          <h6 className="card-header text-center">Forgotten your password? Enter your  e-mail address below, and we'll send you an e-mail allowing you to reset it.</h6>
            <div className="card-body">
              <div className="row justify-content-md-center">
                <form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField 
                      id="outlined-basic"
                      fullWidth
                      multiline
                      value={email}
                      name="userEmail"
                      onChange={onChangeHandler}
                      label="Enter Email" 
                      variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={(e)=>{sendResetEmail(e)}}
                      className={classes.submit}
                      >
                      Send Link
                      </Button>
                    </Grid>
                    <Link to="/signIn"> &larr; back to sign in page </Link>
                  </Grid>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div> 
    </Container> 
    <Copyright/>
  </main>
</div>
  );
};

export default PasswordReset;
