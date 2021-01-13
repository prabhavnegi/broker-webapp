import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {auth,firestore} from '../../firebase';
import {Form} from 'react-bootstrap';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

const Edit_Contact=(props)=>{

  const [newphno,setNewphno]=useState();
  const [error,setError]=useState();
  const [success,setSuccess]=useState();
  const [disable,setDisable]=useState();

  const changeHandler=(e)=>{
    if(e.target.name === 'newPhno')
      setNewphno(e.target.value)
  }

  const handleSubmit=async()=>{
    setDisable(true)
      var user = auth.currentUser;
      const userRef = firestore.doc(`users/${user.uid}`);
      const snapshot = await userRef.get()
      if (snapshot.data().phno === newphno)
          setError("Inputs cannot be same")
      else
          try {
              await userRef.update({
                  phno: newphno
              })
          }
      catch (err) {
          setError("Update failed");
          return;
      }
      setSuccess("Contact No. Updated");
      setDisable(false);
  }


  const classes = useStyles();
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={disable?"static":true}
        keyboard={disable?"false":"true"}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Contact Number
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
              <Form.Label>Enter New PhoneNo</Form.Label>
              <Form.Control type="phone" placeholder="New Phone no" name="newPhno" value={newphno} onChange={(e)=> changeHandler(e)} />
            </Form.Group>
          </Form>       
        </Modal.Body>
        <Modal.Footer>
            <Button disabled={disable} onClick={handleSubmit}>{disable?"Updating":"Save Changes"}</Button>
          <Button disabled={disable} onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default Edit_Contact;