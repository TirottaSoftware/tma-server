import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner';
import Loader from '../components/Loader';
import MovieRow from '../components/MovieRow';
import RightSidebar from '../components/RightSidebar';
import Searchbar from '../components/Searchbar';

function Home({ logout, addToList, auth }) {
    const [movies, setMovies] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [bannerMovie, setBannerMovie] = useState();

    const moviesUri = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
    const topRatedUri = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`

    useEffect(() => {
        axios.get(moviesUri)
            .then(res => {
                setMovies(res.data.results);
                setBannerMovie(res.data.results[1])
            })

        axios.get(topRatedUri)
            .then(res => {
                setTopRated(res.data.results);
            })
    }, [])

    return (
        <>
            {
                (bannerMovie && topRated && movies) ?
                    <div className='main-content'>
                        <div className='home'>
                            <Searchbar />
                            <Banner movie={bannerMovie} add={addToList} />
                            <h2 className="subheading">For You</h2>
                            <MovieRow movies={movies} addToList={addToList} />
                        </div>
                        <RightSidebar movies={topRated} />
                    </div>
                    : <Loader />
            }
        </>
    )
}

export default Home