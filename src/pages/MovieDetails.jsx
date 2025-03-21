import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${id}?append_to_response=videos,credits,images`,
          API_OPTIONS
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
        }

        const data = await response.json();
        setMovie(data);

        const trailerVideo = data.videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(
          trailerVideo
            ? `https://www.youtube.com/embed/${trailerVideo.key}`
            : null
        );
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Could not load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading)
    return (
      <p className="text-center text-gray-300 text-lg">
        Loading movie details...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-lg font-semibold">{error}</p>
    );

  return (
    <div className="relative max-w-7xl mx-auto p-10 bg-[#030014] rounded-xl shadow-xl text-white flex flex-col lg:flex-row gap-12">
      <Link
        to="/"
        className="fixed top-5 left-5 text-[#f81a1a] z-50 text-lg font-semibold hover:underline bg-gray-800 px-4 py-2 rounded-lg shadow-lg"
      >
        ← Back to Home
      </Link>
      {movie && (
        <>
          <div className="relative w-full lg:w-1/2 h-[600px] overflow-hidden rounded-xl">
            <img
              src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
              alt={movie.title}
              className="object-cover w-full h-full rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
            <h2 className="text-5xl font-extrabold text-[#f81a1a] leading-tight">
              {movie.title}
            </h2>
            <p className="text-gray-400 italic text-lg">{movie.tagline}</p>
            <p className="text-gray-200 leading-relaxed text-lg">
              {movie.overview}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-lg">
              <p className="text-gray-300">
                Release Date:{" "}
                <span className="font-semibold text-white">
                  {movie.release_date}
                </span>
              </p>
              <p className="text-gray-300">
                Rating:{" "}
                <span className="font-semibold text-white">
                  {movie.vote_average.toFixed(1)}
                </span>
              </p>
              <p className="text-gray-300">
                Language:{" "}
                <span className="font-semibold text-white">
                  {movie.original_language.toUpperCase()}
                </span>
              </p>
              <p className="text-gray-300">
                Genres:{" "}
                <span className="font-semibold text-white">
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </span>
              </p>
              <p className="text-gray-300">
                Runtime:{" "}
                <span className="font-semibold text-white">
                  {movie.runtime} mins
                </span>
              </p>
            </div>
            {trailer && (
              <div className="mt-8">
                <h3 className="text-3xl font-bold text-[#f81a1a]">
                  Watch Trailer
                </h3>
                <div className="mt-4 w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={trailer}
                    title="Movie Trailer"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
