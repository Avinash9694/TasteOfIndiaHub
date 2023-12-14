import React from "react";
import CheffCard from "./CheffCard";
import cheffs from "./cheffData";
const CheffSection = () => {
  return (
    <div className="section chiefs">
      <h1 className="title">Top cheffs</h1>
      <div className="top-chiefs-container">
        {cheffs.map((cheffs) => (
          <CheffCard key={cheffs.name} cheffs={cheffs} />
        ))}
      </div>
    </div>
  );
};

export default CheffSection;
