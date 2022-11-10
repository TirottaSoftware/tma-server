import React from 'react'
import { Movie } from './Movie'

function MovieRow({ movies, addToList, slice = 4 }) {
    return (
        <div className='movie-row'>
            {
                movies.slice(0, slice).map(m => {
                    return <Movie key={m.id} add={addToList} moviePath={`/movie/${m.id}`} movie={m} />
                })
            }
        </div>
    )
}

export default MovieRow