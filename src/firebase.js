import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2XWKLa-sguAphRWxvRWzAHV9cg_OuEP4",
    authDomain: "chatapp-76b49.firebaseapp.com",
    projectId: "chatapp-76b49",
    storageBucket: "chatapp-76b49.appspot.com",
    messagingSenderId: "241054459330",
    appId: "1:241054459330:web:b4da5ed7f47d4d758de25b"
};

// Initialize Firebase 
export default firebase.initializeApp(firebaseConfig);