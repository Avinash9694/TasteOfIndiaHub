import React from "react";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const navigate = useNavigate();

  // Retrieve favorite recipes from Local Storage, default to an empty array if null
  const favoriteRecipes =
    JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

  // Function to handle the removal of a favorite recipe
  const handleRemoveClick = (recipeName) => {
    // Remove the recipe from Local Storage
    const updatedFavorites = favoriteRecipes.filter(
      (fav) => fav.recipeName !== recipeName
    );
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
    // Force component re-render to update the UI
    navigate("/recipes");
  };

  return (
    <div>
      <div className="ma-fav-recipe">
        <h2>My Favorite Recipes</h2>
        {favoriteRecipes.length === 0 ? (
          <p>Nothing added to favorites.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Recipe Picture</th>
                <th>Chef Name</th>
                <th>Recipe Name</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {favoriteRecipes.map((recipe) => (
                <tr key={recipe.img}>
                  {/* Add recipe picture, chef name, recipe name */}
                  <td>
                    <img src={recipe.img} alt={recipe.name} />
                  </td>
                  <td>{recipe.name}</td>
                  <td>{recipe.recipeName}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveClick(recipe.recipeName)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Recipes;
