import { Bars3Icon } from '@heroicons/react/24/outline'

function Burger({ onClick }) {
    return (
        <div className='burger'>
            <Bars3Icon className='burger-icon' onClick={onClick} />
        </div>
    )
}

export default Burger