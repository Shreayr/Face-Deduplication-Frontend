import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  FaImages,
  FaUsers,
  FaClone,
  FaArrowRight
} from "react-icons/fa";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="hero">

          <h1>Welcome to Face Deduplication</h1>

          <p>
            Detect duplicate faces from hundreds of
            images using AI-powered facial recognition.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/upload")}
          >
            Start Detection
            <FaArrowRight />
          </button>

        </div>

        <div className="stats">

          <div className="stat-card">

            <FaImages className="icon" />

            <h2>0</h2>

            <p>Images Uploaded</p>

          </div>

          <div className="stat-card">

            <FaUsers className="icon" />

            <h2>0</h2>

            <p>Faces Detected</p>

          </div>

          <div className="stat-card">

            <FaClone className="icon" />

            <h2>0</h2>

            <p>Duplicate Groups</p>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;