import React ,{useEffect,useState}from "react"
import {auth,generateUserDocument,updatePassword, updateUserInfo, updateProfile,Reauthenticate,firestore} from "../firebase";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";


const EditProfile = () => {
    const [displayName, setDp] = useState();
    const [Email, setEmail] = useState("");
    const [newEmail,setNewemail]=useState("")
    const [password, setPassword] = useState("");
    const [Npassword, setNewPassword] = useState("");
    const [Cpassword, setConfirmPassword] = useState("");
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState();
    const [profilePic, setProfilePic] = useState("");
    const [success,setSuccess] = useState();
    const [isLoading,setLoading] = useState(false); 
    const [emailflag,setEmailflag]=useState(false)
    const [userpass,setUserpass]=useState("")
    const [newProfile,setNewProfile] = useState();
    let history = useHistory();


    const getUser = async () => {
        const user = auth.currentUser
        const userDoc = await generateUserDocument(user,{},"edit")
        setDp(userDoc.displayName)
        setProfilePic(userDoc.photo_url)
        setLoading(true)
    }
    useEffect(() => {
        getUser()
    },[])

    const handleUpload = (e) => {
                updateProfile(e.target.files[0]).then(()=>{
                setSuccess("Profile Updated")
                setError("")
                getUser()
                }).catch(err=>{
                    setError(err.message)
                })
    }


    const onChangeHandler = e => {
            if (e.target.name === "displayName")
                setDp(e.target.value)
            if (e.target.name === "userEmail")
                setEmail(e.target.value)
            if (e.target.name ==="userPassword")
                setPassword(e.target.value)
            if (e.target.name ==="NewPassword")
                setNewPassword(e.target.value)
            if (e.target.name ==="ConfirmPassword")
                setConfirmPassword(e.target.value)
            if (e.target.name ==="userPassword")
                setUserpass(e.target.value)
            if (e.target.name ==="newEmail")
                setNewemail(e.target.value)
    }
    const changePassword = () => {
        if(Cpassword===Npassword)
                  updatePassword(password,Npassword).then(()=>{
                    setError("") 
                    setSuccess("password changed successfully")
                    setConfirmPassword("")
                    setNewPassword("")
                    setPassword("")
                    setFlag(false)
                 }).catch(e=>{
                        console.log(e)
                        setSuccess("")
                        setError("Invalid Password")
                        
                    })
            else{
                 setSuccess(false)
                setError("New Password didn't match")
            }
               
     }

     const changeEmail = async() => {
        var user = auth.currentUser;
        if(Email==user.email){
        Reauthenticate(userpass).then(() => {
          user.updateEmail(newEmail).then(async() => {
            console.log("Email updated!");
            const userRef= await firestore.collection('users').doc(user.uid)
            await userRef.update({email: newEmail}).then(()=> {
            console.log("doc updated");
            setSuccess("Email Updated")
            setError("")
          })
        .catch((e)=>console.log(e.message))
          }).catch((error) => { console.log(error); });
        }).catch(() => { 
            setSuccess("")
            setError("Invalid Password")
        });
        }
        else{
            setSuccess("")
            setError("Current email does not match")
        }
      }

    const updateProfileInfo = async () => {      
            updateUserInfo(displayName).then(()=>{
                setSuccess("Display name Updated")
                setError("")
                getUser()
            })
            .catch(e=>{
                setError(e)
                setSuccess("")
            })
    }

    const updateFlag = () => {
        setFlag(!flag)
        setPassword("")
        setConfirmPassword("")
        setNewPassword("")
    }

    const updateEflag = () => {
        setEmailflag(!emailflag)
        setUserpass("")
    }
    return(
        !isLoading ? "":
        <div className="mt-8">
        <h1 className="text-3xl mb-2 text-center font-bold">Account</h1>
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <div 
          style={{
            background: `url(${profilePic || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})`,
            height: "200px",
            width: "200px",
            margin:"auto",
            backgroundSize:"100%"
          }}
          className="border border-blue-300" 
        > <input style={{ cursor:"pointer",opacity:"0",height: "200px", width: "200px",}} type="file" title="Upload Photo" multiple onChange={handleUpload}/>
        </div>
        {success && (
          <div className="py-4 bg-green-600 w-full text-white text-center mb-3">
            {success}
          </div>
        )}
        {error && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <Link to="/EditProfile/updateProfile"><button className = "w-full py-3 bg-blue-600 mt-4 text-white">Update Profile Picture</button></Link>
        
              <form className="">
                    <label htmlFor="displayName" className="block">
                        Display Name:
                    </label>
                    <input type="text" className="my-1 p-1 w-full " name="displayName" id="displayName"
                        value={displayName} onChange={event => onChangeHandler(event)} />
                    <button type="button" className=" bg-pink-600 hover:bg-pink-800 w-full py-2 text-white" onClick={()=>{updateEflag()}}>Change Email</button>
                    {emailflag && <div>
                        <label htmlFor="userEmail" className="block">Email:</label>
                        <input type="email" className="my-1 p-1 w-full" name="userEmail" id="userEmail" 
                        value={Email} onChange={event => onChangeHandler(event)} />
                        <label htmlFor="newEmail" className="block">New Email:</label>
                        <input type="email" className="my-1 p-1 w-full" name="newEmail" id="newEmail" 
                        value={newEmail} onChange={event => onChangeHandler(event)} />
                        <label htmlFor="userpass" className="block"> Enter Password:</label>
                        <input type="password" className="mt-1 mb-3 p-1 w-full" name="userPassword" value={userpass} id="userPassword"
                            onChange={event => onChangeHandler(event)}/>
                        <button type="button" className=" bg-purple-700 hover:bg-purple-900 w-full py-2 text-white" onClick={()=>{changeEmail()}}>Save Email</button>
                    </div> }
                    <button type="button" className=" bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" onClick={()=>{updateFlag()}}>Change Password</button>
                    {flag && <div>
                        <label htmlFor="CurrentPassword" className="block"> Current Password:</label>
                        <input type="password" className="mt-1 mb-3 p-1 w-full" name="userPassword" value={password} id="userPassword"
                            onChange={event => onChangeHandler(event)}/>
                        <label htmlFor="NewPassword" className="block">New Password:</label>
                        <input type="password" className="mt-1 mb-3 p-1 w-full" name="NewPassword" value={Npassword} id="NewPassword"
                            onChange={event => onChangeHandler(event)}/>
                        <label htmlFor="ConfirmPassword" className="block">Confirm Password:</label>
                        <input type="password" className="mt-1 mb-3 p-1 w-full" name="ConfirmPassword" value={Cpassword} id="ConfirmPassword"
                            onChange={event => onChangeHandler(event)}/>
                        <button type="button" className=" bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" onClick={()=>{changePassword()}}>Save Password</button>
                    </div> }

                    <button type="button" className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={()=>updateProfileInfo()}>Save Changes</button>
                    <button type="button" className="bg-orange-400 hover:bg-orange-500 w-full py-2 text-white" onClick={()=>history.push("/")}>Profile Page</button>
            </form>
        </div>
    </div>
    )
}

export default EditProfile;