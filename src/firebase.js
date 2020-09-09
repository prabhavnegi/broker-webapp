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
export const generateUserDocument = async(displayName, additionalData) => {
    var user = auth.currentUser;
    if (!user) return;

    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email } = user;
        try {
            await userRef.set({
                displayName,
                email,
                cat: firebase.firestore.Timestamp.now(),
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
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

export const updateProfile = async(NewEmail, displayName, password, Npassword) => {
    var user = auth.currentUser
    console.log(password)
    user.reauthenticateWithCredential(password).then(function() {
        console.log("done hai")
    }).catch(function(error) {
        console.log(error)
    });
}