import React, {useState} from "react";
import { Link } from "react-router-dom";
import { emailVerify, signInWithGoogle,auth } from "../firebase";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/"> {/*dashboard route*/}
        Broker.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/11/16/19/29/spring-2955582_1280.jpg)',
    backgroundRepeat: 'no-repeat',
    alt:'hi',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    fontSize: "18px",
    padding: "10px 20px",
    alignItems: "center",
    marginTop:"20px",
    borderRadius:"20px"
  },
  alerticon:{
    fontSize:"2rem"
  },
}));



const SignIn = () => {
  const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [flag,setFlag] = useState(false)

    const signInWithEmailAndPasswordHandler = event => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((result)=>{
            if(!result.user.emailVerified)
               { 
                setError("Verify your account first")
                setFlag(true)
              }
        }).catch(error => {
        setError("Error signing in with password and email!");
        setTimeout(()=>{
          setError('')
        },5000)
        });
      };
      
      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
          if(name === 'email') {
              setEmail(value);
          }
          else if(name === 'password'){
            setPassword(value);
          }
      };

      const GoogleSignin = async () =>{
          const err = await signInWithGoogle();
          if(err)
           { 
             setError(err)
            setTimeout(()=>{
              setError('')
            },5000)
          }
      }
   
      const sendVerification = async () => {
        await emailVerify(auth.currentUser)
        setError("Email Sent")
      }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <Alert severity="error" classes={{icon:classes.alerticon}} className={classes.alert} >
            {error}
          </Alert>
          }
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              value={email}
              onChange={onChangeHandler}
              autoComplete="email"
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={onChangeHandler}
              autoComplete="current-password"
            />
           {flag &&<Button type="button" variant="contained" color="primary" style={{marginLeft:"150px",marginTop:"10px",marginBottom:"10px"}} onClick = {() => {sendVerification()}}>
            Resend Verfication Mail Again
          </Button>}

          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signInWithEmailAndPasswordHandler}
            >
              Sign In
            </Button>
        <b><p style={{textAlign: "center",marginBottom: "5px",marginTop: "10px"}}>OR</p></b>
        <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={GoogleSignin}
            >
              Sign In with Google
            </Button>
        <Grid container>
              <Grid item xs>
                <Link to="/passwordReset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
            
  );
};

export default SignIn;
