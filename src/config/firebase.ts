import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "holocart-demo.firebaseapp.com",
  databaseURL: "https://holocart-demo-default-rtdb.firebaseio.com",
  projectId: "holocart-demo",
  storageBucket: "holocart-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;