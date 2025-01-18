// import React, { useState } from "react"

// const Context = React.createContext({
   
//     form:false,
//     name:"",
//     emailVerified:false,
//     url:"",
//     details:"",
//     forgotpassword:false,
//     setEmailVerified:()=>{},
//     setForgotPassword:()=>{},
//     setDetails:()=>{},
//     setUrl:()=>{},
//     setName:()=>{},
//     setForm:()=>{},
    
// })

// const ContextProvider = (props)=>{
      
   
//     const [form , setForm] = useState(false);
//     const [name , setName] = useState("");
//     const [url,setUrl] = useState("");
//     const [details,setDetails] = useState("");
//     const [emailVerified, setEmailVerified] = useState(false);
//     const [forgotpassword, setForgotPassword] = useState(false);

//     return <Context.Provider value={{details,emailVerified,forgotpassword,name,url,form,setForgotPassword,setEmailVerified,setDetails,setName,setUrl,setForm}}>{props.children}</Context.Provider>
// }

// export {Context,ContextProvider}