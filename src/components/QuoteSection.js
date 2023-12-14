import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const QuoteSection = () => {
  return (
    <div className="section quote">
      <p className="qoute-text">
        <FontAwesomeIcon icon={faQuoteLeft} /> Do not be afraid of cooking as
        your ingredients will know, and misbehave. Enjoy your cooking and the
        food will behave; moreover it will pass your pleasure on to those who
        eat it.
      </p>
      <p className="qoute-auther">- Fergus Henderson</p>
    </div>
  );
};

export default QuoteSection;
