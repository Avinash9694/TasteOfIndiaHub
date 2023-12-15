import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faBlog,
  faInfoCircle,
  faAdjust,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
  // function to toggle theme
  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.classList.contains("dark-theme")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    root.classList.remove(`${currentTheme}-theme`);
    root.classList.add(`${newTheme}-theme`);
    // Save the current theme to local storage for persistence
    localStorage.setItem("theme", newTheme);
  };

  // Check local storage for theme preference
  const savedTheme = localStorage.getItem("theme");

  // Apply the theme to the root element
  document.documentElement.classList.add(`${savedTheme}-theme`);

  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "Favorite-Recipes",
      path: "/recipes",
      icon: faList,
    },
    {
      name: "Blog",
      path: "/blog",
      icon: faBlog,
    },
    {
      name: "About",
      path: "/about",
      icon: faInfoCircle,
    },
  ];

  function closeSidebar() {
    setShowSidebar(false);
  }
  return (
    <>
      <div className="navbar container">
        <FontAwesomeIcon onClick={toggleTheme} icon={faAdjust} />
        <a href="#!" className="logo">
          Taste<span> of </span> India Hub
        </a>

        <div className="nav-links">
          {links.map((link) => (
            <Link
              className={location.pathname === link.path ? "active" : ""}
              to={link.path}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {showSidebar && <Sidebar close={closeSidebar} links={links} />}
    </>
  );
};

export default Navbar;
