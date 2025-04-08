import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";

function Favourite() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavoriteMovies(Object.values(storedFavorites)); // Convert object to array
  }, []);

  const removeFavorite = (imdbID) => {
    const updatedFavorites = {
      ...JSON.parse(localStorage.getItem("favorites")),
    };
    delete updatedFavorites[imdbID];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoriteMovies(Object.values(updatedFavorites)); // Update state
  };

  return (
    <div className="container-fluid">
      <h1 className="heading text-center my-4">Your Favourite Movies ❤️</h1>

      {favoriteMovies.length === 0 ? (
        <p className="text-center text-light">No favorite movies added yet!</p>
      ) : (
        <div className="row px-4 my-5 row-gap-4">
          {favoriteMovies.map((movie) => (
            <div
              key={movie.imdbID}
              className="col-sm-6 col-md-4 col-lg-3 col-xl-2"
            >
              <div className="card-bg rounded position-relative">
                {/* ✅ Wrap Image & Title with Link to Single Page */}
                <Link
                  to={`/single/${movie.imdbID}`}
                  className="text-decoration-none"
                >
                  <img
                    src={movie?.Poster}
                    alt="movie-cart"
                    className="movie-card p-2 pb-0 w-100"
                  />
                  <p className="mov-title fs-6 text-center m-0">
                    {movie?.Title}
                  </p>
                </Link>

                {/* Remove from Favorites */}
                <Tooltip title="Click to remove from favorites" arrow>
                  <div
                    className="favorite-icon"
                    onClick={() => removeFavorite(movie.imdbID)}
                  >
                    <FavoriteIcon className="fav-icon active" />
                  </div>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourite;
