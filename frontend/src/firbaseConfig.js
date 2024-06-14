// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBviyvvNF-4t5JtO4yrOOa92FbCcd5wLgo",
  authDomain: "nobstash-9fee6.firebaseapp.com",
  projectId: "nobstash-9fee6",
  storageBucket: "nobstash-9fee6.appspot.com",
  messagingSenderId: "81086906450",
  appId: "1:81086906450:web:6c8abb7bb50a931a88df8b",
  measurementId: "G-JQRPWDV0VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const db = getFirestore(app);
export {auth,app,db};