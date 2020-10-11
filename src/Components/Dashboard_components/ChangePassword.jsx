import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
const Change_Password=(props)=>{
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCurrent">
              <Form.Label>Enter Current Password</Form.Label>
              <Form.Control type="password" placeholder="Current Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control type="password" placeholder="New Password" />
            </Form.Group>
            <Form.Group controlId="formBasicChangedPassword">
              <Form.Label>Re-Enter New Password</Form.Label>
              <Form.Control type="password" placeholder="New Password" />
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

export default Change_Password;