import React from "react";
import {storage, generatePropDocument,auth} from "../firebase";
import {useState,useEffect} from 'react';
import {useHistory} from "react-router";

const Upload= (props) => {
 
  const [progress,setProgress] = useState(0);
  const [property,setProperty] = useState();
  const [url,setUrl]= useState("");
  const [addr,setAddr]=useState("");
  const [uid,setUid]=useState("");
  const user = auth.currentUser
  const history = useHistory();

  const [files, setFiles] = useState([])

  useEffect(() => {
    if(!props.location.state)
      history.push("/")
    else
      setProperty(props.match.params.id)
      setUid(props.location.state)
  }, [])

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
      <div className="center">
          <button type="button" className="bg-orange-400 hover:bg-orange-500 w-full py-2 text-white" onClick={()=>history.push("/")}>Profile Page</button>
          <br/>
          <h2 className="green-text">React Firebase Image Uploader</h2>
          <br/>
          <br/>
        <div className="row">
          <progress value={progress} max="100" className="progress" />
        </div>
        <br />
        <br />
        <br />
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" multiple onChange={handleChange} />
            { !props.match.params.id &&<div>
              <input type="text" onChange={handleProperty} name="property" value={property} placeholder="property"/>
              <textarea  onChange={handleAddr} name="addr" value={addr} placeholder="Address"/>
              </div>}
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          onClick={handleUpload}
          className="waves-effect waves-light btn"> Upload
        </button>
        <br />
        <br />
        <img
          src={url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
         </div>
         
    );
  }


export default Upload;