import { useNavigate } from "react-router-dom";


export function Movie({ style = 0, movie, add, moviePath }) {

    const nav = useNavigate()

    return (
        <>
            <div onClick={() => { nav(moviePath); window.location.reload() }} className={`movie movie-${style}`} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})` }}>
                <div className="movie-overlay">
                    <h2>{movie.title}</h2>
                </div>
            </div>
            {
                style === "2" ?
                    <div className='movie-info'>
                        <h3>{movie.title}</h3>
                        <p>{movie.vote_average}/10</p>
                    </div>
                    : null}

        </>
    )
}