import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';



const AddClientRecord=(props)=>{
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Client Record
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCurrent">
              <Form.Label>Enter Client Name</Form.Label>
              <Form.Control type="password" placeholder="Name of client" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter Contact Number</Form.Label>
              <Form.Control type="password" placeholder="Contact No of Client" />
            </Form.Group>
          </Form>
                    
        </Modal.Body>
        <Modal.Footer>
            <Button >Submit</Button>
          <Button onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default AddClientRecord;