import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import ClientList from './ClientList.jsx';

const SelectClient=(props)=>{

    const submitter= async ()=>{
        console.log("clients done")
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
            Select Client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientList/>                    
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={submitter}>Submit</Button>
          <Button onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default SelectClient;