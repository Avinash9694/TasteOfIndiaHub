import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    // Check if the recipe is already marked as a favorite
    if (isFavorite) {
      toast.info("Recipe removed from favorites");
      removeFavoriteRecipe(recipe.recipeName);
    } else {
      toast.success("Recipe added to favorites");
      addFavoriteRecipe(recipe);
    }

    // Toggle the favorite state
    setIsFavorite(!isFavorite);
  };
  const addFavoriteRecipe = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    localStorage.setItem(
      "favoriteRecipes",
      JSON.stringify([...favorites, recipe])
    );
  };

  const removeFavoriteRecipe = (recipeName) => {
    const favorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    const updatedFavorites = favorites.filter(
      (fav) => fav.recipeName !== recipeName
    );
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
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
