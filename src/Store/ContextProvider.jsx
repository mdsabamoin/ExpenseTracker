import React, { useState } from "react"

const Context = React.createContext({
    isLogin:false,
    email:"",
    enter:false,
    password:"",
    confirmpassword:"",
    idToken:"",
    form:false,
    name:"",
    emailVerified:false,
    url:"",
    details:"",
    forgotpassword:false,
    setEmailVerified:()=>{},
    setForgotPassword:()=>{},
    setDetails:()=>{},
    setUrl:()=>{},
    setName:()=>{},
    setForm:()=>{},
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
    const [form , setForm] = useState(false);
    const [name , setName] = useState("");
    const [url,setUrl] = useState("");
    const [details,setDetails] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [forgotpassword, setForgotPassword] = useState(false);

    return <Context.Provider value={{isLogin,details,emailVerified,forgotpassword,email,name,url,idToken,form,enter,password,confirmpassword,setForgotPassword,setEmailVerified,setDetails,setName,setUrl,setForm,setEnter,setIdToken,setEmail,setPassword,setConfirmPassword,setIsLogin}}>{props.children}</Context.Provider>
}

export {Context,ContextProvider}