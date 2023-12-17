import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import CheffSection from "./CheffSection";
const CheffData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Set loading to true when data fetching starts
      setLoading(true);

      const response = await fetch("http://localhost:5000/chef");
      const jsonData = await response.json();

      // Set the data and loading to false when data is loaded
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Handle error and set loading to false
    }
  };
  useEffect(() => {
    // Simulate an API call or data loading
    fetchData();
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
