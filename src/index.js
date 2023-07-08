import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { FirebaseContext } from './FirbaseContext';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [app, setApp] = useState(null);
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);

    useEffect(() => {
        const app = initializeApp({
            apiKey: process.env.REACT_APP_APIKEY,
            authDomain: process.env.REACT_APP_AUTHDOMAIN,
            projectId: process.env.REACT_APP_PROJECTID,
            storageBucket: process.env.REACT_APP_STORAGEBUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
            appId: process.env.REACT_APP_APPID,
        });

        setApp(app);

        const auth = getAuth(app);

        setAuth(auth);

        const db = getFirestore(app);

        setDb(db);

        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user);
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <FirebaseContext.Provider value={{ user, app, auth, db }}>
            {children}
        </FirebaseContext.Provider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <FirebaseProvider>
            <App />
        </FirebaseProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
