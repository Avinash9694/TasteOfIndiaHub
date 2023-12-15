import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    // Check if the recipe is already marked as a favorite
    if (isFavorite) {
      toast.info("Recipe removed from favorites");
    } else {
      toast.success("Recipe added to favorites");
    }

    // Toggle the favorite state
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.recipeName}</h3>
      <p>Ingredients: {recipe.ingredients.join(", ")}</p>
      <p>Cooking Method: {recipe.cookingMethod}</p>
      <p>Rating: {recipe.rating}</p>
      <button onClick={handleFavoriteClick} className="favorite-button">
        {isFavorite ? "Favorited" : "Favorite"}
      </button>
    </div>
  );
};

export default RecipeCard;
