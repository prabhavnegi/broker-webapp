import React, { useState,useEffect } from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {getUserDocument, updateUserInfo} from '../../firebase';

const Edit_Name=(props)=>{
  
    const [name,setName]=useState();

    const handleChange=(e)=>{
      setName(e.target.value)
    }

    const handleSubmit=()=>{
      updateUserInfo(name);
      props.onHide();
    }

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