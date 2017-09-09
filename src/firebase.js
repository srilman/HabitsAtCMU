import firebase from 'firebase';
const config = {
    apiKey: 'AIzaSyBwGyvegYm9pdmutNFuLbUM2r2K74fDyDQ',
    authDomain: 'habitatcmu-f7597.firebaseapp.com',
    databaseURL: 'https://habitatcmu-f7597.firebaseio.com',
    projectId: 'habitatcmu-f7597',
    storageBucket: 'habitatcmu-f7597.appspot.com',
    messagingSenderId: '407528962507',
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;
