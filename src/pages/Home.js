import React from "react";
import HeroSection from "../components/HeroSection";
import ImproveSkills from "../components/ImproveSkills";
import QuoteSection from "../components/QuoteSection";
import CheffData from "../components/CheffData";
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
