import React, { useState } from "react"

const Context = React.createContext({
    isLogin:false,
    email:"",
    enter:false,
    password:"",
    confirmpassword:"",
    idToken:"",
    setIdToken:()=>{},
    setEnter:()=>{},
    setEmail:()=>{},
    setPassword:()=>{},
    setConfirmPassword:()=>{},
    setIsLogin:()=>{}
})

const ContextProvider = (props)=>{
      
    const [isLogin , setIsLogin] = useState(false);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmpassword , setConfirmPassword] = useState("");
    const [idToken , setIdToken] = useState("");
    const [enter , setEnter] = useState(false);

    return <Context.Provider value={{isLogin,email,idToken,enter,password,confirmpassword,setEnter,setIdToken,setEmail,setPassword,setConfirmPassword,setIsLogin}}>{props.children}</Context.Provider>
}

export {Context,ContextProvider}