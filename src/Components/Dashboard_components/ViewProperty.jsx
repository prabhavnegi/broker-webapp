import React,{useState,useEffect} from 'react';
import {auth,firestore,getUserDocument} from '../../firebase';
import {Link} from "react-router-dom";
import {Modal,Button} from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"
import Upload from './Upload/Upload';

const ViewProperty=(props)=>{

    const [user,setUser] = useState({})
    const [docs,setDocs] = useState([])
    const [hidden,setHidden] = useState({})
    const [pAddr,setAddr]=useState()
    const [uploadImg,showuploadImg] = useState(false);
    const [propDetails,showpropDetails] = useState(props.propDetails.URL);
            
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Upload show={uploadImg} pName={props.pName} pAddr={pAddr}  onHide={()=>{showuploadImg(false)}}></Upload>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            View Property Images
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
              <div>
                <h1>Property Name: {props.propDetails.name}</h1>
                <button onClick={()=> {showuploadImg(true);setAddr(props.propDetails.address)}}>Add Image</button>

              <AliceCarousel autoPlay autoPlayInterval={3000}>
                {propDetails.map((url,i) =>(
                    <div key={i}>
                      <img key={url}src={url} alt="alt"/>
                    </div>
                  ))  
                } 
                </AliceCarousel> 
              </div>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default ViewProperty;