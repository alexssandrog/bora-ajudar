import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCqk8xTu0Nh1x3-LedEOOexkfF5yKolmYs",
    authDomain: "bora-ajudar-838e4.firebaseapp.com",
    databaseURL: "https://bora-ajudar-838e4.firebaseio.com",
    projectId: "bora-ajudar-838e4",
    storageBucket: "bora-ajudar-838e4.appspot.com",
    messagingSenderId: "1028043715956"
};
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export default base;