import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';

import {Form} from 'react-bootstrap';
const Edit_Email=(props)=>{

  const [email,setEmail]=useState();

    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCurrent">
              <Form.Label>Enter Current Email</Form.Label>
              <Form.Control type="email" placeholder="Current Email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password of current email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter New Email</Form.Label>
              <Form.Control type="email" placeholder="New Email" />
            </Form.Group>
          </Form>
                    
        </Modal.Body>
        <Modal.Footer>
            <Button >Confirm</Button>
          <Button onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default Edit_Email;