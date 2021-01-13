import React,{useState,useEffect} from 'react';
import {Modal,Button,Row,Container,Col} from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"
import Upload from './Upload/Upload';

const ViewProperty=(props)=>{

    const [pAddr,setAddr]=useState()
    const [uploadImg,showuploadImg] = useState(false);
    const [ImgURL,setImgURL] = useState([]);
    const [disable,setDisable]=useState(false)

    console.log(props.propdetails)
            
  useEffect(() => {
    const setImg = () => {
      props.propdetails.URL.map((url) => (
        setImgURL(ImgURL=>[...ImgURL,<img key={url}src={url} style={{height:"inherit",width:"inherit"}} alt="alt"/>])
    ))  
    }
    setImg()
  }, []);
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={disable?"static":true}
        keyboard = {disable?"false":"true"}
      >
        <Upload show={uploadImg} pName={props.pName} pAddr={pAddr}  onHide={()=>{showuploadImg(false)}}></Upload>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            View Property Images
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Container>
                <Row>
                    <h1>Property Name: {props.propdetails.name}</h1>      
                </Row>
                <Row>
                    <button style={{marginBottom:"3%"}} onClick={()=> {showuploadImg(true);setAddr(props.propdetails.address);setDisable(true)}}>Add Image</button>
                </Row>
                <Row className="justify-content-md-center">
                       <Col lg={10} md={10}>
                          <AliceCarousel  items={ImgURL} disableAutoPlayOnAction={true} autoWidth autoPlay autoPlayInterval={3000} />
                       </Col>
                </Row>
                        
                
                
             
              </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default ViewProperty;