import React from "react";

// Custom components
import SingleCategory from "./SingleCategory";

const Categories = () => {
  return (
    <div className="pt-3 pb-6 flex items-center space-x-12">
      <SingleCategory image_path="/icons/icon1.png" title="Beach" />
      <SingleCategory image_path="/icons/icon2.png" title="Off-grid" />
      <SingleCategory image_path="/icons/icon3.png" title="House" />
      <SingleCategory image_path="/icons/icon4.png" title="Wow" />
      <SingleCategory image_path="/icons/icon5.png" title="Tropical" />
      <SingleCategory image_path="/icons/icon6.png" title="Tiny house" />
    </div>
  );
};

export default Categories;
