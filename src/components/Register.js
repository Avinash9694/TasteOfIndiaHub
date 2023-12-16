import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../firebase";

const Register = ({ currname }) => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const auth = getAuth(app);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // You can update the user profile here (name, photoURL, etc.)
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error.message);
      // Handle error (show error message to the user)
    }
  };

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

  if (currname) {
    return <h2>User already login. Please return to home page</h2>;
  }
  return (
    <div className="auth-container">
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
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
              setPasswordError("");
            }}
            required
          />
        </label>
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <label>
          Photo URL:
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </label>
        <button style={{ marginBottom: "5px" }} type="submit">
          Register
        </button>
        <button
          style={{ marginBottom: "5px", background: "grey" }}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>

        <button style={{ background: "grey" }} onClick={handleGitHubSignIn}>
          Sign in with GitHub
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
