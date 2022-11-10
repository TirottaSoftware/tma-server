import { useState } from 'react'
import Burger from '../components/Burger'
import Sidebar from '../components/Sidebar'

function Layout({ children, handleLogout }) {

    const [sidebarState, setSidebarState] = useState(false);

    return (
        <div className='layout'>
            <Burger onClick={() => { setSidebarState(!sidebarState) }} />
            <Sidebar toggle={sidebarState} handleLogout={handleLogout} />
            <div className='layout-main'>
                {children}
            </div>
        </div>
    )
}

export default Layout