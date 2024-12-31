import React, { useState } from "react"

const Context = React.createContext({
    isLogin:false,
    email:"",
    password:"",
    confirmpassword:"",
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

    return <Context.Provider value={{isLogin,email,password,confirmpassword,setEmail,setPassword,setConfirmPassword,setIsLogin}}>{props.children}</Context.Provider>
}

export {Context,ContextProvider}