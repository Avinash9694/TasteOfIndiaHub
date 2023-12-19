import React from "react";

const About = () => {
  // Render the About component
  return (
    // Container for the About section with a CSS class 'about'
    <div className="about">
      <div style={{ height: "500px" }} className="div1">
        <div style={{ textAlign: "center" }}>
          <img
            style={{ height: "100px" }}
            src="/img/gallery/taste.png"
            alt="tasteofindia"
          />
        </div>
        <div>
          <h1>TASTE OF INDIA</h1>
          <h2>
            Taste of India Hub is a place where you can please your soul and
            tummy with delicious food recepies of all cuisine
          </h2>
        </div>
      </div>
    </div>
  );
};

export default About;
