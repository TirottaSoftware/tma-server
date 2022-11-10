import { useState } from 'react'
import { Link } from 'react-router-dom'


function SignUp({ handle }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (e) => {
        e.preventDefault();

        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();

        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        e.preventDefault();

        setConfirmPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        e.preventDefault();

        setEmail(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!password || !email || !username) {
        //     setErrorMessage('Please fill in all the required fields.')
        //     return;
        // }
        // if (password === confirmPassword) {
        //     if (password.length < 6) {
        //         setErrorMessage('Password must be at least 6 characters long')
        //     }
        //     setErrorMessage('')
        // }
        // else {
        //     setErrorMessage('Passwords do not match.')
        //     return;
        // }
        handle(username, password, email, confirmPassword);
    }

    return (
        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit} className='login-form'>
                <p className='error-msg'>{errorMessage}</p>
                <input onChange={handleUsernameChange} type='text' placeholder='Username' />
                <input onChange={handleEmailChange} type='email' placeholder='Email' />
                <input onChange={handlePasswordChange} type='password' placeholder='Password' />
                <input onChange={handleConfirmPasswordChange} type='password' placeholder='Confirm Password' />
                <input type='submit' value='Register' />
            </form>
            <Link to='/'><p className='login-link'>Already a member?</p></Link>
        </div>
    )
}

export default SignUp