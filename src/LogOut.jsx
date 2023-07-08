import React from 'react';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from './FirbaseContext';

function LogOut() {
    const { auth } = useContext(FirebaseContext);

    function handleLogout() {
        signOut(auth)
            .then(() => {
                console.log('Signed Out Successful');
            })
            .catch(error => {
                alert(error.message);
            });
    }
    return <button onClick={handleLogout}>Log Out</button>;
}

export default LogOut;
