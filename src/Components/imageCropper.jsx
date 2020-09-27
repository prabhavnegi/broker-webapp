import React,{useState} from "react"
import "cropperjs/dist/cropper.min.css";
import {Modal,Button} from "react-bootstrap";
import HandleCrop from "./handleCrop";
import {updateProfile} from "../firebase";




const ImageCropper = (props) => {
        const [show, setShow] = useState(false);
        const [image,setImage] = useState();
        const [cropImg,setCropImg] = useState()
        const [name,setName] = useState()
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        const getImage = (e) => {
          setName(e.target.files[0].name)
          setImage(window.URL.createObjectURL(e.target.files[0]))
          handleShow()
        }

        const handleUpload = () => {
          console.log(cropImg)
          updateProfile(cropImg,name).then(()=>{
             window.alert("profile Updated")
             handleClose()
          }).catch(err=>{
             console.log(err.message)
          })
}

    return(
        <div>
         {!show && <input type="file" multiple onChange={getImage}/>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxWidth:"40%"}}>
          { image && <HandleCrop url={image} set={setCropImg}/> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
           
            
    )
}

export default ImageCropper;