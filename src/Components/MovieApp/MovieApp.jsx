import React, { useState } from "react";
import "./MovieApp.css";
import Search_icon from "../../assets/search.svg";
import Tomato_logo from "../../assets/rtomato.png";
import axios from "axios";
import Wait from "../../assets/wait.gif";

const MovieApp = () => {
  const [movieName, setMovieName] = useState("");
  const [year, setYear] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "bde886a1";

  const fetchMovieDetails = async () => {
    if (movieName === "") return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?t=${movieName}&y=${year}&apikey=${apiKey}`
      );
      if (response.data.Response === "False") {
        setError(
          "*** Invalid movie name or Movie not found. Please try again."
        );
        setMovieDetails(null);
      } else {
        setMovieDetails(response.data);
      }
    } catch (err) {
      setError("Error fetching movie details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovieDetails();
  };

  return (
    <div className="container">
      <h2 className="main-title">Movie Details App</h2>
      <form className="search-section" onSubmit={handleSubmit}>
        <input
          type="text"
          className="movie-name"
          placeholder="Enter Movie Name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          type="text"
          min="1900"
          max="2099"
          step="1"
          className="movie-year"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button
          className="search-btn submit-btn"
          type="submit"
          title="search button"
        >
          <img src={Search_icon} alt="" />
        </button>
      </form>
      {loading && (
        <p className="loading">
          Loading...
          <img src={Wait} alt="" />
        </p>
      )}
      {error && <p className="error">{error}</p>}
      {movieDetails && (
        <div className="movie-info">
          <img
            className="movie-poster"
            src={movieDetails.Poster}
            alt={movieDetails.Title}
          />
          <h3 className="movie-title">{movieDetails.Title}</h3>
          <h3 className="movie-title">({movieDetails.Year})</h3>
          <table id="movie-details-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Director</th>
                <th>Genre</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <td>{movieDetails.Title}</td>
              <td>{movieDetails.Year}</td>
              <td>{movieDetails.Director}</td>
              <td>{movieDetails.Genre}</td>
              <td className="tomato-logo">
                {movieDetails.Ratings && movieDetails.Ratings[1]
                  ? movieDetails.Ratings[1].Value
                  : "N/A"}
                <img src={Tomato_logo} alt="" />
              </td>
            </tbody>
          </table>
          <table id="movie-details-table">
            <thead>
              <tr>
                <th>Writer</th>
                <th>Actors</th>
                <th>Language</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              <td>{movieDetails.Writer}</td>
              <td>{movieDetails.Actors}</td>
              <td>{movieDetails.Language}</td>
              <td>{movieDetails.Country}</td>
            </tbody>
          </table>
          <table id="movie-details-table">
            <thead>
              <tr>
                <th>Released</th>
                <th>Runtime</th>
                <th>BoxOffice</th>
                <th>Awards</th>
              </tr>
            </thead>
            <tbody>
              <td>{movieDetails.Released}</td>
              <td>{movieDetails.Runtime}</td>
              <td>{movieDetails.BoxOffice}</td>
              <td>{movieDetails.Awards}</td>
            </tbody>
          </table>
          <div className="plot">
            <p>{movieDetails.Plot}</p>
          </div>
        </div>
      )}

      <div className="footer">
        <p>
          Created by{" "}
          <a href="https://www.upwork.com/freelancers/~01386d08f6baa0d69c">
            Dhanushka Rathnayaka
          </a>
        </p>
      </div>
    </div>
  );
};

export default MovieApp;
