import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function Searchbar() {

    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <>
            <form onSubmit={() => navigate(`/search/${searchTerm}`)} className='searchbar'>
                <input value={searchTerm} placeholder="Search" onChange={(e) => { setSearchTerm(e.target.value) }} type='text' />
                <button type='submit'><MagnifyingGlassIcon /></button>
            </form>
        </>
    )
}

export default Searchbar