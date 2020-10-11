import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
const Edit_Profile=(props)=>{
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="phone" placeholder="Contact" />
            </Form.Group>
          </Form>
                    
        </Modal.Body>
        <Modal.Footer>
            <Button >Save Changes</Button>
          <Button onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default Edit_Profile;