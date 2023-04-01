import { useRef } from 'react';
import { useStateContext } from '../../store/StateContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
const cxt=useStateContext();
  const newp=useRef();
  async function changePassword(e){
    e.preventDefault();
const newPassword=newp.current.value;
try{
const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD9GUyT_XYB3Ud1rD-7P0hYccPO8U_v6tw',{
  method:'POST',
  body:JSON.stringify({
    idToken:cxt.token,
password:newPassword,
returnSecureToken:true
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
console.log(data.idToken);
  });
      // cxt.setLoginPage((prevState) => !prevState);

}
else{
  console.log(res.json());
}
    // cxt.setIsLogin((prevState) => !prevState);
// cxt.setLoginPage(false);
}
catch(error){
  //  setIsAlert(true);
  //  setIsLoader(false);
}
}


  return (
    <>
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newp}/>
      </div>
      <div className={classes.action}>
        <button onClick={changePassword}>Change Password</button>
      </div>
    </form>
  
  </>
  );
}

export default ProfileForm;
