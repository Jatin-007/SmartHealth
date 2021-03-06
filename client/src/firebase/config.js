import firebase from 'firebase';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBi1v3lS1hFMdAVTgOCYyLV3_XCSgDIuTo",
    authDomain: "smarthealth-5fc73.firebaseapp.com",
    databaseURL: "https://smarthealth-5fc73.firebaseio.com",
    projectId: "smarthealth-5fc73",
    storageBucket: "smarthealth-5fc73.appspot.com",
    messagingSenderId: "544139409633"
};

if(!firebase.apps.length){
    firebase.initializeApp(config);
}
export default firebase;

const database = firebase.database();
const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    auth,
    database
}