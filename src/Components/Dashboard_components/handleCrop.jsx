import React,{useEffect}from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { createRef } from "react";

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

    },[])
    
    return (
       <div> 
        <div>
            <img ref={imageElement} style={{height:"auto",width:"100%"}}src={props.url} alt="profilePic"/>
        </div>
    </div>
        
    )
}

export default HandleCrop;