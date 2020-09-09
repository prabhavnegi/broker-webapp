import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom"
import {storage, deleteUser} from '../firebase';
import {auth,firestore,FieldValue,generateUserDocument} from "../firebase";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"



const ProfilePage =  () => {
  
const [user,setUser] = useState({})
const [docs,setDocs] = useState([])
const [hidden,setHidden] = useState({})

useEffect( () => {
  getUser()
  },[]) 

const getUser =  async () => {
  const user = await generateUserDocument()
  setUser(user)
  const userRef = firestore.collection('users');
  const properties =  await userRef.doc(`${user.uid}`).collection('property_details').get()
  properties.docs.forEach(p => {
    const z = p.data()
    setHidden(hidden=>({...hidden,[z.name]:false}))
    setDocs(docs=>[...docs,z])
  })
}

const delUser = () => {
  deleteUser(user);
  firestore.collection("users").doc(user.uid).delete()
  .then(()=> {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

const deletePhoto=async(image,pname)=> {
  const userRef = await firestore.collection('users').doc(user.uid).collection('property_details').doc(pname);
  userRef.update({URL:FieldValue.arrayRemove(image)});
  console.log("image deleted")
  storage.ref().child(user.uid).child(image).delete()
  console.log("storage")
}
const showImage = name => {
  setHidden({[name]:!hidden[name]})
}

  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${user.photo_url || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
        <h2 className = "text-2xl font-semibold">{user.displayName}</h2>
        <h3 className = "italic">{user.email}</h3>
        </div>
      </div>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {delUser()}}>Delete Account</button>
      <Link to="/EditProfile"><button className = "w-full py-3 bg-red-600 mt-4 text-white">Edit Profile</button></Link>
      <Link to={{pathname:"/Upload", state:{uid:[user.uid]}}}><button className = "w-full py-3 bg-red-600 mt-4 text-white">Upload</button></Link>
      <Link to=""><button className = "w-full py-3 bg-red-600 mt-4 text-white">Client Page</button></Link>
      <br></br>
      {
        docs.map(p =>(  

          <div key={p.name}>
              <h2 className = "text-2xl font-semibold"> {p.name} </h2>
              
              <button onClick={()=> showImage(p.name)}> Show Images </button>
              <h2>{p.address}</h2>

             { hidden[p.name] && <AliceCarousel autoPlay autoPlayInterval={3000}>
              {p.URL.map((url,i) =>(
                  <div key={i}>
                    <img key={url}src={url} alt=""/>
                    <button onClick={() => {deletePhoto(url,p.name)}}>remove</button>
                    <Link to={{pathname:`/Upload/${p.name}`, state:{uid:[user.uid]}}}><button>Add Image</button></Link>
                  </div>
                ))} 
              </AliceCarousel> }
          </div>
        ))
      }


    </div>

  ) 
};

export default ProfilePage;
