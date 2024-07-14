// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-be0f7.firebaseapp.com",
  projectId: "mern-blog-be0f7",
  storageBucket: "mern-blog-be0f7.appspot.com",
  messagingSenderId: "229910799757",
  appId: "1:229910799757:web:9b8ab78eb339457c5909c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);