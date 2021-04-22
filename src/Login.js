import React, {useState, useContext} from "react";
import {AuthContext} from './index';
import firebase from 'firebase';
require('firebase/auth')

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            if(res.user) Auth.setLoggedIn(true)
        })
        .catch(e => {
            setErrors(e.message);
        })
    }

    const onLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                // The signed-in user info.
                var user = result.user;
                if(user) Auth.setLoggedIn(true);
            }).catch((error) => {
                console.log(error)
            });
    }
    /*
    const handleForm = e => {
        e.preventDefault();
        console.log(Auth);
        Auth.setLoggedIn(true);
    };*/

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={e => handleForm(e)}>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="email"
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                />
                <hr />
                <button class="googleBtn" type="button" onClick={onLogin}>
                    <img
                        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                        alt="logo"
                    />
                    Login with Google
                </button>
                <button type="submit" >
                         Login</button>
                <span>{error}</span>
            </form>
        </div>
    );
};

export default Login;