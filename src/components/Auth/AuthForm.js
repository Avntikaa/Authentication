import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const[isAlert,setIsAlert]=useState(false);
const email=useRef();
const password=useRef();
  const switchAuthModeHandler = () => {
    console.log('cjnsjdcn')
    setIsLogin((prevState) => !prevState);
  };


  const submitlogindetail=async (e)=>{
e.preventDefault();
setIsLoader(true);
const enteredEmail=email.current.value;
const enteredPassword=password.current.value;
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
console.log('success');
setIsLoader(false);
}
catch(error){
  setIsAlert(true);
console.log(error);
}
}
  return (
    <section className={classes.auth}>
      {isAlert && alert('Auhtentication failed')}
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
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
{!isLoader && <button >{isLogin ? 'Login' : 'Create New Account'}</button>}
        <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        {isLoader && <p>sending request...</p>}
      </form>
    </section>
  );
};

export default AuthForm;
