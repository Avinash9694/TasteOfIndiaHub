import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ImproveSkills from "./components/ImproveSkills";
import QuoteSection from "./components/QuoteSection";
import CheffSection from "./components/CheffSection";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container main">
        <HeroSection />
        <CheffSection />
        <ImproveSkills />
        <QuoteSection />
      </div>
      <Footer />
    </div>
  );
}

export default App;
