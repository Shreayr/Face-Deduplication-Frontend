import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">

      <h2 className="logo">
        Face Deduplication
      </h2>

      <div className="nav-links">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/upload">Upload</Link>

        <Link to="/results">Results</Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;