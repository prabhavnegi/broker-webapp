import React, { useEffect,useState } from "react";
import { useHistory } from "react-router";
import {auth,firestore,getUserDocument,storageDel} from '../../firebase';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import  TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Divider } from "@material-ui/core";
import EditPropertyList from './EditPropertyList';
import ViewProperty from './ViewProperty';

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

    const [docs,setDocs]=useState([]);
    const [flag,setFlag]=useState();
    const [user,setUser]=useState();
    const [pName,setPName]=useState();
    const [propDetails,setPropDetails] = useState({name:"",address:"",URL:[]})
    const [editDetails, showeditDetails] = useState(false);
    const [showImage,newshowImage] = useState(false);
    const history=useHistory();

    const selected=new Set();
    
    useEffect(()=>{
        getProps();
    },[user])

const getProps =  async () => {
    const user = auth.currentUser
     const userDoc=await getUserDocument(user.uid)
    setUser(userDoc)
    const userRef = firestore.collection('users');
    const properties =  await userRef.doc(`${user.uid}`).collection('property_details').get()
    if(properties.docs.length)
      {
        var arr=[];
        properties.docs.map(p => {
          const z = p.data()
          arr=[...arr,z];
        })
        setDocs(docs=>arr)
        setFlag(true)
      }
      else{
        setFlag(false)
        alert("No properties")
      }
  }

  const checkboxChange=(e)=>{
    console.log(e.currentTarget.checked)
    if(e.currentTarget.checked)
        selected.add(e.currentTarget.value);
    else
        selected.delete(e.currentTarget.value);
  }

  const setProps=()=>{
    console.log(selected.size)
    selected.forEach(p => {
      console.log(p)
    })
  }

  const delProp=async(propName)=>{
    const user= auth.currentUser;
    const docRef = firestore.collection('users').doc(user.uid).collection('property_details').doc(propName);
    docRef.delete().then(function() {
        console.log("Property successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing property: ", error);
    });
    storageDel(propName);
    await getProps()
  }

  const selectallBox=(e)=>{
    if(e.currentTarget.checked)
    {
      docs.map((c,index)=>
      selected.add(c.name)
      )
    }
    else{
    selected.forEach(p => {
      selected.delete(p)
    })
  }
}

    return (
      <Paper className={classes.root}>
          {flag?
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
            <TableCell><b><p style={{marginTop: "10px"}}>Property List</p></b>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Button
                variant="contained"
                onClick={()=>{setProps()}}
                color="primary"
              style={{marginLeft: "135px",marginRight: "-20px"}}
              >Select</Button>
                  </TableCell>
            </TableRow>
            </TableHead>
          <TableHead>
          <Divider />
          <EditPropertyList show={editDetails} getProps={getProps} pName={pName} onHide={()=>showeditDetails(false)}/>
          <ViewProperty show={showImage}  propDetails={propDetails} onHide={()=>newshowImage(false)}></ViewProperty>
            <TableRow checkboxselection>
              <TableCell><Checkbox value="selectall" onChange={selectallBox} style={{marginLeft: "25px",marginTop: "10px"}}></Checkbox></TableCell>
              <TableCell>Property Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
              
            </TableRow>

            
          </TableHead>
          <TableBody>
            {docs.map((c,index) => {
              return (
                <TableRow key={`row-${index}`}>
                  <TableCell><Checkbox value={c.address} onChange={checkboxChange} style={{marginLeft: "25px",marginTop: "10px"}}></Checkbox></TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.address}</TableCell>
                  <TableCell>
                    <Button
                    onClick={()=>{newshowImage(true);setPropDetails(c)}}
                    color="secondary">
                      View
                    </Button>
                    <Button
                    color="secondary"
                    onClick={()=>{showeditDetails(true);setPName(c.name)}}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={()=>{let nm=c.name;delProp(nm)}}
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
