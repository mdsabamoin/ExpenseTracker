// import logo from './logo.svg';
// import './App.css';
 import { useContext } from "react";
import CustomLogin from "./Component/CustomLogin";
 import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "./Store/ContextProvider";
import Welcome from "./Component/Welcome";

function App() {

  const ctx = useContext(Context);

  return (
    <div>
     {ctx.enter?<Welcome/>:<CustomLogin/>}
    </div>
  );
}


export default App;
