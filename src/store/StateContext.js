import React, { useContext, useState, createContext, useEffect} from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  useEffect(()=>{
    const val=localStorage.getItem('id');
    console.log(typeof(val));
    if(val!=='null'){
setToken(val);
setIsLogin(true);
    }  
  },[])

   const [token,setToken]=useState(null);
     const [isLogin, setIsLogin] = useState(false);
const[loginPage,setLoginPage]=useState(false);
const[profilePage,setProfilePage]=useState(false);
const[modalbox,setModalbox]=useState(true);
const onLogout=()=>{
  console.log('success log out');
  setIsLogin(false);
  localStorage.setItem('id','null');
  setToken('null');
  setLoginPage(false);
}

  return (
    <Context.Provider
      value={{
        token,setToken,isLogin,setIsLogin,loginPage,setLoginPage,profilePage,setProfilePage,onLogout,modalbox,setModalbox
        }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);