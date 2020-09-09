import React ,{useEffect,useState}from "react"
import {useHistory} from "react-router"
import {generateUserDocument,updateProfile} from "../firebase"

const EditProfile = () => {
    const [displayName, setDp] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Npassword, setNewPassword] = useState("");
    const [Cpassword, setConfirmPassword] = useState("");
    const [flag, setFlag] = useState(false)
    const [error, setError] = useState()
    
    const getUser = async () => {
        const user = await generateUserDocument()
        setDp(user.displayName)
        setEmail(user.email)
    }
    useEffect(() => {
        getUser()

    },[])

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

    const updateProfileInfo = () => {
        if(flag) {
            if(Cpassword==Npassword)
                updateProfile(Email,displayName,password,Npassword)
            else
                setError("Password didn't match")
        }
        else
            updateProfile(Email,displayName)  
    }

    const updateFlag = () => {
        setFlag(!flag)
    }
    return(
        <div className="mt-8">
        <h1 className="text-3xl mb-2 text-center font-bold">Edit Profile</h1>
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
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
                     <button type="button" className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={()=>{updateFlag()}}>Change Password</button>
                    {flag && <div>
                        <label htmlFor="CurrentPassword" className="block"> Current Password:</label>
                        <input type="password" className="mt-1 mb-3 p-1 w-full" name="userPassword" value={password} id="userPassword"
                            onChange={event => onChangeHandler(event)}/>
                        <label htmlFor="NewPassword" className="block">New Password:</label>
                        <input type="password" className="mt-1 mb-3 p-1 w-full" name="NewPassword" value={Npassword} id="userPassword"
                            onChange={event => onChangeHandler(event)}/>
                        <label htmlFor="ConfirmPassword" className="block">Confirm Password:</label>
                        <input type="password" className="mt-1 mb-3 p-1 w-full" name="ConfirmPassword" value={Cpassword} id="userPassword"
                            onChange={event => onChangeHandler(event)}/>
                    </div> }

                    <button type="button" className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={()=>updateProfileInfo()}>Save Changes</button>
            </form>
        </div>
    </div>
    )
}

export default EditProfile;