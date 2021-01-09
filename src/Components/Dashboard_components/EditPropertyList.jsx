import React,{useState} from 'react';
import {updatePropInfo} from "../../firebase";
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

const EditPropertyList=(props)=>{
    const [propAddr,setpropAddr]=useState();

    const updatePropertyInfo = async () => {      
        updatePropInfo(propAddr,props.pName).then(()=>{
            console.log("property updated")
            props.getProps()
            props.onHide();
        })
        .catch(e=>{
            console.log(e.message)
        })
    }

    const submitter= async ()=>{
        updatePropertyInfo();
      }
    

    const onChangeHandler = e => {
      if (e.target.name === "propAddr")
        setpropAddr(e.target.value)
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
            Edit Property List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Property Name</Form.Label>
              <Form.Control type="text" value={props.pName}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Change Property Address</Form.Label>
              <Form.Control type="text" placeholder="Enter Property Address" name="propAddr" value={propAddr} onChange={(e)=> onChangeHandler(e)}/>
            </Form.Group>
        </Form>                   
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={submitter}>Submit</Button>
          <Button onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default EditPropertyList;