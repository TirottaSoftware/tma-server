import React from 'react'
import { HomeIcon, HeartIcon, VideoCameraIcon, ArrowLeftOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'

function Sidebar({ handleLogout, toggle }) {
    return (
        <aside className={`sidebar ${toggle ? '' : 'sidebar-hidden'}`}>
            <Link className='logo' to='/'><img src={logo} alt="Logo" /></Link>
            <ul className='sidebar-links'>
                <Link to='/'><li className='sidebar-link'><HomeIcon className='sidebar-icon' />Home</li></Link>
                <Link to='/trending'><li className='sidebar-link'><VideoCameraIcon className='sidebar-icon' />Trending</li></Link>
                <Link to='/list'><li className='sidebar-link'><HeartIcon className='sidebar-icon' />My List</li></Link>
                <Link to='/profile'><li className='sidebar-link'><UserIcon className='sidebar-icon' />Profile</li></Link>
                <button className='sidebar-link' onClick={handleLogout}><ArrowLeftOnRectangleIcon className='sidebar-icon' />Logout</button>
            </ul>
        </aside>
    )
}

export default Sidebar