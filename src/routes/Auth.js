import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAcount, setNewAcount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAcount){
                //create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            };
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAcount(prev => !prev);
    const onSocialClick = async (e) => {
        const {target:{name}} = e;
        let provider;
        if(name === 'google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === 'github'){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value={newAcount ? "Create Account" : "Log In"} />
                {error}
            </form>
    <span onClick={toggleAccount}>{newAcount ? "Sign in" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with github</button>
            </div>
        </div>
    );
}

export default Auth;