import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChefBanner from "./ChefBanner";
import RecipeCard from "./RecipeCard";

const CheffsRecipe = () => {
  const { id1 } = useParams();
  console.log(id1);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/chef/${id1}`);
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id1]);

  const selectedChef = data.find((c) => c.id === id1);

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
