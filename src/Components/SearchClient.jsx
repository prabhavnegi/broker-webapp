import React,{useState} from 'react';
import {searchByname,searchByphoneno} from "../firebase"


const SearchClient=()=>{
    const [filter,setFilter]=useState(" ");
    const changeHandler=(e) =>{
        setFilter(e.target.value)
    }
    const searchBy=(filter)=>{
        if(filter.value=="Name")
            searchByname();
    }

    return(
        <div>
            <h1>Search by:</h1>
            <input type="radio" value="Name" onChange={(event)=>{changeHandler(event)}}/>Name
            <br/>
            <input type="radio" value="Phoneno" onChange={(event)=>{changeHandler(event)}}/>Phoneno
            <button className = "w-full py-3 bg-yellow-600 mt-4 text-white" onClick = {() => {searchBy(filter)}}>select</button>
        </div>
    );
}

export default SearchClient;