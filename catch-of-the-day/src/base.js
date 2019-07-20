import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCPoh8NDLxxEFDb_DLAdXv0HSqDneU6pFo",
    authDomain: "course-react-for-beginners.firebaseapp.com",
    databaseURL: "https://course-react-for-beginners.firebaseio.com",
    // projectId: "course-react-for-beginners",
    // storageBucket: "",
    // messagingSenderId: "719997880083",
    // appId: "1:719997880083:web:be8dbd2e90b6111a"
});

const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp }
// Default export
export default base;
