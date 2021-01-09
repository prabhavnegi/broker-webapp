import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import DataTable from './PropertyList';

const SelectProperty=(props)=>{

    const submitter= async ()=>{
        console.log("property done")
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
            Select Property
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable/>                    
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={submitter}>Submit</Button>
          <Button onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default SelectProperty;