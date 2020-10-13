import React,{useState} from "react"
import "cropperjs/dist/cropper.min.css";
import {Modal,Button} from "react-bootstrap";
import HandleCrop from "./handleCrop";
import {updateProfile} from "../../firebase";

const ImageCropper = (props) => {
        const [image,setImage] = useState();
        const [cropImg,setCropImg] = useState()
        const [name,setName] = useState()


        const getImage = (e) => {
          setName(e.target.files[0].name)
          setImage(window.URL.createObjectURL(e.target.files[0]))
  
        }

        const handleUpload = () => {
          console.log(cropImg)
          updateProfile(cropImg,name).then(()=>{
             window.alert("profile Updated")
             props.onHide();
          }).catch(err=>{
             console.log(err.message)
          })
}

    return(
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <br/>
        <div  style={{marginLeft: "50px"}}>
        <input type="file" onChange={getImage}/>
        </div>
        <Modal.Body style={{height:"50%"}}>
          { image && <HandleCrop  url={image} set={setCropImg}/> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
        
           
            
    )
}

export default ImageCropper;