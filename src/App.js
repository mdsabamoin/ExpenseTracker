import { useContext, useEffect } from "react";
import CustomLogin from "./Component/CustomLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "./Store/ContextProvider";
import Welcome from "./Component/Welcome";
import axios from "axios";
import ForgotPassword from "./Component/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./Slices/AuthSice";

function App() {
  const enter = useSelector((state) => state.auth.enter);
  const ctx = useContext(Context);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = localStorage.getItem("idToken");
        const stateofForm = localStorage.getItem("form");

        if (storedToken) {
          dispatch(login());
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA",
            { idToken: storedToken }
          );

          const user = response.data.users?.[0];
          if (user) {
            ctx.setName(user.displayName || "");
            ctx.setUrl(user.photoUrl || "");
            ctx.setEmailVerified(user.emailVerified || false);
          }

          if (stateofForm) {
            ctx.setIdToken(storedToken);
            ctx.setForm(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [ctx, dispatch]);

  return (
    <div>
      {ctx.forgotpassword ? (
        <ForgotPassword onCancel={() => ctx.setForgotPassword(false)} />
      ) : enter ? (
        <Welcome />
      ) : (
        <CustomLogin />
      )}
    </div>
  );
}

export default App;
