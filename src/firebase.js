import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD0kYdi-FdfaQ3xxue5wYOvi16QIp62F5E",
    authDomain: "broker-8304b.firebaseapp.com",
    databaseURL: "https://broker-8304b.firebaseio.com",
    projectId: "broker-8304b",
    storageBucket: "broker-8304b.appspot.com",
    messagingSenderId: "179167505101",
    appId: "1:179167505101:web:ad4c7af1acecd5090c9784",
    measurementId: "G-LCGB0XHEMG"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore(app);

export const FieldValue = firebase.firestore.FieldValue;
//signin with google
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

//email verification
export const emailVerify = (user) => {
    user.sendEmailVerification().then(() => {
        console.log("Email Sent")
    }).catch((error) => {
        console.log("error");
    });
};

//delete user
export const deleteUser = () => {
    var user = auth.currentUser;
    user.delete()
        .then(() => {
            console.log("User deleted")
        }).catch((error) => {
            console.log("Error deleting user")
        });
};


//generating user document
export const generateUserDocument = async(displayName) => {
    var user = auth.currentUser;
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email } = user;
        try {
            await userRef.set({
                email,
                cat: firebase.firestore.Timestamp.now(),
                displayName: displayName
            });
        } catch (error) {
            console.error("Error lol", error.message);
        }
    }
    return getUserDocument(user.uid);
};

//displaying user document
const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();

        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

//generating property doc
export const generatePropDocument = async(user, name, address, url) => {
    if (!user) return;

    const userRef = db.collection('users').doc(user.uid).collection('property_details').doc(name);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        try {
            await userRef.set({
                name,
                address,
                URL: url
            });
        } catch (error) {
            console.error("Error creating prop document", error);
        }
    }
    return updatePropDocument(user.uid, name, url)
};

//updating prop doc
const updatePropDocument = async(uid, name, url) => {
    if (!uid) return null;
    try {
        const userRef = db.collection('users').doc(uid).collection('property_details').doc(name);
        return userRef.update({
                URL: firebase.firestore.FieldValue.arrayUnion(url)

            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
    } catch (error) {
        console.log("Error updating document")
    }
};

export const updatePassword = async(password, Npassword) => {
    var user = auth.currentUser
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
    if (Npassword) {
        try {
            await user.reauthenticateWithCredential(credentials)
            await user.updatePassword(Npassword)
        } catch (error) {
            throw error.message
        }
    }
}

export const updateUserInfo = async(displayName) => {
    var user = auth.currentUser
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get()
    if (snapshot.data().displayName === displayName)
        throw "Inputs cannot be same"
    else
        try {
            await userRef.update({
                displayName: displayName
            })
        }
    catch (err) {
        console.log(err.message)
    }
}


export const updateProfile = async file => {
    var user = auth.currentUser
    const userRef = firestore.doc(`users/${user.uid}`);
    try {
        await storage.ref(`${user.uid}/ProfileImage/${file.name}`).put(file)
        const photo_url = await storage
            .ref(`${user.uid}/ProfileImage/`)
            .child(file.name)
            .getDownloadURL()
            .then(url => { return url });
        await userRef.update({ photo_url: photo_url })
    } catch (error) {
        console.log(error)
    }
}

export const generateClients = async(name,phoneno) => {
    var user=auth.currentUser;
    if (!user) return;
console.log("hello")
    const userRef = db.collection('users').doc(user.uid).collection('clients').doc(user.uid+"clients");
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        try {
            await userRef.set({
                clients:{
                    name,
                    phoneno
                }
            });
        } catch (error) {
            console.error("Error creating client document", error);
        }
    }
    return userRef.update({
        clients: firebase.firestore.FieldValue.arrayUnion({"name":name,"phoneno":phoneno})
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating client document: ", error);
        });
};

export const searchByname=async ()=>{
    var user=auth.currentUser;
    if (!user) return;
    const userRef = db.collection('users').doc(user.uid).collection('clients').doc(user.uid+"clients");
    const snapshot = await userRef.get();
    if (snapshot.exists) {
        try {
                snapshot.data().clients.forEach(index => {
                    console.log(index.name)
                })
        } catch (error) {
            console.error("Error creating client document", error);
        }
    }
    else
    alert("no clients")
    
}