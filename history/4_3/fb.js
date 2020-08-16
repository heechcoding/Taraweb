import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCM28OaOQSXN3-xTS9MCXLOw2ISLSs4tlk",
    authDomain: "tara-web.firebaseapp.com",
    databaseURL: "https://tara-web.firebaseio.com",
    projectId: "tara-web",
    storageBucket: "tara-web.appspot.com",
    messagingSenderId: "797293018839",
    appId: "1:797293018839:web:5ce6e9767734dc480f7a92",
    measurementId: "G-EZKYZ900ZB"

}

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

export default auth
