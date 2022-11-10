import React from 'react'

function Banner({ movie, add }) {
    return (
        <div className='banner'>
            <div className='banner-img'>
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="Banner Image" />
                <div className='banner-content'>
                    <h2>{movie.title}</h2>
                    <div>
                        <button className='btn-more'>More</button>
                        <button onClick={() => add(movie)} className='btn-add'>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner