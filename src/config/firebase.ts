import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDlkq8FMoNPKFr3wl5Px-4PFAN2ne-Iza8",
  authDomain: "holocart-9b9ba.firebaseapp.com",
  databaseURL: "https://holocart-9b9ba-default-rtdb.firebaseio.com",
  projectId: "holocart-9b9ba",
  storageBucket: "holocart-9b9ba.firebasestorage.app",
  messagingSenderId: "1010221461280",
  appId: "1:1010221461280:web:e847effca1665838723145",
  measurementId: "G-354KN94HRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;