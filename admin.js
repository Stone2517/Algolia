const admin = require('firebase-admin');

var serviceAccount = require("./<PROJECT>.json");

module.exports = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<PROJECT>.firebaseio.com"
});
