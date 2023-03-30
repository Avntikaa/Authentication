import React, { useContext, useState, createContext,useCallback} from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
   const [token,setToken]=useState();
     const [isLogin, setIsLogin] = useState(false);
const[loginPage,setLoginPage]=useState(false);

  return (
    <Context.Provider
      value={{
        token,setToken,isLogin,setIsLogin,loginPage,setLoginPage
        }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);