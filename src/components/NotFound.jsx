import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030014] text-white text-center p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <h1 className="text-[250px] font-extrabold text-[#f81a1a] animate-pulse">
          404
        </h1>
      </div>

      <h2 className="text-6xl font-extrabold text-[#f81a1a] relative z-10">
        Oops!
      </h2>
      <p className="text-2xl text-gray-300 mt-4 relative z-10">
        The page you are looking for doesn’t exist.
      </p>

      {/* Fun Animation */}
      <div className="relative mt-10">
        <img
          src="https://image.tmdb.org/t/p/w500/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg"
          alt="Lost in movies"
          className="rounded-xl shadow-lg w-80 animate-fadeIn"
        />
      </div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-[#f81a1a] text-white text-lg font-bold rounded-lg shadow-lg hover:bg-[#d01717] transition relative z-10"
      >
        Take Me Home 🎬
      </Link>
    </div>
  );
};

export default NotFoundPage;
