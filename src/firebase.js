// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHGv9Lkbi2bkSj7VQ4ho-CBdtN2XC6COE",
  authDomain: "iris-project-a8d3d.firebaseapp.com",
  projectId: "iris-project-a8d3d",
  storageBucket: "iris-project-a8d3d.appspot.com",
  messagingSenderId: "360925397396",
  appId: "1:360925397396:web:5816db6d31ec9565448f81",
  measurementId: "G-F80PWS9GMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut };