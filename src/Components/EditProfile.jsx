import React ,{useEffect,useState}from "react"
import {generateUserDocument,updatePassword, updateUserInfo, updateProfile} from "../firebase"
import { useHistory } from "react-router";
const EditProfile = () => {
    const [displayName, setDp] = useState();
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Npassword, setNewPassword] = useState("");
    const [Cpassword, setConfirmPassword] = useState("");
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState();
    const [profilePic, setProfilePic] = useState("");
    const [success,setSuccess] = useState();
    const [isLoading,setLoading] = useState(false); 
    let history = useHistory();


    const getUser = async () => {
        const user = await generateUserDocument()
        setDp(user.displayName)
        setEmail(user.email)
        setProfilePic(user.photo_url)
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
    return(
        !isLoading ? "":
        <div className="mt-8">
        <h1 className="text-3xl mb-2 text-center font-bold">Account</h1>
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <div 
          style={{
            background: `url(${profilePic || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
            margin:"auto"
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
              <form className="">
                    <label htmlFor="userEmail" className="block">
                        Email:
                    </label>
                    <input type="email" className="my-1 p-1 w-full" name="userEmail" id="userEmail" 
                    value={Email} onChange={event => onChangeHandler(event)} />
                    <label htmlFor="displayName" className="block">
                        Display Name:
                    </label>
                    <input type="text" className="my-1 p-1 w-full " name="displayName" id="displayName"
                        value={displayName} onChange={event => onChangeHandler(event)} />
                    <button type="button" className=" bg--400 hover:bg-cyan-500 w-full py-2 text-white" onClick={()=>{updateFlag()}}>Change Password</button>
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