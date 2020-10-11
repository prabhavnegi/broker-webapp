import React from "react";
import {storage, generatePropDocument,auth} from "../../firebase";
import {useState,useEffect} from 'react';
import {useHistory} from "react-router";
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

//props match id location state
const Upload= (props) => {
 
  const [progress,setProgress] = useState(0);
  const [property,setProperty] = useState();
  const [url,setUrl]= useState("");
  const [addr,setAddr]=useState("");
  const [uid,setUid]=useState("");
  const user = auth.currentUser
  const history = useHistory();

  const [files, setFiles] = useState([])

  

  const handleChange = e => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
   // add an "id" property to each File object
      setFiles(prevState => [...prevState, newFile]);
    }
  };


 const handleProperty = e => {
      setProperty(e.target.value)
  };

  const handleAddr = e => {
    setAddr(e.target.value)
};

const handleUpload = e => {
  e.preventDefault(); // prevent page refreshing
    const promises = []
    files.forEach(file => {
     const uploadTask = storage.ref(`${uid.uid}/${property}/${file.name}`).put(file);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          snapshot => {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            // Error function ...
            console.log(error);
          },
          async () => {
            // complete function ...
         const  db_url = await storage
              .ref(`${uid.uid}/${property}/`)
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                setUrl(url);
                return url
              });
            updateDoc(db_url)
            }
             );
           });
       Promise.all(promises)
        .then(() => alert('All files uploaded'))
        .catch(err => console.log(err.code));
 }

  const updateDoc= (url) => {
    console.log(url);
     generatePropDocument(user,property,addr,url);
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
            Upload
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Upload Property Here</h4>
          <Form>
            
            <div>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Property Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={property} onChange={handleProperty} />
          </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Property Address</Form.Label>
              <Form.Control type="text" placeholder="Address" onChange={handleAddr} value={addr}/>
            </Form.Group>
            </div>
            <Form.Group controlId="formBasicPassword">
              <input type="file" multiple onChange={handleChange} />
            </Form.Group>
            <div className="row">
          <progress value={progress} max="100" className="progress" />
        </div>
          </Form>
                    
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleUpload} >Submit</Button>
          <Button onClick={props.onHide} >Close</Button>
        </Modal.Footer>
      </Modal>
         
    );
  }


export default Upload;