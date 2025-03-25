import { useState, useEffect, Suspense, lazy } from "react";
import Search from "./components/Search";
import { useDebounce } from "react-use";
import Skeleton from "./components/Skeleton";
import { useMovie } from "./MovieContext";
import { ArrowLeftIcon } from "lucide-react";

const MovieCard = lazy(() => import("./components/MovieCard"));

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const { setSelectedMovie } = useMovie();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.error || "Failed to fetch movies.");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        {!isSearching && (
          <header>
            <img
              src="./hero.png"
              alt="Hero Banner"
              className="w-40 sm:w-56 md:w-72 lg:w-96 xl:w-[400px] mx-auto"
            />
            <h1>
              Get Movie Details With <br />
              <span className="text-gradient">MovieFlix</span>
            </h1>
          </header>
        )}

        <div className="flex items-center w-full gap-[1rem]">
          {isSearching && (
            <ArrowLeftIcon
              className="text-gray-100/75 cursor-pointer w-10 h-10 mt-[2rem]"
              onClick={() => {
                setIsSearching(false);
                setSearchTerm("");
              }}
            />
          )}
          <Search
            searchTerm={searchTerm}
            setSearchTerm={(value) => {
              setSearchTerm(value);
              if (!isSearching) setIsSearching(true);
            }}
            onFocus={() => setIsSearching(true)}
          />
        </div>

        <section className="all-movies">
          <h2 className="mt-[40px] text-gradient">Feature Movies</h2>
          {isLoading ? (
            <Skeleton />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
