import React from "react";

const Recipes = () => {
  const favoriteRecipes =
    JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

  const handleRemoveClick = (recipeName) => {
    // Remove the recipe from Local Storage
    const updatedFavorites = favoriteRecipes.filter(
      (fav) => fav.recipeName !== recipeName
    );
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
    // Force component re-render to update the UI
    window.location.reload();
  };

  return (
    <div>
      <div className="ma-fav-recipe">
        <h2>My Favorite Recipes</h2>
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
              <tr key={recipe.recipeName}>
                {/* Add recipe picture, chef name, recipe name */}
                <td>
                  <img src={recipe.img} alt="{recipe.name}" />
                </td>
                <td>{recipe.name}</td>
                <td>{recipe.recipeName}</td>
                <td>
                  <button onClick={() => handleRemoveClick(recipe.recipeName)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recipes;
