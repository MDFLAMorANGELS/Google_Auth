import { useEffect } from "react";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAtom } from "jotai";
import { userAtom } from "./atom";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useAtom(userAtom);
  const [, setUserState] = useAtom(userAtom)

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUser({
        isLogged: true,
      });
    } else {
      setUser({
        isLogged: false,
      });
      Cookies.remove("token");
    }
  }, [user.isLogged]);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded.email);
    Cookies.set("token", decoded.email);
    setUserState({ isLogged: true });
    setUser(decoded);
  };

  const handleLogout = () => {
    setUserState({ isLogged: false });
    Cookies.remove('token');
    console.log('vous etes déconnecter');
};


  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div>
      {user.isLogged ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      )}
    </div>
  );
}

export default App;
