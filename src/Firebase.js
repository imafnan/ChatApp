import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOV2MBgFlO0YmeoIRdjNduZokiRMxeoyA",
  authDomain: "chatternest-9afa6.firebaseapp.com",
  projectId: "chatternest-9afa6",
  storageBucket: "chatternest-9afa6.firebasestorage.app",
  messagingSenderId: "1040454210542",
  appId: "1:1040454210542:web:b2eca1a8f0fc633bd174ff"
};


const app = initializeApp(firebaseConfig);
export default app