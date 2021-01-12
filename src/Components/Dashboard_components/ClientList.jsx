import React, { useEffect,useState } from "react";
import {auth,firestore} from '../../firebase';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import  TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "20px",
    overflowX: "auto",
    marginBottom: "20px"
  },
  tbhead: {
      fontSize: "20px",
      marginTop: "2px",
      marginLeft: "10px"
  },
  Checkbox: {
      marginLeft: "25px"
  }
});

const ClientList=(props)=> {
    const classes = useStyles();

    const [data,setData]=useState();
    const [flag,setFlag]=useState();

    const selected=new Set();
    
    useEffect(()=>{
        getClients();
    },[props.clientUpdate])

const getClients =  async () => {
    const user = auth.currentUser;
    const userRef = firestore.collection('users');
    const client=await userRef.doc(user.uid).collection('clients').doc(user.uid+"clients").get()
    console.log("clientList")
    if(client.data().clients.length)
    {
      setData(client.data())
      setFlag(true)
    }
    else{
      setFlag(false);
      console.log("No clients")
    }
  }

  const delClient=async(n)=>{
    var user=auth.currentUser
    const userRef = firestore.collection('users').doc(user.uid).collection('clients').doc(user.uid+"clients");
    let i;
    data.clients.forEach((client,index) => {
      if(n===client.name)
        i=index
    })
    data.clients.splice(i,1);
  await  userRef.update({
      clients:data.clients
    })
    await getClients()
  }

  const checkboxChange=(e)=>{
    if(e.currentTarget.checked)
        selected.add(e.currentTarget.value);
    else
        selected.delete(e.currentTarget.value);
  }

  const setClients=()=>{
    console.log(selected.size)
    selected.forEach(client => {
      console.log(client)
    })
  }



    return (
      <div>
      {flag?
      <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
            <TableCell><b><p style={{marginTop: "10px"}}>Client List</p></b>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Button
                variant="contained"
                onClick={()=>{setClients()}}
                color="primary"
              >Select</Button>
                  </TableCell>
            </TableRow>
            </TableHead>
          <TableHead>
            <TableRow checkboxselection="true">
              <TableCell><Checkbox value="selectall" style={{marginLeft: "25px",marginTop: "10px"}}></Checkbox></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Actions</TableCell>
              
            </TableRow>

            
          </TableHead>
          <TableBody>
            {data.clients.map((c,index) => {
              return (
                <TableRow key={`row-${index}`}>
                  <TableCell><Checkbox value={c.phoneno} onChange={checkboxChange} style={{marginLeft: "25px",marginTop: "10px"}}></Checkbox></TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.phoneno}</TableCell>
                  <TableCell>
                    <Button
                      onClick={()=>{let nm=c.name;delClient(nm)}}
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      : <div style={{marginTop:"4%",marginBottom:"4%",padding:"15px",backgroundColor:"white",borderRadius:"5px",boxShadow:"3px 3px 5px rgba(0, 0, 0, 0.4)"}}>
        <h3 style={{ fontFamily:"Roboto",margin:"0",textAlign:"center"}}>No clients to show</h3></div>}
      </div>
    );
  }

export default ClientList;
