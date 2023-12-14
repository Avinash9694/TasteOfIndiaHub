import React from "react";

const CheffCard = ({ cheffs }) => {
  return (
    <div className="chief-card">
      <img src={cheffs.img} alt="" />
      <div className="chief-card-info">
        <h3 className="chief-card-name">{cheffs.name}</h3>
        <p className="chief-recipe-count">
          Recipes: <b>{cheffs.recipesCount}</b>
        </p>
        <p className="chief-YOE">
          Years of experience: <b>{cheffs.yoe}</b>
        </p>
        <p className="chief-likes">
          Likes: <b>{cheffs.likes}</b>
        </p>
        <button className="chief-recipe-btn">Recipe</button>
      </div>
    </div>
  );
};

export default CheffCard;
