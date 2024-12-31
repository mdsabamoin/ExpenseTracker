// import logo from './logo.svg';
// import './App.css';
 import { useContext } from "react";
import CustomLogin from "./Component/CustomLogin";
 import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "./Store/ContextProvider";

function App() {

  const ctx = useContext(Context);

  return (
    <div>
     {ctx.enter?<h1>Welcome to expense Tracker!!!</h1>:<CustomLogin/>}
    </div>
  );
}


export default App;
