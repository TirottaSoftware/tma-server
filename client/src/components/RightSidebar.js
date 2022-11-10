import React from 'react'
import { Movie } from './Movie'

function RightSidebar({ movies }) {
    return (
        <div className='sidebar-right'>
            <h2 className='subheading'>Top Rated</h2>
            {movies.slice(0, 3).map(m => {
                return <Movie style="2" moviePath={`/movie/${m.id}`} movie={m} />
            })}
        </div>
    )
}

export default RightSidebar