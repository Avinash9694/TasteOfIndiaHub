import React from "react";

const Navbar = () => {
  return (
    <div className="navbar container">
      <a href="#!" className="logo">
        Taste<span> of </span> India Hub
      </a>
      <div className="nav-links">
        <a href="#!">Home</a>
        <a href="#!">Recipies</a>
        <a href="#!">About</a>
      </div>
    </div>
  );
};

export default Navbar;
