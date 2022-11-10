import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Movie } from '../components/Movie';
import axios from 'axios';

function Search() {
    const { searchTerm } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        const query = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}`
        axios.get(query).then(res => {
            setResults(res.data.results)
        })
    }, [])

    return (
        <div className='search-container'>
            <h1>Results for "{searchTerm}"</h1>
            {
                results.length > 0 ?
                    <div className='search-list'>
                        {
                            results.map(m => {
                                return <Movie moviePath={`/movie/${m.id}`} key={m.id} movie={m} />
                            })}
                    </div>
                    :
                    <p className='search-msg'>Your search did not match any movies</p>
            }
        </div>
    )
}

export default Search