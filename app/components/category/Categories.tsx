"use client";
import { useState } from "react";

// Custom components
import SingleCategory from "./SingleCategory";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState("All");

  const _setCategory = (_category: string) => {
    setCategory(_category);

    const query: SearchQuery = {
      country: searchModal.query.country,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      category: _category,
    };

    searchModal.setQuery(query);
  };

  return (
    <div className="pt-3 pb-6 flex items-center space-x-12">
      <SingleCategory
        image_path="/icons/icon2.png"
        title="All"
        onClick={() => {
          _setCategory("");
          setCategory("All");
        }}
        dataCategory={category}
      />
      <SingleCategory
        image_path="/icons/icon1.png"
        title="Beach"
        onClick={() => {
          _setCategory("Beach");
          setCategory("Beach");
        }}
        dataCategory={category}
      />
      <SingleCategory
        image_path="/icons/icon3.png"
        title="House"
        onClick={() => {
          _setCategory("House");
          setCategory("House");
        }}
        dataCategory={category}
      />
      <SingleCategory
        image_path="/icons/icon4.png"
        title="Wow"
        onClick={() => {
          _setCategory("Wow");
          setCategory("Wow");
        }}
        dataCategory={category}
      />
      <SingleCategory
        image_path="/icons/icon5.png"
        title="Tropical"
        onClick={() => {
          _setCategory("Tropical");
          setCategory("Tropical");
        }}
        dataCategory={category}
      />
      <SingleCategory
        image_path="/icons/icon6.png"
        title="Tiny house"
        onClick={() => {
          _setCategory("Tiny house");
          setCategory("Tiny house");
        }}
        dataCategory={category}
      />
    </div>
  );
};

export default Categories;
