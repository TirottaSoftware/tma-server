import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login({ handle }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={(e) => handle(e, username, password)}>
                <input placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="Submit" defaultValue="Login" />
            </form>
            <Link to='/signup'><p className='login-link'>Create an Account</p></Link>
        </div>
    )
}

export default Login