import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=95b984723a97b73d8e8702fce60d5708&page=1";
const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?&api_key=95b984723a97b73d8e8702fce60d5708&query=";

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getMovies(FEATURED_API);
    }, []);

    const getMovies = (API) => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);
                console.log(data)
            });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            getMovies(SEARCH_API + searchTerm);
            setSearchTerm("");
        }
    };

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <header>
                <div class="center-img">
                    <img
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                        alt="logo"
                    />
                </div>
                <div class="search-bar">
                    <form onSubmit={handleOnSubmit}>
                        <input
                            className="search"
                            type="search"
                            placeholder="Search for movie"
                            value={searchTerm}
                            onChange={handleOnChange}
                        />
                    </form>
                </div>
            </header>
            <div className="movie-container">
                {movies.length > 0 &&
                    movies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
        </>
    );
}

export default App;
