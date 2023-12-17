import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChefBanner from "./ChefBanner";
import RecipeCard from "./RecipeCard";
import Spinner from "./Spinner";

const CheffsRecipe = () => {
  const { id1 } = useParams();
  //using useState hook for managing state of each chef
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      //fetching data using the provided API endpoint and passing in the user's ID as a parameter.
      const response = await fetch(
        `https://taste-of-india-hub-server.vercel.app/chef/${id1}`
      );
      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //using useEffect hook to handle side effects
  useEffect(() => {
    // calling fetch data function
    fetchData();
  }, [id1]); //dependency is id of each chef

  const selectedChef = data.find((c) => c.id === id1);

  //handling condition when there is no chef
  if (!selectedChef) {
    return (
      <div>
        <Spinner />
      </div>
    );
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
