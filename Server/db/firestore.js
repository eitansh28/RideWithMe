const firebase = require('firebase-admin');
const { firestore } = require("firebase-admin");
const serviceAccount = require('../config/ridewithmedb-firebase-adminsdk-4hbmz-e6a64ac696.json')
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://ridewithmedb.firebaseio.com/',
  });
  module.exports = firebase;