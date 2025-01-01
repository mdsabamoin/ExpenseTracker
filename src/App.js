// import logo from './logo.svg';
// import './App.css';
 import { useContext, useEffect } from "react";
import CustomLogin from "./Component/CustomLogin";
 import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "./Store/ContextProvider";
import Welcome from "./Component/Welcome";
import axios from "axios";
function App() {

  const ctx = useContext(Context);

  useEffect(() => {
    
    const storedToken = localStorage.getItem("idToken");
    const stateofForm = localStorage.getItem("form");

    if (storedToken) {
      ctx.setEnter(true); 
      axios
        .post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA", {"idToken":storedToken})
        .then((response) => {
          const user = response.data.users?.[0];
         
          if(user){
            ctx.setName(user.displayName || "");
            ctx.setUrl(user.photoUrl || "");
          }
         
        })
        .catch((error) => {
          alert(error)
        });
    }
    if (storedToken && stateofForm) {
      ctx.setEnter(true); 
      ctx.setIdToken(storedToken);
      ctx.setForm(true);
      
    }
  }, [ctx.idToken]);

 

  return (
    <div>
     {ctx.enter?<Welcome/>:<CustomLogin/>}
    </div>
  );
}


export default App;
