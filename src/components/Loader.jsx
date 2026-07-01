import useLoaderStore from "../store/useLoaderStore";
import "./Loader.css";

function Loader() {
  const { loading } = useLoaderStore();

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <img src="/logo.png" alt="Gatherly" className="loader-logo" />

      <div className="spinner"></div>

      <p>Loading...</p>
    </div>
  );
}

export default Loader;