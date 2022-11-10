import { AuthContext } from '../context/AuthContext'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Movie } from '../components/Movie'

function MyList() {

    const [movies, setMovies] = useState([])
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        console.log("User ID: ", authState?.user.uid)
        axios.get('http://localhost:4000/movies/' + authState?.user.uid).then((res) => {
            setMovies(res.data)
        })
    }, [])


    return (
        <div className='list-container'>
            <h2 className='subheading'>Your List</h2>
            <div className='my-list'>

                {movies.length > 0 ? movies?.map(m => {
                    return <Movie style="3" moviePath={`/movie/${m.forwardId}`} movie={m} />
                }) : <h2>You have no movies in your list</h2>}
            </div>
        </div>
    )
}

export default MyList