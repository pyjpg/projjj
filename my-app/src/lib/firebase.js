import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyABEq78E-oc9yPujwUIxuyS8_hwmUvNKMs",
    authDomain: "revz-template.firebaseapp.com",
    projectId: "revz-template",
    storageBucket: "revz-template.appspot.com",
    messagingSenderId: "406842569962",
    appId: "1:406842569962:web:b80ad488dca1bd5215d393",
    measurementId: "G-EV3CMWNDWD"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);