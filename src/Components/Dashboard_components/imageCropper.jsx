import React,{useState,useEffect,createRef} from "react"
import "cropperjs/dist/cropper.min.css";
import {Modal,Button} from "react-bootstrap";
import HandleCrop from "./handleCrop";
import {updateProfile} from "../../firebase";

const ImageCropper = (props) => {
        const [image,setImage] = useState();
        const [cropImg,setCropImg] = useState()
        const [name,setName] = useState()
        const [disable,setDisable] = useState(false);

        const checkClick = createRef()

        const getImage = (e) => {

          console.log(e.target.files[0].name)
          setName(e.target.files[0].name)
          setImage(window.URL.createObjectURL(e.target.files[0]))
  
        }

        const handleUpload = () => {
          if(!image)
            props.onHide();
          setDisable(true)
          updateProfile(cropImg,name).then(()=>{
             setDisable(false)
             props.onHide();
          }).catch(err=>{
              setImage();
              console.log(err.message)
          })
}
 
  useEffect(() => {
    console.log("hello")
    return () =>{
      console.log("byebye")
      setImage()
    }
     
  },[])

    return(
      <Modal 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={true}
        keyboard = {disable?"false":"true"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <br/>
        <div  style={{marginLeft: "50px"}}>
        {!image &&<input type="file" onChange={getImage}/>}
        </div>
        <Modal.Body style={{height:"50%"}}>
          { image && <HandleCrop  url={image} set={setCropImg}/> }
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={disable} variant="secondary" onClick={()=>{props.onHide()}}>
            Close
          </Button>
          <Button variant="primary" disabled={disable} onClick={handleUpload}>
            {disable?"Uploading":"Save"}
          </Button>
        </Modal.Footer>
        </Modal>
        
           
            
    )
}

export default ImageCropper;