import React from "react";
// Importing specific components used in the Home component
import HeroSection from "../components/HeroSection";
import ImproveSkills from "../components/ImproveSkills";
import QuoteSection from "../components/QuoteSection";
import CheffData from "../components/CheffData";
// Home component definition
const Home = () => {
  return (
    <div>
      <HeroSection />
      <CheffData />
      <ImproveSkills />
      <QuoteSection />
    </div>
  );
};

export default Home;
