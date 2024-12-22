import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDOzIlkzWT_cdltBjrOGszJIZKz5SkoC8A",
    authDomain: "ultron-v1-0.firebaseapp.com",
    projectId: "ultron-v1-0",
    storageBucket: "ultron-v1-0.firebasestorage.app",
    messagingSenderId: "254600426294",
    appId: "1:254600426294:web:d54071f811025af562f997"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }