import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Optional Firebase configuration for Civic app analytics
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-api-key",
  authDomain: "civiq-app.firebaseapp.com",
  projectId: "civiq-app",
  storageBucket: "civiq-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-ABCDEF1234"
};

// Initialize Firebase only if supported (browser environment)
export const initFirebase = async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const supported = await isSupported();
    if (supported) {
      getAnalytics(app);
      console.log("Firebase Analytics initialized for CIVIQ");
    }
  } catch (error) {
    console.warn("Firebase initialization skipped:", error.message);
  }
};
