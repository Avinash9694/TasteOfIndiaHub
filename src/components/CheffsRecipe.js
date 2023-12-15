import React from "react";
import { useParams } from "react-router-dom";
import ChefBanner from "./ChefBanner";
import RecipeCard from "./RecipeCard";
import cheffs from "./CheffData";

const CheffsRecipe = () => {
  const { name } = useParams();
  const selectedChef = cheffs.find((c) => c.name.split(" ")[0] === name);

  if (!selectedChef) {
    return <div>Chef not found</div>;
  }

  return (
    <div>
      <ChefBanner chef={selectedChef} />
      <div className="chieffs-recipe">
        <h2>{selectedChef.name}'s Recipes</h2>
        <div>
          {selectedChef.recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={{ ...recipe, name: selectedChef.name }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheffsRecipe;
