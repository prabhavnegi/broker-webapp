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
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';

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
  
const ImageDrawer=(props)=>{
   
    const classes = useStyles();

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
					<Avatar src={props.UserData.dp} className={classes.avatar} />
						<p>
						{' '}
						
						</p>
				</center>
			<Divider />
            <br />
            
            <List>
                
                <ListItem button key={'Name'}>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary={props.UserData.name} style={{fontSize: "20px"}}/>
                </ListItem>
                <ListItem button key={'Email'}>
                    <ListItemIcon><EmailIcon /></ListItemIcon>
                    <ListItemText primary={props.UserData.email} style={{fontSize: "5px"}}/>
                </ListItem>
                <ListItem button key={'Contact'}>
                    <ListItemIcon><PhoneIcon /></ListItemIcon>
                    <ListItemText primary={props.UserData.phno} style={{fontSize: "20px"}}/>
                </ListItem>
            </List>
                
            <Divider />
            <List>
              <ListItem button key='Dashboard' component={Link} to="/dash">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItem>
            </List>
        </div>
      </Drawer>
    );
}

export default ImageDrawer;