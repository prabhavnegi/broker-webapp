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
import Typography from '@material-ui/core/Typography';
import { Divider } from "@material-ui/core";

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

const DataTable=()=> {
    const classes = useStyles();

    const [data,setData]=useState();
    const [flag,setFlag]=useState();

    const selected=new Set();
    
    useEffect(()=>{
        getClients();
    },[])

const getClients =  async () => {
    const user = auth.currentUser;
    const userRef = firestore.collection('users');
    const client=await userRef.doc(user.uid).collection('clients').doc(user.uid+"clients").get()
    if(client.data())
    {
      setData(client.data())
      setFlag(true)
    }
    else
      console.log("no clients")
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
    getClients()
  }

  const checkboxChange=(e)=>{
    console.log(e.currentTarget.checked)
    if(e.currentTarget.checked)
        selected.add(e.currentTarget.value);
    else
        selected.delete(e.currentTarget.value);
  }

  const setClients=()=>{
    selected.forEach(client => {
      console.log(client)
    })
  }



    return (
      <Paper className={classes.root}>
          {flag?
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
            <TableCell>
                Client List
            </TableCell>
            <TableCell>
            <Button
              variant="contained"
                color="primary"
                style={{float: "right",left: "400px"}}
                onClick={()=>{setClients()}
            }
            >
            Select
            </Button>
            </TableCell><Divider /><Divider />
            
            </TableRow>

            </TableHead>
          <TableHead>
          <Divider />
            <TableRow checkboxselection>
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
        </Table>:""}
      </Paper>
    );
  }

export default DataTable;
