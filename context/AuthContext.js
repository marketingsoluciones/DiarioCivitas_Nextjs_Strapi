import { createContext, useState, useEffect, useContext, } from "react";
import { auth } from "../firebase";
import { fetchApi, queries } from "../utils/Fetching";
import Cookies from 'js-cookie'
import { signInWithCustomToken } from "firebase/auth";


const initialContext = {
  user: null,
  setUser: (user) => { },
  userTemp: null,
  setUserTemp: (user) => { },
  redirect: null,
  setRedirect: (user) => { },
};

const AuthContext = createContext(initialContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userTemp, setUserTemp] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setTimeout(async () => {
        const sessionCookie = Cookies.get("sessionCivitas");
        console.info("Verificando cookie", sessionCookie);
        if (sessionCookie) {
          console.info("Tengo cookie de sesion");
          if (user) {
            console.info("Tengo user de contexto firebase");
            const moreInfo = await fetchApi({
              query: queries.getUser,
              variables: { uid: user?.uid },
            });
            moreInfo && console.info("Tengo datos de la base de datos");
            setUser({ ...user, ...moreInfo });
            console.info("Guardo datos en contexto react");
          } else {
            console.info("NO tengo user de contexto de firebase");
            const { customToken } = await fetchApi({
              query: queries.authStatus,
              variables: { sessionCookie },
            });
            console.info("Llamo con mi sessionCookie para traerme customToken");
            console.info("Custom token", customToken)
            customToken && signInWithCustomToken(auth, customToken);
            console.info("Hago sesion con el custom token");
          }
        }
        if (!sessionCookie) {
          setUser(null)
        }
      }, 800);
    });
  }, []);

  useEffect(() => {
    auth.onIdTokenChanged(async user => {
      if (user) {
        Cookies.set("idToken", await user.getIdToken(), { domain: process.env.NEXT_PUBLIC_DOMINIO ?? "" })
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, userTemp, setUserTemp, redirect, setRedirect }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextProvider = () => useContext(AuthContext);

export { AuthProvider, AuthContextProvider };
