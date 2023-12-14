import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Recipes = () => {
  const searches = [
    "Biryani",
    "Butter Paneer",
    "Chicken Tikka",
    "Paratha",
    "Idli",
    "Dhokla",
    "Rogan-josh",
    "Vada Pav",
    "Samosa",
  ];
  return (
    <div>
      <div className="previous-searches section">
        <h2>Previous Searches</h2>
        <div className="previous-searches-container">
          {searches.map((search, index) => (
            <div
              key={index}
              style={{ animationDelay: index * 0.1 + "s" }}
              className="search-item"
            >
              {search}
            </div>
          ))}
        </div>
        <div className="search-box">
          <input type="text" placeholder="search"></input>
          <button className="btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
