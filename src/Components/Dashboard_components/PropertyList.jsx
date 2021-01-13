import React, { useEffect,useState } from "react";
import {auth,firestore,storageDel} from '../../firebase';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import  TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
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

const DataTable=(props)=> {
    const classes = useStyles();

    const [docs,setDocs]=useState([]);
    const [flag,setFlag]=useState();
    const [pName,setPName]=useState();
    const [propdetails,setPropDetails] = useState()
    const [editDetails, showeditDetails] = useState(false);
    const [showImage,newshowImage] = useState(false);

    const selected=new Set();
    
    useEffect(()=>{
        getProps();
        console.log("prop list use effect")
    },[props.updater])

const getProps =  async () => {
    console.log("prop list")
    const user = auth.currentUser
    const userRef = firestore.collection('users');
    const properties =  await userRef.doc(`${user.uid}`).collection('property_details').get()
    if(properties.docs.length)
      {
        var arr=[];
        properties.docs.map( p => {
            const z = p.data();
            arr = [...arr, z];
            return ""
          })
        setDocs(docs=>arr)
        setFlag(true)
      }
      else{
        setFlag(false)
      }
  }

  const checkboxChange=(e)=>{
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
      <div>
      {flag?
      <Paper className={classes.root}>  
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
          {editDetails && <EditPropertyList show={editDetails} getProps={getProps} pName={pName} onHide={()=>{showeditDetails(false)}}/>}
          {propdetails &&<ViewProperty show={showImage}  propdetails={propdetails} onHide={()=>{newshowImage(false);setPropDetails(null)}}></ViewProperty>}
            <TableRow checkboxselection="True">
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
        </Table>
      </Paper>
      :<div style={{marginTop:"4%",marginBottom:"4%",padding:"15px",backgroundColor:"white",borderRadius:"5px",boxShadow:"3px 3px 5px rgba(0, 0, 0, 0.4)"}}>
        <h3 style={{ fontFamily:"Roboto",margin:"0",textAlign:"center"}}>No properties present.</h3></div>}
      </div>
    );
  }

export default DataTable;
