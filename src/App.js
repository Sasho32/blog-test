import './App.scss';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { auth } from './firebase';
import Todo from './Todo';
import { FirebaseContext } from './FirbaseContext';
import { useContext } from 'react';
import LogOut from './LogOut';
import { useState } from 'react';

import { collection, addDoc } from 'firebase/firestore';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

import DOMPurify from 'dompurify';

function App() {
    const { user, db } = useContext(FirebaseContext);

    function logUser() {
        console.log(user?.email);
    }

    async function addTodo() {
        const docRef = await addDoc(collection(db, 'todos'), {
            name: 'Todo',
            age: '1948',
        });
        console.log('Document written with ID: ', docRef.id);
    }

    const [text, setText] = useState('');

    {
        /* ------------------------------------------> */
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link'],
            ['clean'],
        ],
    };

    const [value, setValue] = useState('');
    const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b> lorem ipsum <img src="" onerror="alert('message');" />`;
    {
        /* ------------------------------------------> */
    }

    const [showEmojis, setShowEmojis] = useState(false);

    return (
        <>
            {/* <button
                onClick={() =>
                    console.log(auth?.currentUser || 'no user available')
                }
                >
                Log current user!
            </button> */}
            {!user && (
                <>
                    <SignUp />
                    <SignIn />
                </>
            )}
            {user && (
                <>
                    <LogOut />
                    <button onClick={addTodo}>add Todo</button>
                </>
            )}
            <button onClick={logUser}>log user</button>
            {/* ------------------------------------------> */}
            <br />
            <br />
            <br />
            <br />
            <input type="text" placeholder="Heading" />
            <br />
            <input type="file" name="Photo" id="" />
            <br />
            <ReactQuill
                modules={modules}
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Content goes here!"
            />
            {/* <ReactQuill theme="bubble" value={value} readOnly={true} /> */}
            <section id="emojis">
                <i
                    onClick={() => setShowEmojis(prev => !prev)}
                    className="fa-regular fa-face-smile"
                ></i>
                <section
                    onClick={e => {
                        if (e.target.matches('span')) {
                            setValue(value => value + e.target.textContent);
                            console.log(value);
                        }
                    }}
                    className={`hidden ${showEmojis && `show`}`}
                >
                    <span>&#128515;</span>
                    <span>&#129315;</span>
                    <span>&#128521;</span>
                    <span>&#128525;</span>
                    <span>&#129300;</span>
                    <span>&#129320;</span>
                    <span>&#128526;</span>
                    <span>&#128549;</span>
                    <span>&#128558;</span>
                    <span>&#128512;</span>
                    <span>&#129315;</span>
                    <span>&#128515;</span>
                    <span>&#128516;</span>
                    <span>&#128513;</span>
                    <span>&#128518;</span>
                    <span>&#128517;</span>
                    <span>&#128514;</span>
                    <span>&#128578;</span>
                    <span>&#128579;</span>
                    <span>&#128521;</span>
                    <span>&#128522;</span>
                    <span>&#128519;</span>
                    <span>&#129392;</span>
                    <span>&#128525;</span>
                    <span>&#129321;</span>
                    <span>&#128536;</span>
                    <span>&#128535;</span>
                    <span>&#128538;</span>
                    <span>&#128537;</span>
                    <span>&#128523;</span>
                    <span>&#128539;</span>
                    <span>&#128540;</span>
                    <span>&#129322;</span>
                    <span>&#128541;</span>
                    <span>&#129297;</span>
                    <span>&#129303;</span>
                    <span>&#129325;</span>
                    <span>&#129323;</span>
                    <span>&#129300;</span>
                    <span>&#129296;</span>
                    <span>&#129320;</span>
                    <span>&#128528;</span>
                    <span>&#128529;</span>
                    <span>&#128566;</span>
                    <span>&#128527;</span>
                    <span>&#128530;</span>
                    <span>&#128580;</span>
                    <span>&#128556;</span>
                    {/* <span>&#129317;</span>
                    <span>&#128524;</span>
                    <span>&#128532;</span>
                    <span>&#128554;</span>
                    <span>&#129316;</span>
                    <span>&#128564;</span>
                    <span>&#128567;</span>
                    <span>&#129298;</span> */}
                </section>
            </section>
            <section id="info">
                <div className="ql-snow">
                    <div
                        className="ql-editor"
                        id="quill-value"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(value),
                        }}
                    ></div>
                </div>
            </section>

            {/* другият вариант е с bubble темата и readOnly=true 
            https://stackoverflow.com/questions/40952434/how-do-i-display-the-content-of-react-quill-without-the-html-markup#:~:text=Note%3A%20ReactQuill%20comes%20with%20two,themes%20(bubble%20and%20snow).&text=And%20here%20is%20how%20it,to%20display%20your%20editor%20content. */}

            {/*  - и двете работят - div-ът е с малко по-различен шрифт или размер нз
            - div-ът работи само ако го wrapnem с друг и сложим съответните класове, но иначе нито overflow-ва хоризонтално на телефон, нито има някоя от опциите да не работи
            https://stackoverflow.com/questions/62777119/binding-html-data-from-quill-editor-is-not-displaying-as-expected-in-angular-2
            - без wrapper div не работи - дори и да добавим ql-snow на inner div-а(не работят blockquote и codeblock)
            - индентацията с tab работи с div-а само - другото работи с допълнителната опция за индентация ако се сложи със стрелките иконката
             */}
            {/* ------------------------------------------> */}
        </>
    );
}

export default App;
