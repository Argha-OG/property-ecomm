const admin = require('firebase-admin');
const serviceAccount = require('./property-ecommerce-firebase-adminsdk-fbsvc-11eb61272a.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
