import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { auth } from "../firebase";

// Login component for user authentication
const Login = ({ currname }) => {
  // Initialize Google and GitHub authentication providers
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // React Router hook for navigation
  const navigate = useNavigate();

  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle standard email/password login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Attempt to sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      // Set error message for unsuccessful login
      console.error("Login failed", error.message);
      setErrorMessage("Either email or password is incorrect");
      // Handle error (show error message to the user)
    }
  };

  // If user is already logged in, display a message
  if (currname) {
    return <h2>User already login. Please return to home page</h2>;
  }

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google provider
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Update the user profile
      await updateProfile(user, {
        displayName: user.displayName,
      });

      // Navigate to the home page on successful sign-in
      navigate("/");
    } catch (error) {
      console.error("Google sign-in failed", error.message);
    }
  };

  // Function to handle GitHub sign-in
  const handleGitHubSignIn = async () => {
    try {
      // Sign in with GitHub provider
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      // Update the user profile
      await updateProfile(user, {
        displayName: user.displayName,
      });

      // Navigate to the home page on successful sign-in
      navigate("/");
    } catch (error) {
      console.error("GitHub sign-in failed", error.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            id="emails"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            id="passwords"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            required
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </label>
        <button style={{ marginBottom: "5px" }} type="submit">
          Login
        </button>
        <button
          style={{
            marginBottom: "5px",
            background: "grey",
          }}
          type="button"
          onClick={handleGoogleSignIn}
        >
          {" "}
          <FontAwesomeIcon
            style={{
              color: "blue",
              paddingRight: "20px",
            }}
            icon={faGoogle}
          />
          Sign in with Google
        </button>

        <button
          type="button"
          style={{ background: "grey" }}
          onClick={handleGitHubSignIn}
        >
          <FontAwesomeIcon
            style={{ color: "black", paddingRight: "20px" }}
            icon={faGithub}
          />
          Sign in with GitHub
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
