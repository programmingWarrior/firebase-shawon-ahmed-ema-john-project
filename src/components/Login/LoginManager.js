import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';




export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    };
  };

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res=>{
      const {displayName,email,photoURL} = res.user;
      const isSignedInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        success: true,
        photo:photoURL,

      }
     return isSignedInUser;
      console.log(displayName,email,photoURL);
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
}




export const handleFbSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

export const handleSignOut = () => {
   return firebase.auth().signOut()
    .then(res=>{
      const signedOutUser = ({
        isSignedIn:false,
        name:'',
        phone:'',
        email:'',
        success:false,

      })
      return signedOutUser;
      console.log(res);
    })
    .catch(err =>{
      console.log(err);
    })
}

export const createUserWithEmailAndPassword = (name,email,password)=>{
  return firebase.auth().createUserWithEmailAndPassword(email,password)

    .then(res=>{
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error)=> {
      // Handle Errors here.
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    
    return firebase.auth().signInWithEmailAndPassword(email,password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch(error=> {
        // Handle Errors here.
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
        
      });
}

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(()=> {
      console.log('user name updated succesfully');
      // Update successful.
    }).catch((error)=> {
      // An error happened.
      console.log(error);
    });
  } 
