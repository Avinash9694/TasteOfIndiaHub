import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// RecipeCard component displays information about a recipe and allows marking as favorite
const RecipeCard = ({ recipe }) => {
  // State to track whether the recipe is marked as a favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle the favorite button click
  const handleFavoriteClick = () => {
    // Check if the recipe is already marked as a favorite
    if (isFavorite) {
      // Notify user and remove the recipe from favorites
      toast.info("Recipe removed from favorites");
      removeFavoriteRecipe(recipe.recipeName);
    } else {
      // Notify user and add the recipe to favorites
      toast.success("Recipe added to favorites");
      addFavoriteRecipe(recipe);
    }

    // Toggle the favorite state
    setIsFavorite(!isFavorite);
  };
  // Function to add a recipe to the list of favorite recipes in local storage
  const addFavoriteRecipe = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    localStorage.setItem(
      "favoriteRecipes",
      JSON.stringify([...favorites, recipe])
    );
  };
  // Function to remove a recipe from the list of favorite recipes in local storage
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
