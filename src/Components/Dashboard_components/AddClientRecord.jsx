import React,{useState, useEffect} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {generateClients} from '../../firebase';


const AddClientRecord=(props)=>{
  const [name,newname]=useState('');
  const [phoneno,newphoneno]=useState('');
  const [disable,setDisable] = useState(false);

  const submitter= async ()=>{
     setDisable(true)
     await generateClients(name,phoneno);
     setDisable(false)
     props.clientUpdater(true)
     props.onHide();
  }

  useEffect(()=> {
    console.log("add client")
    return () =>{
      console.log("close client")
      newname('');
      newphoneno('');
    }
  },[])

    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={disable?"static":true}
        keyboard={disable?"false":"true"}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Client Record
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Enter Client Name</Form.Label>
              <Form.Control type="text" placeholder="Name of client" onChange={(event)=>{newname(event.target.value)}} />
            </Form.Group>
            <Form.Group controlId="formBasicNumber">
              <Form.Label>Enter Contact Number</Form.Label>
              <Form.Control type="tel" placeholder="Contact No of Client" onChange={(event)=>{newphoneno(event.target.value)}}/>
            </Form.Group>
          </Form>
                    
        </Modal.Body>
        <Modal.Footer>
            <Button disabled={disable} onClick={submitter}>{disable?"Adding":"Submit"}</Button>
            <Button disabled={disable} onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default AddClientRecord;