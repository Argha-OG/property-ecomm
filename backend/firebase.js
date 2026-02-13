const admin = require('firebase-admin');

// Initialize with Environment Variable for Vercel
// Fallback to local file for development if Env Var not set
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT', e);
    }
}

if (serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} else {
    // Initialize without credentials (might work for some services, or fail later)
    // or log error. For Vercel, this likely means "Crash" if auth is needed.
    console.error('Firebase Admin SDK could not be initialized. Missing credentials.');
}

module.exports = admin;
