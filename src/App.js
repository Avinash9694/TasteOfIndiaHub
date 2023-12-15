import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Blog from "./pages/Blog";
import About from "./pages/About";
import CheffsRecipe from "./components/CheffsRecipe";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/chef/:name/recipes" element={<CheffsRecipe />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
