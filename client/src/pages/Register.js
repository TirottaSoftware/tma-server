import SignUp from '../components/SignUp';

function RegisterPage({ handle }) {
    return (
        <div className='login-page'>
            <div className='login-form'>
                <SignUp handle={handle} />
            </div>
            <div className='login-hero'></div>
        </div>
    )
}

export default RegisterPage