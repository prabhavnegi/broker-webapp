/* eslint-disable react/jsx-pascal-case */
import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
import { Link } from 'react-router-dom';
import Upload from '../Dashboard_components/Upload/Upload';
import Edit_Profile from './EditProfile';
import Change_Password from './ChangePassword';
import AddClientRecord from './AddClientRecord';
import DashboardIcon from '@material-ui/icons/Dashboard';

const drawerWidth = 240;

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
      marginTop:"15px"
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
  }));
  
const SideDrawer=()=>{
  const classes = useStyles();

  const [modalShow,setModalShow]=useState(false);
  const [edit,editProfile]=useState(false);
  const [editpwd,changepwd]=useState(false);
  const [addclient,newaddclient]=useState(false);


    return(
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Upload show={modalShow} onHide={() => setModalShow(false)}/>
          <Edit_Profile show={edit} onHide={() => editProfile(false)} />
          <Change_Password show={editpwd} onHide={() => changepwd(false)}/>
          <AddClientRecord show={addclient} onHide={() => newaddclient(false)}/>

        <Toolbar />

        <div className={classes.drawerContainer}>
            <List>
          
             <ListItem button key={'New Property'} onClick={()=>setModalShow(true)}>
                <ListItemIcon ><FolderIcon /></ListItemIcon>
                <ListItemText primary={'New Property'}/>
              </ListItem>
              <ListItem button key={'Send Property'} component={Link} to="/Sending" >
                <ListItemIcon><FolderIcon /> </ListItemIcon>
                <ListItemText primary={'Send Property'}/>
              </ListItem>
          </List>


          <Divider />
          
          <List>
         
             <ListItem button key='Add Client' onClick={() => newaddclient(true)}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary='Add Client' />
              </ListItem>
            
              <ListItem button key='Dashboard' component={Link} to="/dash">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItem>
          </List>
        </div>
      </Drawer>
    );
}

export default SideDrawer;