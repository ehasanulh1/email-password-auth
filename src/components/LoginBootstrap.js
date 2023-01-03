import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const LoginBootstrap = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
            })
            .catch(error => {
                console.error('error', error)
            })
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email)
    }

    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Please enter your email address')
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Password Reset email sent. Please check your email.')
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h1 className='text-primary'>Please Login!!</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                    <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Please enter your email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Please enter your password" required />
                </div>
                <button onSubmit={handleSubmit} className="btn btn-primary" type="submit">Log In</button>
            </form>
            {success && <p className='text-success'>Successfully login to the account</p>}
            <p><small>New to this website? please <Link to='/register'>Register</Link></small></p>
            <p><small>Forget Password? <button onClick={handleForgetPassword} type="button" className="btn btn-link">Reset Password</button></small></p>
        </div>
    );
};

export default LoginBootstrap;