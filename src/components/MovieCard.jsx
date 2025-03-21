import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie = {} }) => {
  const {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    id,
  } = movie;

  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w200/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
        className="h-[300px] w-full object-cover rounded-lg"
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
