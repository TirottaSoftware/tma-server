import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import Loader from '../components/Loader';

function Trending({ addToList }) {
    const [movies, setMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState();
    const { authState } = useContext(AuthContext);

    const moviesUri = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`

    useEffect(() => {
        axios.get(moviesUri)
            .then(res => {
                setMovies(res.data.results.slice(1));
                setBannerMovie(res.data.results[0])
                console.log(res.data.results)
            })
    }, [])

    return (
        <>
            {
                (movies && bannerMovie) ?
                    <>
                        <div className='trending-container'>
                            <Banner movie={bannerMovie} add={addToList} />
                            <div className='trending-row'>
                                <MovieRow slice={10} movies={movies} addToList={addToList} />
                            </div>
                        </div>
                    </>
                    : <Loader />
            }
        </>
    )
}

export default Trending