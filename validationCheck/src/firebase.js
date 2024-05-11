// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgqVUIWaEUCXI8H5m9S_hv1lXkkpL8KP8",
  authDomain: "auth-67c0f.firebaseapp.com",
  projectId: "auth-67c0f",
  storageBucket: "auth-67c0f.appspot.com",
  messagingSenderId: "660271947962",
  appId: "1:660271947962:web:579662f9ca1b7ccb00e283",
  measurementId: "G-RK7L4X4WHF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
