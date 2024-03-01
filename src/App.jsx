import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null); // Utilisation de null pour indiquer que l'utilisateur n'est pas connecté
  const [profile, setProfile] = useState(null); // Utilisation de null pour indiquer que le profil n'est pas chargé

  // Utilisation du hook useGoogleLogin pour gérer la connexion
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  // Fonction de déconnexion
  const logOut = () => {
    googleLogout();
    setUser(null); // Réinitialisation de l'utilisateur après la déconnexion
    setProfile(null); // Réinitialisation du profil après la déconnexion
    localStorage.removeItem("user");
    console.log("vous étes Déconneté");
  };

  useEffect(() => {
    // Fonction pour charger les données de l'utilisateur depuis le localStorage
    const loadUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    // Charger les données de l'utilisateur au chargement de la page
    loadUserFromLocalStorage();
  }, []);

  useEffect(() => {
    if (user) {
      // Stocker les données de l'utilisateur dans le localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Récupérer le profil de l'utilisateur à partir de l'API Google
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="flex flex-1 justify-center items-center flex-col div-fade">
      {profile ? (
        <>
          <div className=" flex justify-center items-center gap-3 my-5 border-2 border-spacing-2 border-violet-700 p-2 bg-violet-500 rounded-lg shadow-lg">
            <h1 className="text-2xl">Bienvenue, {profile.name}</h1>
            <img
              src={profile.picture}
              alt="image du profile"
              className="rounded-full shadow-lg scale-75"
            />
          </div>
          <button
            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 bg-red-500 hover:bg-red-700 transition shadow-lg"
            onClick={logOut}
          >
            Déconnexion
          </button>
        </>
      ) : (
        <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 bg-white hover:bg-gray-200 transition shadow-lg" onClick={login}>Se connecter avec Google 🚀 </button>
      )}
    </div>
  );
}

export default App;
