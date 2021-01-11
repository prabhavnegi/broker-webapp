import React,{useEffect,createRef}from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

const HandleCrop = (props) => {
    const imageElement= createRef()
    useEffect(()=>{
        const cropper = new Cropper(imageElement.current, {
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            movable: false,
            cropBoxResizable: false,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                canvas.toBlob((blob) => {
                    props.set(blob)
            })
        }

        })

    },[props,imageElement])
    
    return (
       <div> 
        <div style={{maxWidth:"60%"}}>
            <img ref={imageElement} src={props.url} alt="profilePic"/>
        </div>
    </div>
        
    )
}

export default HandleCrop;