import * as firebase from 'firebase';
require('dotenv').config();
const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

export default firebase;
