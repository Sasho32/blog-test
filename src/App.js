import './App.css';
import SignUp from './SignUp';
import { auth } from './firebase';
import Todo from './Todo';

function App() {
    return (
        <>
            <SignUp />
            <button
                onClick={() =>
                    console.log(auth?.currentUser || 'no user available')
                }
            >
                Log current user!
            </button>
        </>
    );
}

export default App;
