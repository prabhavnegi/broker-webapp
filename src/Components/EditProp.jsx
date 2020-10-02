import React ,{useEffect,useState}from "react"
import {auth,firestore,storage,FieldValue,updatePropInfo,storageDel} from "../firebase";
import { useHistory } from "react-router";

const EditProp = (props) => {
    const [propName,setpropName]= useState();
    const [propAddr,setpropAddr]= useState();
    const [URL,setURL]=useState();
    const history=useHistory();

    useEffect( () => {
        getUser()
        },[]) 
      
    const getUser =  async () => {
        const user = auth.currentUser
        const userRef = firestore.collection('users');
        const properties =  await userRef.doc(`${user.uid}`).collection('property_details').doc(props.match.params.id).get();
        setpropName(properties.data().name)
        setpropAddr(properties.data().address)
        setURL(properties.data().URL)
    }

    const onChangeHandler = e => {
        if (e.target.name === "propAddr")
            setpropAddr(e.target.value)
    }

    const updatePropertyInfo = async () => {      
        updatePropInfo(propAddr,props.match.params.id).then(()=>{
            alert("Property Info updated")
            getUser()
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const deletePhoto=async(image)=> {
        const user=await auth.currentUser;
        const userRef = await firestore.collection('users').doc(user.uid).collection('property_details').doc(propName);
        userRef.update({URL:FieldValue.arrayRemove(image)});
        console.log("image deleted")
        storage.ref().child(user.uid).child(image).delete()
        console.log("storage")
        getUser();
      }

    const deleteProp=async()=>{
        const user=await auth.currentUser;
        const docRef = await firestore.collection('users').doc(user.uid).collection('property_details').doc(propName);
        docRef.delete().then(function() {
            console.log("Property successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing property: ", error);
        });
        storageDel(propName);
        history.push("/")
    }
    
    return(
        <div>
            <button type="button" className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 text-white" onClick={()=>deleteProp()}>Delete Property</button>
            <form>
                    <label htmlFor="propName" className="block">
                        Property Name:
                    </label>
                    <p>{propName}</p>
                    <label htmlFor="PropAddr" className="block">
                        Address:
                    </label>
                    <input type="text" className="my-1 p-1 w-full " name="propAddr" id="propAddr"
                        value={propAddr} onChange={event => onChangeHandler(event)} />
                    <button type="button" className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={()=>updatePropertyInfo()}>Save Changes</button>
            </form>
            {URL && URL.map(img => (
                <div>
                <img src={img} style={{height:"400px", width:"400px"}}/>
                <button onClick={() => {deletePhoto(img)}}>remove</button>
                </div>
            ))
            }
        </div>
    )
}

export default EditProp;