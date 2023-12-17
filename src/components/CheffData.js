import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import CheffSection from "./CheffSection";

//Fetching chef data from server side and using it in chef section in home page.
const CheffData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Set loading to true when data fetching starts
      setLoading(true);
      // Simulate an API call or data loading
      const response = await fetch(
        "https://taste-of-india-hub-server.vercel.app/chef"
      );
      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Handle error and set loading to false
    }
  };
  useEffect(() => {
    fetchData();
    // Set the data and loading to false when data is loaded
    setLoading(false);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      {/* Conditional rendering based on the loading state */}
      {loading ? <Spinner /> : <CheffSection cheffs={data} />}
    </div>
  );
};

export default CheffData;
