import React from "react";
import HeroSection from "../components/HeroSection";
import ImproveSkills from "../components/ImproveSkills";
import QuoteSection from "../components/QuoteSection";
import CheffSection from "../components/CheffSection";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <CheffSection />
      <ImproveSkills />
      <QuoteSection />
    </div>
  );
};

export default Home;
