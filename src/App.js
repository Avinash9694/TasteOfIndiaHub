import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Blog from "./pages/Blog";
import About from "./pages/About";
import CheffsRecipe from "./components/CheffsRecipe";
import NotFound from "./components/Notfound";

import { auth } from "./firebase";
function App() {
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://i.pinimg.com/originals/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg"
  );
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setProfilePic(user.photoURL);
      } else {
        setUserName("");
        setProfilePic("");
      }
    });
  }, []);
  return (
    <Router>
      <Navbar currname={userName} pr={profilePic} />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login currname={userName} />} />
          <Route path="/register" element={<Register currname={userName} />} />
          <Route path="/chef/:name/recipes" element={<CheffsRecipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
