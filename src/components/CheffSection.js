import React from "react";
import CheffCard from "./CheffCard";

const CheffSection = () => {
  const cheffs = [
    {
      name: "Vikas Khanna",
      img: "/img/top-cheff/img_1.jpg",
      recipesCount: "107",
      yoe: "28",
      likes: "1928",
    },
    {
      name: "Pooja Dhingra",
      img: "/img/top-cheff/img_2.jpg",
      recipesCount: "45",
      yoe: "13",
      likes: "1311",
    },
    {
      name: "Ranveer Brar",
      img: "/img/top-cheff/img_3.jpg",
      recipesCount: "81",
      yoe: "23",
      likes: "1276",
    },
    {
      name: "Shipra Khanna",
      img: "/img/top-cheff/img_4.jpg",
      recipesCount: "78",
      yoe: "17",
      likes: "1537",
    },
    {
      name: "Sanjeev Kapoor",
      img: "/img/top-cheff/img_5.jpg",
      recipesCount: "132",
      yoe: "38",
      likes: "2148",
    },
    {
      name: "Pankaj Bhadouria",
      img: "/img/top-cheff/img_6.jpg",
      recipesCount: "49",
      yoe: "15",
      likes: "932",
    },
  ];
  return (
    <div className="section chiefs">
      <h1 className="title">Top cheffs</h1>
      <div className="top-chiefs-container">
        {/* <CheffCard />
        <CheffCard />
        <CheffCard />
        <CheffCard />
        <CheffCard />
        <CheffCard /> */}
        {cheffs.map((cheffs) => (
          <CheffCard key={cheffs.name} cheffs={cheffs} />
        ))}
      </div>
    </div>
  );
};

export default CheffSection;
