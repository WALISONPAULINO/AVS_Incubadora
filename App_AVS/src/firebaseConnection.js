import firebase from "firebase/compat/app"
import "firebase/compat/database"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCMOW_wP-QK-H8ciyxVL2asC6GP35gTrwY",
    authDomain: "avsincubadora.firebaseapp.com",
    databaseURL: "https://avsincubadora-default-rtdb.firebaseio.com",
    projectId: "avsincubadora",
    storageBucket: "avsincubadora.appspot.com",
    messagingSenderId: "887584324943",
    appId: "1:887584324943:web:bd9c709bd955e01247993a",
    measurementId: "G-2LXY5MGD8P"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase