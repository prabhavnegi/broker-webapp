import React,{useEffect, useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {updatePassword} from '../../firebase';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  alert: {
    fontSize: "18px",
    padding: "10px 20px",
    alignItems: "center",
    marginTop:"20px",
    marginBottom: "20px",
    borderRadius:"20px"
  },
  alerticon:{
    fontSize:"2rem"
  },
}));

const Change_Password=(props)=>{

  const [password,setPassword]=useState();
  const [Npassword,setNewPassword]=useState();
  const [Cpassword,setConfirmPassword]=useState();
  const[error,setError]=useState();
  const[success,setSuccess]=useState();
  const [disable,setDisable]=useState(false);

  const onChangeHandler=(e)=>{
    if (e.target.name ==="userPassword")
        setPassword(e.target.value)
    if (e.target.name ==="newPassword")
        setNewPassword(e.target.value)
    if (e.target.name ==="confirmPassword")
        setConfirmPassword(e.target.value)
  }

  const changePassword = () => {
    setDisable(true)
    if(Cpassword===Npassword)
              updatePassword(password,Npassword).then(()=>{
                setSuccess("password changed successfully")
             }).catch(e=>{
                    console.log(e)
                    setError("Invalid Password")
                    
                })
        else{
             setSuccess(false)
            setError("New Password didn't match")
        }
      }

 useEffect(()=>{
   return ()=>{
     console.log("changepwd")
    setConfirmPassword("")
    setNewPassword("")
    setPassword("")
   }
 },[])

  const classes=useStyles();
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
            Change Password
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
            <Form.Group controlId="formBasicCurrent">
              <Form.Label>Enter Current Password</Form.Label>
              <Form.Control type="password" name="userPassword" value={password}  onChange={event => onChangeHandler(event)} placeholder="Current Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control type="password" name="newPassword" value={Npassword}  onChange={event => onChangeHandler(event)} placeholder="New Password" />
            </Form.Group>
            <Form.Group controlId="formBasicChangedPassword">
              <Form.Label>Re-Enter New Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={Cpassword}  onChange={event => onChangeHandler(event)} placeholder="Confirm Password" />
            </Form.Group>
          </Form>
                    
        </Modal.Body>
        <Modal.Footer>
            <Button disabled={disable} onClick={changePassword}>{disable?"Updating":"Save Changes"}</Button>
          <Button disabled={disable} onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default Change_Password;