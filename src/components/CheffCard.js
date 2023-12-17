import React from "react";
import { Link } from "react-router-dom";
//Chef card has all the information about each chef to display in chef's recipe page
const CheffCard = ({ cheff }) => {
  return (
    <div className="chief-card">
      <img src={cheff.img} alt="" />
      <div className="chief-card-info">
        <h3 className="chief-card-name">{cheff.name}</h3>
        <p className="chief-recipe-count">
          Recipes: <b>{cheff.recipesCount}</b>
        </p>
        <p className="chief-YOE">
          Years of experience: <b>{cheff.yoe}</b>
        </p>
        <p className="chief-likes">
          Likes: <b>{cheff.likes}</b>
        </p>
        <Link to={`/chef/${cheff.id}/recipes`}>
          <button value={cheff} className="chief-recipe-btn">
            {cheff.viewRecipesButton}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheffCard;
