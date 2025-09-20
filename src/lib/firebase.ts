// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// =================================================================================
// PASTE YOUR FIREBASE CONFIG OBJECT HERE
// =================================================================================
// You can find this in your Firebase project settings. It should look like the
// example below, but with your project's specific keys.
const firebaseConfig = {
  apiKey: "your-api-key-here", // Replace with your apiKey from Firebase
  authDomain: "your-auth-domain-here", // Replace with your authDomain from Firebase
  projectId: "your-project-id-here", // Replace with your projectId from Firebase
  storageBucket: "your-storage-bucket-here", // Replace with your storageBucket from Firebase
  messagingSenderId: "your-messaging-sender-id-here", // Replace with your messagingSenderId from Firebase
  appId: "your-app-id-here" // Replace with your appId from Firebase
};
// =================================================================================
// END OF FIREBASE CONFIG
// =================================================================================


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
