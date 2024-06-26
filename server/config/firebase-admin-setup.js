const { firestore } = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = require("../serviceAccountKey");

// Initialize the Firebase Admin SDK
exports.app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: `gs://nerdify-3b431.appspot.com`,
});

exports.db = firestore();
exports.bucket = getStorage().bucket();
