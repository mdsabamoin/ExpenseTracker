import { useContext, useEffect ,Suspense} from "react";
import CustomLogin from "./Component/CustomLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "./Store/ContextProvider";
import Welcome from "./Component/Welcome";
import axios from "axios";
import ForgotPassword from "./Component/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { login,setName,Verified,setUrl,setForm ,setForgotPassword} from "./Slices/AuthSice";
import "./App.css";

function App() {
  const enter = useSelector((state) => state.auth.enter);
  // const ctx = useContext(Context);
  // const Verified = useSelector((state)=>state.auth.Verified);
  // const setName = useSelector((state)=>state.auth.setName);
  // const setUrl = useSelector((state)=>state.auth.setUrl);
  // const setForm = useSelector((state)=>state.auth.setForm);
  const forgotpassword = useSelector((state)=>state.auth.forgotpassword);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(setForm(false));
        const storedToken = localStorage.getItem("idToken");
        // const stateofForm = localStorage.getItem("form");

        if (storedToken) {
          dispatch(login());
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA",
            { idToken: storedToken }
          );

          const user = response.data.users?.[0];
          if (user) {
            dispatch(setName({"name":user.displayName}));
            dispatch(setUrl({"url":user.photoUrl}));
            dispatch(Verified(true));

            // ctx.setName(user.displayName || "");
            // ctx.setUrl(user.photoUrl || "");
            // ctx.setEmailVerified(user.emailVerified || false);
          }

          // if (stateofForm) {
          //   // ctx.setIdToken(storedToken);
            
          // }
        }
      } catch (error) {
        dispatch(setForm(false));
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <>
    <div>
      {forgotpassword ? (
        <ForgotPassword onCancel={() => dispatch(setForgotPassword(false))}/>
      ) : enter ? (
        <Welcome />
      ) : (
        <CustomLogin />
      )}
      
    </div>
    
    </>
  );
}

export default App;
