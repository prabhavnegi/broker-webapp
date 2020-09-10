import React,{useState} from 'react';
import {generateClients,auth,firestore} from '../firebase';

const AddClient=(props) => {
    const [name,newname]=useState('');
    const [phoneno,newphoneno]=useState('');
    const [data,setData]= useState();
    const [flag,setFlag]= useState();
    const [filter,setFilter]=useState("");
    const [val,setVal]=useState({});
    const [search,setSearch]=useState();

    const submitter= async ()=>{
        console.log("adding")
       await generateClients(name,phoneno);
       getClients()
    }

    const getClients =  async () => {
      const user = auth.currentUser;
      const userRef = firestore.collection('users');
      const client=await userRef.doc(user.uid).collection('clients').doc(user.uid+"clients").get()
      setData(client.data())
      setFlag(true)
    }
    
    const changeHandler=(e) =>{
      if(e.target.name === "search")
        setSearch(e.target.value)
      if(e.target.name === "filter")
        setFilter(e.target.value)
    }

    const Search= async ()=>{
        if(!filter) {console.log("empty");return;}
        if(filter==="Name")
        {
            data.clients.map(client => {
                if(client.name===search)
                {
                  console.log(client)
                  setVal(client)
                  setFlag(false)
                }
                  
            })
        }
        else
        {
            data.clients.map(client => {
              if(client.phoneno===search)
             {
                console.log(client)
                setVal(client)
                setFlag(false)
              }
          })
        }
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
        </div>

        <div className="border border-white-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <div>
        <h1>Search by:</h1>
            <input type="radio" name="filter" value="Name" onChange={(event)=>{changeHandler(event)}}/>Name
            <br/>
            <input type="radio" name="filter" value="Phoneno" onChange={(event)=>{changeHandler(event)}}/>Phoneno
            <br/>
        </div>
        <input type="text" className="my-1 p-1 w-full " name="search" value={search} placeholder={filter||"search"} onChange={(e) => {changeHandler(e)}}/>
            <button className = "w-full py-3 bg-yellow-600 mt-4 text-white" onClick = {() => {Search()}}>submit</button>
        </div>
      <div>
        <button className = "w-full py-3 bg-yellow-600 mt-4 text-white" onClick={()=> {getClients()}}>Client List</button>
        {flag?data.clients.map((c,index) => (
            <div key={index}>
              <p>Name: {c.name} </p>
              <p>Phone no. : {c.phoneno}</p>
            </div>))
            :
            <div>
            <p>Name: {val.name} </p>
            <p>Phone no. : {val.phoneno}</p>
          </div>
        }
      </div>
      
      </div>
    );
  }
export default  AddClient;