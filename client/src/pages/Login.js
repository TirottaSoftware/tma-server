import Login from '../components/Login';

function LoginPage({ handle }) {
    return (
        <div className='login-page'>
            <div className='login-hero'></div>
            <div className='login-form'>
                <Login handle={handle} />
            </div>
        </div>
    )
}

export default LoginPage