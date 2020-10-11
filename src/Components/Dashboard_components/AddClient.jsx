import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';


function MyVerticallyCenteredModal(props) {
    const [name,newname]=useState('');
    const [phoneno,newphoneno]=useState('');
    const submitter=()=>{
        console.log("okay")
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
              <input placeholder="Enter Name" onChange={(event)=>{newname(event.target.value)}}></input>
              <input placeholder="Enter phone number" onChange={(event)=>{newphoneno(event.target.value)}}></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={submitter,props.onHide}>Submit</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default  MyVerticallyCenteredModal;