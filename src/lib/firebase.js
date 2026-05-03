import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Optional Firebase configuration for Civic app analytics, authentication, and database.
 * Used to demonstrate integration with Google Cloud & Firebase ecosystem.
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-api-key",
  authDomain: "civiq-app.firebaseapp.com",
  projectId: "civiq-app",
  storageBucket: "civiq-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-ABCDEF1234"
};

/**
 * Initializes Firebase services including Analytics, Authentication, and Firestore.
 * Performs environment checks to prevent crashes in unsupported environments.
 * 
 * @async
 * @returns {Promise<Object>} Object containing initialized Firebase instances
 * @throws {Error} Logs warning if initialization fails
 */
export const initFirebase = async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    let analytics = null;

    // Analytics only works in browser environments
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(app);
    }

    // Optional: Anonymous auth for tracking session states securely
    // In a real app, this would be tied to user actions
    try {
      await signInAnonymously(auth);
    } catch (authErr) {
      // Ignore auth errors in dummy environment
    }

    return { app, auth, db, analytics };
  } catch (error) {
    console.warn("Firebase initialization skipped:", error.message);
    return null;
  }
};
