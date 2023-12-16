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

const Login = ({ currname }) => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.message);
      setErrorMessage("Either email or password is incorrect");
      // Handle error (show error message to the user)
    }
  };
  if (currname) {
    return <h2>User already login. Please return to home page</h2>;
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Update the user profile
      await updateProfile(user, {
        displayName: user.displayName,
      });

      // Handle user data as needed
      navigate("/");
    } catch (error) {
      console.error("Google sign-in failed", error.message);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      // Update the user profile
      await updateProfile(user, {
        displayName: user.displayName,
      });

      // Handle user data as needed
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
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
