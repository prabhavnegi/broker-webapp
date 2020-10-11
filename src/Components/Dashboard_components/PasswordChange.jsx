import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';


function MyPasswordModal(props) {
    const [pswd,newpswd]=useState('');
    const [uppswd,newuppswd]=useState('');
    const [errorr,newerrorr]=useState('');
    const [confuppswd,newconfuppswd]=useState('');
    const checker=()=>{
        console.log("called checker");
        if(uppswd!==confuppswd){
            newerrorr("Passwords don't match");
            console.log("Dikkat");
        }
        else{
            submitter();
        }
    }
    const submitter=()=>{
       console.log(pswd)

    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Enter Client's Name and Phone number</h4>
          <form>
              <input placeholder="Current Password" onChange={(event)=>{newpswd(event.target.value)}}></input>
              <input placeholder="Enter New Password" onChange={(event)=>{newuppswd(event.target.value)}}></input>
              <input placeholder="Confirm New Password" onChange={(event)=>{newconfuppswd(event.target.value)}}></input>
                <h4>{errorr}</h4>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={checker}>Submit</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default MyPasswordModal;