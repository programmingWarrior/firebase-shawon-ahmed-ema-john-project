import React, { useContext } from 'react';

import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework,signInWithEmailAndPassword } from './LoginManager';



function Login() {
   

    const [newUser, setNewUser] =useState(false);
    const [user,setUser] = useState({
    isSignedIn :false,
    name : '',
    email:'',
    photo:'',
    password:'',
    error:'',
    success:false,
  
  });


  

  initializeLoginFramework();

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res=>{
      handleResponse(res,true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res,false);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res=>{
      handleResponse(res,true);

    })
  }

  const handleResponse =(res,redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if( redirect){
      history.replace(from);
    }

  }
 

  

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

 
  const handleSubmit=(e) =>{
    if( newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res=>{
        handleResponse(res,true);
      })
      
    }


    if( !newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        handleResponse(res,true);
      })
    }
    e.preventDefault();
  }

  const handleBlur = (e) =>{
    let isFeildValid=true;
    if(e.target.name === 'email'){
      isFeildValid = /^\S+@\S+$/.test(e.target.value);
     
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length>6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFeildValid = (isPasswordValid && passwordHasNumber);
    }
    if(isFeildValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }
  }






  return (
   <div style={{marginTop:'150px', textAlign:'center'}}>
     
    {
      user.isSignedIn ? <button onClick={signOut} className="btn btn-primary">Sign out</button>
      :
     <button onClick={googleSignIn}
      className="btn btn-primary">Sign in</button>
    }
    <br/>
    <button onClick={fbSignIn} className="btn btn-success">Log in Using Facebook</button>
     {
       user.isSignedIn &&<div> <h1>Welcome <img style={{borderRadius:'50%', width:'100px', height:'100px'}} src={user.photo} alt=""/> {user.name} To this Finance Project.</h1> 
       <p>Your Email:{user.email}</p>
       
       

       </div>
     }
     <h1>Our Own Authentication </h1>
     <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id="newUser"/>
     <label htmlFor="newUser">New User Sign Up</label>
    <form onSubmit ={handleSubmit} action="">
    {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>}<br/>
    <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required/><br/>
     <input type="password" onBlur={handleBlur} placeholder="password" name="password" required/><br/>
     <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
    </form>
    <p style={{color:'red',background:'black'}}>{user.error}</p>
     {
       user.success && <h1 style={{color:'green'}}>User { newUser ? 'Created' : 'logged in'} Successfully done by you. Thank you very much...</h1>
     }
    </div>
  );
}

export default Login;
