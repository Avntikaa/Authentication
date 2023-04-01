import { useState, useRef, useEffect } from 'react';
import { useStateContext } from '../../store/StateContext';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const cxt=useStateContext();
  const [isLoader, setIsLoader] = useState(false);
  const[isAlert,setIsAlert]=useState(false);
const email=useRef();
const password=useRef();

  const switchAuthModeHandler = () => {
    cxt.setModalbox(true);
    cxt.setLoginPage((prevState) => !prevState);
    console.log('LoginPage')
  };


  const submitlogindetail=async (e)=>{
e.preventDefault();
setIsLoader(true);
const enteredEmail=email.current.value;
const enteredPassword=password.current.value;
if(cxt.loginPage){
try{
const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9GUyT_XYB3Ud1rD-7P0hYccPO8U_v6tw',{
  method:'POST',
  body:JSON.stringify({
email:enteredEmail,
password:enteredPassword,
returnSecureToken:true
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
console.log('Logg in successfully');
cxt.setModalbox(false);
cxt.setToken(data.idToken);
localStorage.setItem('id',data.idToken);
setIsLoader(false);
    cxt.setIsLogin((prevState) => !prevState);
    cxt.setProfilePage(true);
cxt.setLoginPage(false);
  });
}

}
catch(error){
   setIsAlert(true);
   setIsLoader(false);
}
}
else{
try{
const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9GUyT_XYB3Ud1rD-7P0hYccPO8U_v6tw',{
  method:'POST',
  body:JSON.stringify({
email:enteredEmail,
password:enteredPassword,
returnSecureToken:true
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
if(!res.ok){
  const data=res.json();
  console.log(data);
  throw new Error(res.json());
}
else{
  console.log('Sign up in successfully');
setIsLoader(false);

}
}
catch(error){
  setIsAlert(true);
console.log(error);
}
}
}
  return (
    <>
   {cxt.modalbox &&  <section className={classes.auth}>
    {isAlert && alert('Auhtentication failed')}
      <h1>{cxt.loginPage ? 'Login' : 'Sign Up'}</h1>
    <form onSubmit={submitlogindetail}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref={email} id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={password}
            required
          />
        </div>
        <div className={classes.actions}>
{!isLoader && <button >{cxt.loginPage ? 'Login' : 'Create New Account'}</button>}
        <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {cxt.loginPage ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        {isLoader && <p>sending request...</p>}
      </form></section>
   }
   </>
  );
};

export default AuthForm;
