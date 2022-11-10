import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Movie as MovieComponent } from '../components/Movie';
import axios from 'axios';
import Loader from '../components/Loader';

function Movie({ add, uid }) {
    const { id } = useParams()
    const [movie, setMovie] = useState({});
    const [inList, setInList] = useState(false);
    const [trailerLink, setTrailerLink] = useState("");
    const [recommended, setRecommended] = useState([]);

    const navigate = useNavigate()

    const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`;
    const recommendationsApi = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`;

    useEffect(() => {
        axios.get(`http://localhost:4000/movies/list/${uid}/${id}`)
            .then(res => {
                setInList(res.data)
            })

        axios.get(api)
            .then(res => {
                console.log(res)
                setTrailerLink(`https://www.youtube.com/watch?v=${res.data.videos.results[0]?.key}`)
                setMovie(res.data)
            })
            .catch(err => {
                console.log(err.message)
                navigate('/*')
            })

        axios.get(recommendationsApi)
            .then(res => {
                setRecommended(res.data.results)
            })
            .catch(err => {
                console.log(err.message)
                navigate('/*')
            })
    }, [])

    return (
        <>
            {
                (movie && trailerLink) ?
                    <>
                        <div className='movie-page main-content' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                            <div className='hero-overlay'></div>
                            <div className='hero-content'>
                                <h2>{movie?.title}</h2>
                                <p>{movie?.genres?.map(g => g.name).join(', ')}</p>
                                <p>{movie?.overview}</p>
                                <div className='movie-buttons'>
                                    <a href={trailerLink} target="_blank" rel='noreferrer'>Watch Trailer</a>
                                    <button onClick={() => add(movie)}>{inList ? "Remove from List" : "Add to List"}</button>
                                </div>
                            </div>
                        </div>
                        <div className='recommended-container'>
                            <div className='recommended-list'>
                                {
                                    recommended.slice(0, 9)?.map(m => {
                                        return <MovieComponent key={m.id} style="3" movie={m} moviePath={`/movie/${m.id}`} />
                                    })
                                }
                            </div>
                        </div>
                    </>
                    : <Loader />
            }
        </>
    )
}

export default Movie