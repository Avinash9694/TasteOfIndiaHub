import React from "react";

const ChefBanner = ({ chef }) => {
  return (
    <div className="chief-banner">
      <img src={chef.img} alt={chef.name} />
      <div className="chief-banner-info">
        <h3 className="chief-banner-name">{chef.name}</h3>
        <h4 className="chief-banner-bio">{chef.bio}</h4>
        <p className="chief-recipe-count">Recipes: {chef.recipesCount}</p>
        <p className="chief-YOE">Years of experience: {chef.yoe}</p>
        <p className="chief-likes">Likes: {chef.likes}</p>
      </div>
    </div>
  );
};

export default ChefBanner;
