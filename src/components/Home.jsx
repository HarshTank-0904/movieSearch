import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import Favourite from './Favourite';

function Home() {
  const [movieAllData, setMovieAllData] = useState(
    JSON.parse(localStorage.getItem("movieData")) || []
  );
  const [inputValue, setInputValue] = useState(
    localStorage.getItem("searchQuery") || "Harry Potter"
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || {}
  );

  useEffect(() => {
    if (!localStorage.getItem("movieData")) {
      getMovieData();
    }
  }, []);

  const getMovieData = async () => {
    try {
      const pages = [1, 2, 3]; // Fetch multiple pages
      const requests = pages.map((page) =>
        axios.get(
          `https://www.omdbapi.com/?apikey=51594f22&s=${inputValue}&page=${page}`
        )
      );

      const responses = await Promise.all(requests);
      const allMovies = responses.flatMap(
        (response) => response.data.Search || []
      );

      setMovieAllData(allMovies);
      localStorage.setItem("movieData", JSON.stringify(allMovies));
      localStorage.setItem("searchQuery", inputValue);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      getMovieData();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Call search when Enter is pressed
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const updatedFavorites = { ...prev };
      if (updatedFavorites[movie.imdbID]) {
        delete updatedFavorites[movie.imdbID];
      } else {
        updatedFavorites[movie.imdbID] = movie;
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div className="container-fluid">
      <div className="row px-4">
        <div className="col-6">
          <h1 className="heading">Watch Your Favourite Movies.</h1>
          <ul className="desc-list">
            <li className="desc">
              📌 Browse your favorite movies from a vast collection.
            </li>
            <li className="desc">
              🎬 Click on a movie poster to view detailed information, including
              cast, plot, ratings, and reviews.
            </li>
            <li className="desc">
              ❤️ Tap <FavoriteBorderIcon /> to add movies to your favorites list
              and easily access them later.
            </li>
          </ul>

          <div className="d-flex gap-2 mt-3">
            <input
              type="text"
              className="w-75 outline-none border-0 rounded px-2 search-bar"
              placeholder="Search Your Favourite ..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress} // ✅ Enter to search
            />
            <button className="w-25 border-0 search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Show No Result Message */}
      {movieAllData.length === 0 ? (
        <p className="text-center text-light mt-4">
          No results found. Try another search.
        </p>
      ) : (
        <div className="row px-4 my-5 g-4">
          {" "}
          {movieAllData.map((movie) => (
            <div
              key={movie.imdbID}
              className="col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex"
            >
              <NavLink
                to={`/single/${movie.imdbID}`}
                className="text-decoration-none w-100"
              >
                <div className="card-bg rounded position-relative p-2 h-100">
                  <img
                    src={movie?.Poster}
                    alt={movie?.Title}
                    className="movie-card p-2 pb-0 w-100"
                  />
                  <p className="mov-title fs-6 text-center m-0 px-2">
                    {movie?.Title}
                  </p>
                  <Tooltip
                    title={
                      favorites[movie.imdbID]
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    arrow
                  >
                    <div
                      className="favorite-icon"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents NavLink from triggering on click
                        toggleFavorite(movie);
                      }}
                    >
                      {favorites[movie.imdbID] ? (
                        <FavoriteIcon className="fav-icon active" />
                      ) : (
                        <FavoriteBorderIcon className="fav-icon" />
                      )}
                    </div>
                  </Tooltip>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
