import React from "react";
import CheffCard from "./CheffCard";
import cheffs from "./CheffData";
const CheffSection = () => {
  return (
    <div className="section chiefs">
      <h1 className="title">Top cheffs</h1>
      <div className="top-chiefs-container">
        {cheffs.map((cheff) => (
          <CheffCard key={cheff.name} cheff={cheff} />
        ))}
      </div>
    </div>
  );
};

export default CheffSection;
