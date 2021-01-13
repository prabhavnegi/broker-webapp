import React,{useEffect, useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {auth,Reauthenticate,firestore} from '../../firebase';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {Form} from 'react-bootstrap';

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
const Edit_Email=(props)=>{

  const [email,setEmail]=useState();
  const [newEmail,setNewemail]=useState()
  const [password, setPassword] = useState();
  const [error,setError]=useState();
  const [success,setSuccess]=useState();
  const [disable,setDisable]=useState(false);

  const onChangeHandler = e => {
    if (e.target.name === "currentEmail")
        setEmail(e.target.value)
    if (e.target.name === "newEmail")
      setNewemail(e.target.value)
    if (e.target.name === "Password")
      setPassword(e.target.value)
  }

  const changeEmail = async() => {
    setDisable(true)
    const user = auth.currentUser;
    console.log(email)
    if(email===user.email){
    Reauthenticate(password).then(() => {
      user.updateEmail(newEmail).then(async() => {
        console.log("Email updated!");
        const userRef= await firestore.collection('users').doc(user.uid)
        await userRef.update({email: newEmail}).then(()=> {
        console.log("doc updated");
        setDisable(false)
        setSuccess("Email Updated")
        setError("")
        props.onHide();
      })
    .catch((e)=>console.log(e.message))
      }).catch((error) => { console.log(error); });
    }).catch(() => { 
        setSuccess("")
        setError("Invalid Password")
    });
    }
    else{
        setSuccess("")
        setError("Current email does not match")
    }
  }

  useEffect(()=>{
    return ()=> {
      setNewemail();
    }
  })

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
            Change Email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {success && (
          <Alert severity="success" classes={{icon:classes.alerticon}} className={classes.alert} >
          {error}
        </Alert>
        )}
        {error && (
          <Alert severity="error" classes={{icon:classes.alerticon}} className={classes.alert} >
          {error}
        </Alert>
        )}
          <Form>
            <Form.Group controlId="formBasicCurrent">
              <Form.Label>Enter Current Email</Form.Label>
              <Form.Control type="email" placeholder="Current Email" value={email} name="currentEmail" onChange={(e)=>onChangeHandler(e)}/>
            </Form.Group>
            <Form.Group controlId="formBasicnew">
              <Form.Label>Enter New Email</Form.Label>
              <Form.Control type="email" placeholder="New Email" value={newEmail} name="newEmail" onChange={(e)=>onChangeHandler(e)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control type="password" value={password} placeholder="Enter password of current email" name="Password" onChange={(e)=>onChangeHandler(e)}/>
            </Form.Group>
          </Form>
                    
        </Modal.Body>
        <Modal.Footer>
            <Button disabled={disable} type="submit" onClick={changeEmail} >{disable?"Updating":"Confirm"}</Button>
          <Button disbaled={disable} onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default Edit_Email;