// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "student-accomodation-50291.firebaseapp.com",
  projectId: "student-accomodation-50291",
  storageBucket: "student-accomodation-50291.appspot.com",
  messagingSenderId: "211729986557",
  appId: "1:211729986557:web:025f16212b85dd1bebdf94"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);