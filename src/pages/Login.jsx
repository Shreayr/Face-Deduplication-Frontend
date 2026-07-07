import { useState } from "react"; //useState gives a component memory
import { Link, useNavigate } from "react-router-dom";//Used for moving between pages without refreshing the browser
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);//Initially password not shown

 const handleLogin = async (e) => {//User clicks Login
  e.preventDefault();//stops the refresh.

  try {

    const response = await API.post("/login", {
      email,
      password,
    });

    localStorage.setItem(
      "token",
      response.data.access_token
    );

    alert("Login Successful!");

    navigate("/dashboard");

  } catch (error) {

    alert(error.response?.data?.detail || "Login Failed");

  }
};

  return (
    <div
      className="login-container"
    >
      <div className="login-card">

        <h1>Face Deduplication</h1>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
<div className="password-wrapper">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;