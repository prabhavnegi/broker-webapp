import React,{useEffect, useState} from 'react';
import {auth,getUserDocument} from '../../firebase';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/avatar';
import {List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height: '500px',
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
      flexGrow: 0,
      padding: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    avatar: {
        marginTop: "30px",
        width: "200px",
        height: "200px"
    },
  }));
  
const ImageDrawer=()=>{
    useEffect(()=>{
        getUser()
    },[])

    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [phno,setPhno]=useState();
    const [dp,setDp]=useState();

    const classes = useStyles();

  const getUser =  async () => {
    const user = auth.currentUser
     const userDoc=await getUserDocument(user.uid)
    setName(userDoc.displayName);
    setEmail(userDoc.email);
    setPhno(userDoc.phno);
    setDp(userDoc.photo_url);
    }


    return(
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />

        <div className={classes.drawerContainer}>
            <Divider />
				<center>
					<Avatar src={dp} className={classes.avatar} />
						<p>
						{' '}
						
						</p>
				</center>
			<Divider />
            <br />
            
            <List>
                
                <ListItem button key={'Name'}>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary={name} style={{fontSize: "20px"}}/>
                </ListItem>
                <ListItem button key={'Email'}>
                    <ListItemIcon><EmailIcon /></ListItemIcon>
                    <ListItemText primary={email} style={{fontSize: "5px"}}/>
                </ListItem>
                <ListItem button key={'Contact'}>
                    <ListItemIcon><PhoneIcon /></ListItemIcon>
                    <ListItemText primary={phno} style={{fontSize: "20px"}}/>
                </ListItem>
            </List>
                
            <Divider />
        </div>
      </Drawer>
    );
}

export default ImageDrawer;