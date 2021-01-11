import React,{useState} from 'react';
import {generateClients,auth,firestore} from '../firebase';
import { useHistory } from 'react-router';

const AddClient=(props) => {
    const [name,newname]=useState('');
    const [phoneno,newphoneno]=useState('');
    const [data,setData]= useState();
    const [flag,setFlag]= useState(false);
    const [filter,setFilter]=useState("");
    const [val,setVal]=useState({});
    const [search,setSearch]=useState();
    const selected=new Set();

    const [docs,setDocs]=useState([]);
    const [propflag,setPropflag]=useState(false);
    const [propCheck,setPropcheck]=useState(false);
    const selectedProp=new Set();
    const history=useHistory();

    const submitter= async ()=>{
        console.log("adding")
       await generateClients(name,phoneno);
       getClients()
    }

    const getClients =  async () => {
      const user = auth.currentUser;
      const userRef = firestore.collection('users');
      const client=await userRef.doc(user.uid).collection('clients').doc(user.uid+"clients").get()
      if(client.data())
      {
        setData(client.data())
        setFlag(true)
      }
      else
        alert("No clients")
      
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
            data.clients.forEach(client => {
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
            data.clients.forEach(client => {
              if(client.phoneno===search)
             {
                console.log(client)
                setVal(client)
                setFlag(false)
              }
          })
        }
    }

    const delClient=async(n)=>{
      var user=auth.currentUser
      const userRef = firestore.collection('users').doc(user.uid).collection('clients').doc(user.uid+"clients");
      let i;
      data.clients.forEach((client,index) => {
        if(n===client.name)
          i=index
      })
      data.clients.splice(i,1);
    await  userRef.update({
        clients:data.clients
      })
      getClients()
    }

    const checkboxChange=(val)=>{
      if(selected.has(val))
        selected.delete(val);
      else
        selected.add(val);
    }
    
    const setClients=()=>{
      selected.forEach(client => {
        console.log(client)
      })
    }


    //prop functions 
    const Properties= ()=>{
      getProps()
   }

    const getProps =  async () => {
      var user=auth.currentUser
      const props = await firestore.collection('users').doc(user.uid).collection('property_details').get();
      const properties=props.docs
      properties.forEach(p => {
        const z = p.data()
        setDocs(docs=>[...docs,z])
      })
      setPropflag(true);
    }

    const PropboxChange=(e)=>{
      console.log(e.currentTarget.checked)
      if(e.currentTarget.checked)
        selectedProp.add(e.currentTarget.value);
      else
        selectedProp.delete(e.currentTarget.value)
    setPropcheck(true);
  }

  const setProps=()=>{
    selectedProp.forEach(prop => {
      console.log(prop)
    })
  }

    return (
      <div>
        <div>
        <button type="button" className="bg-orange-400 hover:bg-orange-500 w-full py-2 text-white" onClick={()=>history.push("/")}>Profile Page</button>
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
              <input type="checkbox" name="index" value={c.phoneno} onChange={(e)=>checkboxChange(e.target.value)}/><label>Name: {c.name}</label>
              <p>Phone no. : {c.phoneno}</p>
              <button onClick={()=>{let nm=c.name;delClient(nm)}}>Delete</button>
            </div>))
            :
            <div>
            <p>Name: {val.name} </p>
            <p>Phone no. : {val.phoneno}</p>
          </div>
        }
      </div>
      <button className = "w-full py-3 bg-green-600 mt-4 text-white" onClick={()=> {setClients()}}>Select Clients</button>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {Properties()}}>Show</button>
      {propflag &&  
        docs.map(p =>(  
            <div key={p.name}>
                <input type="checkbox" name="prop" value={p.name} onChange={PropboxChange}/><label>Property Name: {p.name}</label>
                <img src={p.URL[0]} alt="" style={{height:"100px",width:"100px"}}/>
            </div>
            ))
        }
        {propCheck?
        <div>
          <button className = "w-full py-3 bg-green-600 mt-4 text-white" onClick={()=> {setProps()}}>Select</button>
          <br/>
          <button type="button" className="bg-purple-700 hover:bg-purple-900 w-full py-2 text-white" onClick={()=>history.push("/Pdf")}>Pdf Generator</button>
        </div> :""}

      </div>
    );
  }
export default  AddClient;