import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider, getAuth, OAuthProvider } from "firebase/auth";


const otherAppConfig = {
  apiKey: "AIzaSyCAu7u6IC8ktDhYNPF3LFZLnRzZYumgCbU",
  authDomain: "diariocivitas.firebaseapp.com",
  projectId: "diariocivitas",
  messagingSenderId: "795721350576",
  appId: "1:795721350576:web:c75d61a003ac6d4037aa75",
  measurementId: "G-NR5DVJLYF1"
};

if (initializeApp.length === 0) {
  initializeApp({})
}

const iniApp = () => {
  try {
    const firebaseClient = initializeApp(otherAppConfig);
    return firebaseClient
  } catch (error) {
    console.log("error 1503", "appCheck en firebase.ts")
  }
}
const firebaseClient = iniApp()
const auth = getAuth()

const GoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  return provider;
};

const FacebookProvider = new FacebookAuthProvider();

const AppleProvidor = () => {
  try {
    const provider = new OAuthProvider('apple.com');
    return provider
  } catch (error) {
    console.log("error 1504", "AppleProvidor en firebase.ts", error)
  }
}

export { firebaseClient, GoogleProvider, FacebookProvider, auth, AppleProvidor };

