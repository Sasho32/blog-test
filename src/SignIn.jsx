import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { FirebaseContext } from './FirbaseContext';

function SignIn() {
    const { app, auth } = useContext(FirebaseContext);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, pass);
            setEmail('');
            setPass('');
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                required
            />
            <label htmlFor="pass">Password</label>
            <input
                id="pass"
                value={pass}
                onChange={e => setPass(e.target.value)}
                type="password"
                required
            />
            <button>Sign In!</button>
        </form>
    );
}

export default SignIn;
