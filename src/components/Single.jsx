import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";

function Single() {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || {}
  );

  const getSingleData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=51594f22&i=${id}`
      );
      if (response.data.Response === "True") {
        setSingleMovie(response.data);
      } else {
        setError("Movie not found.");
      }
    } catch (err) {
      setError("Error fetching movie details. Try again later.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleData();
    }
  }, [id]);

  // ✅ Toggle Favorite Functionality
  const toggleFavorite = () => {
    setFavorites((prev) => {
      const updatedFavorites = { ...prev };

      if (updatedFavorites[id]) {
        delete updatedFavorites[id]; // Remove from favorites
      } else {
        updatedFavorites[id] = singleMovie; // Add to favorites
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save in localStorage
      return updatedFavorites;
    });
  };

  return (
    <div className="container-fluid">
      <div className="row px-3 mt-5">
        {loading && (
          <p className="text-center text-light">Loading movie details...</p>
        )}
        {error && <p className="text-danger text-center">{error}</p>}

        {singleMovie && (
          <div className="row">
            {/* ✅ Left side - Movie Poster */}
            <div className="col-md-4 text-center position-relative">
              <img
                src={
                  singleMovie.Poster !== "N/A"
                    ? singleMovie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt="Movie Poster"
                className="img-fluid rounded"
              />

              {/* ✅ Favorite Button */}
              <Tooltip
                title={
                  favorites[id] ? "Remove from favorites" : "Add to favorites"
                }
                arrow
              >
                <div className="favorite-icon position-absolute top-0 end-0 p-2">
                  {favorites[id] ? (
                    <FavoriteIcon
                      className="fav-icon active"
                      onClick={toggleFavorite}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className="fav-icon"
                      onClick={toggleFavorite}
                    />
                  )}
                </div>
              </Tooltip>
            </div>

            {/* ✅ Right side - Movie Details */}
            <div className="col-md-8">
              <h1 className="text-light">{singleMovie.Title}</h1>
              <p className="text-light">
                <strong>Actors:</strong> {singleMovie.Actors}
              </p>
              <p className="text-light">
                <strong>Genre:</strong> {singleMovie.Genre}
              </p>
              <p className="text-light">
                <strong>Released:</strong> {singleMovie.Released}
              </p>
              <p className="text-light">
                <strong>Plot:</strong>{" "}
                {singleMovie.Plot !== "N/A"
                  ? singleMovie.Plot
                  : "Plot not available."}
              </p>

              <div className="d-flex gap-4 mt-3">
                {/* Ratings */}
                <div>
                  <p className="font-weight-bold text-light fs-5">Ratings</p>
                  <p className="text-warning m-0 p-1 card-bg2 d-inline-block px-2 rounded">
                    {singleMovie.imdbRating !== "N/A"
                      ? `${singleMovie.imdbRating}/10 ⭐`
                      : "No Ratings"}
                  </p>
                </div>

                {/* Awards */}
                <div>
                  <p className="font-weight-bold text-light fs-5">Awards</p>
                  <p className="text-warning m-0 p-1 card-bg2 d-inline-block px-2 rounded">
                    {singleMovie.Awards !== "N/A"
                      ? singleMovie.Awards
                      : "No Awards"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Single;
