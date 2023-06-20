// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsDx2Bn_S5JP1k-WZzON6r4OA4xA0Mg4k",
  authDomain: "netflix-545f1.firebaseapp.com",
  databaseURL: "https://netflix-545f1-default-rtdb.firebaseio.com",
  projectId: "netflix-545f1",
  storageBucket: "netflix-545f1.appspot.com",
  messagingSenderId: "603601112545",
  appId: "1:603601112545:web:6173fc0a29b299f22896a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); 