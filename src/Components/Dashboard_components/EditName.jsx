import React, {useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {updateUserInfo} from '../../firebase';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  alert: {
    fontSize: "18px",
    padding: "10px 20px",
    alignItems: "center",
    marginTop:"20px",
    borderRadius:"20px",
  },
  alerticon:{
    fontSize:"2rem"
  },
}));

const Edit_Name=(props)=>{
  
    const [name,setName]=useState();
    const [error,setError]=useState();
    const [success,setSuccess]=useState();

    const handleChange=(e)=>{
      setName(e.target.value)
    }

    const handleSubmit=async ()=>{
      try{
          await updateUserInfo(name);
          setSuccess("Name updated")
      } catch(error){
        setError("Inputs cannot be same")
        return;
      }
      props.onHide()
      setSuccess("Name updated")
       
    }

    const classes=useStyles();
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {success && (
          <Alert severity="success" classes={{icon:classes.alerticon}} className={classes.alert} >
          {success}
        </Alert>
        )}

        {error && (
          <Alert severity="error" classes={{icon:classes.alerticon}} className={classes.alert} >
          {error}
        </Alert>
        )}
          <Form>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter New Name</Form.Label>
              <Form.Control type="text" onChange={(e)=>handleChange(e)} placeholder="Enter Name" value={name}/>
            </Form.Group>
          </Form>
                    
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleSubmit} >Save</Button>
          <Button onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default Edit_Name;