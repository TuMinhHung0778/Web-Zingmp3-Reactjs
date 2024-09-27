// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAakvMZIV0uMbOry9yshKTdC71jGU6nE-A",
  authDomain: "data-user-zingmp3.firebaseapp.com",
  projectId: "data-user-zingmp3",
  storageBucket: "data-user-zingmp3.appspot.com",
  messagingSenderId: "829594407285",
  appId: "1:829594407285:web:ec3857a9a07cefe1ee833c",
  measurementId: "G-HD4KXFELQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);