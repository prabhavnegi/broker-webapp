import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageDrawer from './ImageDrawer';
import PrimarySearchAppBar from './AppBarComponent';
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom';
import { CssBaseline,AppBar,Typography, Card,Button, Grid,Container } from '@material-ui/core';
import Change_Password from './ChangePassword';
import Edit_Contact from './EditContact';
import Edit_Email from './EditEmail';
import Edit_Name from './EditName';
import ImageCropper from './imageCropper';
import {auth,getUserDocument} from '../../firebase';

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
	marginTop: "10px"
  },
  card: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    border: '1px solid rgba(.125,.125,.125,.125)',
	boxSizing: 'borderbox',
	marginTop: "60px",
  },
  avatar: {
	height: 110,
	width: 100,
	flexShrink: 0,
	flexGrow: 0
},
locationText: {
	paddingLeft: '15px'
},
buttonProperty: {
	position: 'absolute',
	top: '50%'
},
uiProgess: {
	position: 'fixed',
	zIndex: '1000',
	height: '31px',
	width: '31px',
	left: '50%',
	top: '35%'
},
progess: {
	position: 'absolute'
},
uploadButton: {
	marginLeft: '8px',
	margin: theme.spacing(1)
},
customError: {
	color: 'red',
	fontSize: '0.8rem',
	marginTop: 10
},
submitButton: {
	marginTop: '10px'
}
}));

const ProfilePage=()=> {

	const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [phno,setPhno]=useState();
    const [dp,setDp]=useState();
	const [loading,setLoading] = useState(true);


	const getUser =  async () => {
			const user = auth.currentUser
			const userDoc=await getUserDocument(user.uid)
			setName(userDoc.displayName);
			setEmail(userDoc.email);
			setPhno(userDoc.phno);
			setDp(userDoc.photo_url);
			setLoading(false)
		}
	
	
	useEffect(()=>{

			getUser()

	},[])


  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center" >
        {'Copyright © '}
        <Link color="inherit" to="/homepage">
          Broker.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const classes = useStyles();
  const { handleSubmit} = useForm();
  const onSubmit = values => {};
  const [editpwd,changepwd]=useState(false);
  const [editph,changeph]=useState(false);
  const [editemail,changeemail]=useState(false);
  const [editname,changename]=useState(false);
  const [imgcrop,newimgcrop]=useState(false);

  useEffect(()=>{
	  getUser()
  },[editname,editemail,editph,editpwd,imgcrop])

  return (
    loading?"":
    <div className={classes.root}>
	<Change_Password  show={editpwd} onHide={() => changepwd(false)}/>
	<Edit_Contact  show={editph} onHide={() => changeph(false)}/>
	<Edit_Email   show={editemail} onHide={() => changeemail(false)}/>
	<Edit_Name show={editname}  onHide={() => changename(false)}/>
    {imgcrop && <ImageCropper show={imgcrop} onHide={() => newimgcrop(false)}/>}
      
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <PrimarySearchAppBar dp={dp}></PrimarySearchAppBar>
      </AppBar>
      
      <ImageDrawer UserData={{name,email,phno,dp}}></ImageDrawer>
      <main className={classes.content}>
	  <Container component="main" maxWidth="md">
		<div className={classes.toolbar} />
            <Card className={classes.card} maxwidth="xs">
            <div className={classes.paper}>
				<div className="card" style={{paddingLeft: "10px",paddingRight: "10px"}}>
				<div className="card-block">
                <h2 className="card-header text-center" style={{backgroundColor: "#F2F2F2"}}>Edit Profile</h2>
					<div className="card-body">
						<div className="row justify-content-md-center">
						<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
							<Container maxWidth="sm">
							<Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Button
                                variant="outlined"
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={()=>newimgcrop(true)}
                                >
									Edit profile picture`
                                </Button>
                            </Grid>
							<Grid item xs={12}>
								<Button 
								variant="outlined"
								type="submit"
								fullWidth
								variant="contained"
								onClick={() => changename(true)}
								>
									Edit Your Name
								</Button>
							</Grid>
							
							<Grid item xs={12}>
								<Button 
								variant="outlined"
								type="submit"
								fullWidth
								variant="contained"
								onClick={() => changeemail(true)}
								>Edit Your Email Id
								</Button>    
							</Grid>
							<Grid item xs={12}>
								<Button 
								variant="outlined"
								type="submit"
								fullWidth
								variant="contained"
								onClick={() => changeph(true)}
								>Edit Your Contact No.
								</Button>    
							</Grid>
							<Grid item xs={12}>
								<Button 
								variant="outlined"
								type="submit"
								fullWidth
								variant="contained"
								onClick={() => changepwd(true)}
								>Change Password
								</Button>    
							</Grid>
						</Grid>
						</Container>
						</form>
						</div>
					</div>
					</div>
				</div> 
				</div>
			</Card>
				<br/>
                <Copyright></Copyright>
				</Container>
				</main>
                
  </div>
  );
}

export default ProfilePage;