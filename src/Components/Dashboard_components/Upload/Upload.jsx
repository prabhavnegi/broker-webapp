import React, { useEffect } from "react";
import {storage, generatePropDocument,auth} from "../../../firebase";
import {useState} from 'react';
import {Modal,Button,Form,Image,Row,Col} from 'react-bootstrap';
import './Upload.css';


//props match id location state
const Upload= (props) => {
 
  const [progress,setProgress] = useState(0);
  const [property,setProperty] = useState(props.pName||"");
  const [addr,setAddr]=useState(props.pAddr||"");
  const [disable,setDisable] = useState(false)
  const [files, setFiles] = useState([])

  const user = auth.currentUser
  
  const handleChange = e => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
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
    if (!files.length)
      props.onHide()
    e.preventDefault(); // prevent page refreshing
    setDisable(true)
    
    const promises = []
    files.forEach(file => {
     const uploadTask = storage.ref(`${user.uid}/${property}/${file.name}`).put(file);
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
              .ref(`${user.uid}/${property}/`)
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                return url
              });
            updateDoc(db_url)
            }
             );
           });
       Promise.all(promises)
        .then(() => {setDisable(false)})
        .catch(err => console.log(err.code));
        
 }

  const updateDoc= (url) => {
     generatePropDocument(user,property,addr,url);
     
  }

  const delImageHandler = (file) => {
    console.log(file)
     const arr = files.filter(item => item !== file)
     setFiles(arr)
  }

  useEffect(()=>{
    return ()=>{
      console.log(files.length)
      if(files.length)
      {
        console.log("uploaded")
        props.setUpdater(true)
        setAddr("");
        setFiles([]);
        setProgress(0);
        setProperty("");
      }
      else
        console.log("upload closed")
    }
  },[])


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={disable?"static":true}
        keyboard = {disable?"false":"true"}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Upload Property Here</h4>
          <Form>
            {props.pName ? 
            <div>
            <h2>Property Name:{props.pName}</h2>
            <h4>Property Address:{props.pAddr}</h4>
            </div>
            :
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
            }
            <Form.Group controlId="formBasicPassword">
              <input type="file" multiple onChange={handleChange} />
            </Form.Group>
          </Form>
            <div className="row">
                <progress value={progress} max="100" className="progress" />
                </div>
          <Row noGutters style={{padding:"20px 0"}}>
                {files && files.map((file,i)=>(
                    <Col key={i} xs={3} style={{padding:"10px",position:"relative"}}>
                      <div  className="imgCard" style={{overflow:"hidden",height:"96.5px"}}>
                        <Image className="img" fluid style={{minHeight:"100%",objectFit:"cover"}} onClick={()=>delImageHandler(file)} rounded src={URL.createObjectURL(file)}/>
                      </div>
                    </Col>
                    ))}
                </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button disabled={disable} onClick={handleUpload} >{disable?"Uploading":"Upload"}</Button>
          <Button disabled={disable} onClick={()=>{props.onHide()}} >Close</Button>
        </Modal.Footer>
      </Modal>
         
    );
  }


export default Upload;