import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api/api";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 const getPasswordStrength = (password) => {

  // Nothing typed yet
  if (password.length === 0) {
    return {
      label: "",
      color: "#d1d5db",
      width: "0%",
    };
  }

  const hasLength = password.length >= 8;
const hasUpper = /[A-Z]/.test(password);
const hasLower = /[a-z]/.test(password);
const hasNumber = /[0-9]/.test(password);
const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

const score =
  Number(hasLength) +
  Number(hasUpper) +
  Number(hasLower) +
  Number(hasNumber) +
  Number(hasSpecial);

  if (score === 5) {
  return {
    label: "Strong",
    color: "#22c55e",
    width: "100%",
  };
}

if (score >= 3) {
  return {
    label: "Good",
    color: "#eab308",
    width: "75%",
  };
}

if (score >= 2) {
  return {
    label: "Fair",
    color: "#f97316",
    width: "50%",
  };
}

return {
  label: "Weak",
  color: "#ef4444",
  width: "25%",
};
};

 const strength = getPasswordStrength(password);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      alert("Passwords do not match!");

      return;

    }

    try {

      await API.post("/register", {

        full_name: name,

        email,

        password,

      });

      alert("Registration Successful!");

      navigate("/");

    }

    catch (error) {

      const details = error.response?.data?.detail;

      if (details) {
        alert(details.map(err => err.msg).join("\n"));
      } else {
        alert("Registration Failed");
      }

    }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h1>Face Deduplication</h1>

        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <small className="helper-text">
            Example: abc@example.com
          </small>

          <div className="password-wrapper">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create Password"
              value={password}
              onChange={(e)=>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={()=>
                setShowPassword(!showPassword)
              }
            >

              {
                showPassword
                ?
                <FaEyeSlash />
                :
                <FaEye />
              }

            </button>

          </div>

          <small className="helper-text">

            Password must contain at least:

            <br />

            • 8 characters

            <br />

            • One uppercase letter

            <br />

            • One lowercase letter

            <br />

            • One number

            <br />

            • One special character (@$!%*?&#)

          </small>

          <div className="strength-bar">
          <div
            className="strength-fill"
            style={{
              width: strength.width,
              background: strength.color,
            }}
          />

          </div>

          <div
            className="strength-text"
            style={{
              color: strength.color,
            }}
            >
            {strength.label}
          </div>
                    <div className="password-wrapper">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>
                setConfirmPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={()=>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >

              {
                showConfirmPassword
                ?
                <FaEyeSlash />
                :
                <FaEye />
              }

            </button>

          </div>

          {

            confirmPassword.length > 0 && (

              password === confirmPassword ?

              <small
                className="success"
              >

                ✓ Passwords Match

              </small>

              :

              <small
                className="error"
              >

                ✗ Passwords Do Not Match

              </small>

            )

          }

          <button
            className="register-btn"
            type="submit"
          >

            Register

          </button>

        </form>

        <p>

          Already have an account?{" "}

          <Link to="/">

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;