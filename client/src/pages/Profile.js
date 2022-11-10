import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile({ uid }) {

    const [profile, setProfile] = useState({})
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/profile/' + uid).then(res => {
            setProfile(res.data);
            setUsername(res.data.name);
            setEmail(res.data.email)
            setProfilePicture(res.data.profilePictureUrl)
        })
    }, [])

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        console.log(password, newPassword, newPasswordConfirm)
        axios.put('http://localhost:4000/profile/updatePassword', { uid, oldPassword: password, newPassword, newPasswordConfirm })
            .then(res => {
                console.log(res.data)
                if (res.data.error) {
                    toast.error(res.data.error);
                }
                else {
                    toast.success("Password Updated Successfully.")
                }
            })
    }

    const handleDataChange = (e) => {
        e.preventDefault();
        console.log(username, email, profilePicture)

        // Send a PUT request to API
        axios.put('http://localhost:4000/profile/' + uid, { username, email, profilePicture }).then(res => {
            console.log(res.data)
            if (res.data.error) {
                toast.error(res.data.error)
            }
            else {
                toast.success("Data Updated Successfully.")
            }
        })
    }

    return (
        <div className='main-content profile-container'>
            <ToastContainer theme="dark" />
            <div className='profile-picture img-wrapper'>
                <img src={profile.profilePictureUrl} alt="Profile" />
            </div>
            <div className='profile-settings'>
                <form onSubmit={handleDataChange} >
                    <h2>Profile Data</h2>
                    <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
                    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='url' placeholder='Profile Picture URL' value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
                    <input type='submit' value="Save" />
                </form>

                <form onSubmit={handlePasswordUpdate} >
                    <h2>Change Password</h2>
                    <input type='password' placeholder='Current password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    <input type='password' placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <input type='password' placeholder='Confirm New Password' value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                    <input type='submit' value="Update Password" />
                </form>
            </div>
        </div>
    )
}

export default Profile