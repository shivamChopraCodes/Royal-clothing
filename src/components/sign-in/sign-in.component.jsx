import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

function SignIn() {
    const [user, setUser] = useState({
        email : '',
        password : ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({
            email : '',
            password : ''
        });
        
    }

    const handleChange = e =>{
        const {name , value} = e.target;
        setUser(prevValue=>({
            ...prevValue,
            [name] : value
        }));
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email" value={user.email} onChange={handleChange} label = "Email" required />

                <FormInput name='password' type='password' value={user.password} handleChange={handleChange} label = 'Password' required />
                <div className='buttons'>
                <CustomButton type='submit'>Sign In</CustomButton>
                <CustomButton onClick ={signInWithGoogle} isGoogleSignIn >Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    );
};

export default SignIn;