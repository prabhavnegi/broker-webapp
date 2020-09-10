import React,{useState} from 'react';
import {generateClients,auth,firestore} from '../firebase';

const AddClient=(props) => {
    const [name,newname]=useState('');
    const [phoneno,newphoneno]=useState('');
    const [data,setData]= useState();
    const [flag,setFlag]= useState();

    const submitter= ()=>{
        console.log("adding")
        generateClients(name,phoneno);
    }

    const getClients =  async () => {
      const user = auth.currentUser;
      const userRef = firestore.collection('users');
      const client=await userRef.doc(user.uid).collection('clients').doc(user.uid+"clients").get()
      setData(client.data())
      setFlag(true)
      console.log(client.data())
    }
    return (
      <div>
        <div>
          <p>Hello</p>
          <h4>Enter Client's Name and Phone number</h4>
          <form>
            <input placeholder="Enter Name" onChange={(event)=>{newname(event.target.value)}}></input>
            <input placeholder="Enter phone number" onChange={(event)=>{newphoneno(event.target.value)}}></input>
          </form>
          <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {submitter()}}>Submit</button>
          <button onClick={props.onHide}>Close</button>
        </div>
      <div>
        <button className = "w-full py-3 bg-yellow-600 mt-4 text-white" onClick={()=> {getClients()}}>Client List</button>
        {flag && data.clients.map((c,index) => (
          <div key={index}>
            <p>Name: {c.name} </p>
            <p>Phone no. : {c.phoneno}</p>
          </div>
        ))}
      </div>
      </div>
    );
  }
export default  AddClient;