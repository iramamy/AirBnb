"use client";
import SingleCategory from "../category/SingleCategory";

interface CategoriesProps {
  dataCategory?: string;
  setCategory?: (category: string) => void;
}

const PropertyCategories: React.FC<CategoriesProps> = ({
  dataCategory,
  setCategory,
}) => {
  return (
    <div className="pt-3 pb-6 flex items-center space-x-4">
      <SingleCategory
        image_path="/icons/icon1.png"
        title="Beach"
        onClick={() => setCategory?.("Beach")}
        dataCategory={dataCategory}
        isSelected={dataCategory === "Beach"}
      />
      <SingleCategory
        image_path="/icons/icon2.png"
        title="Off-grid"
        onClick={() => setCategory?.("Off-grid")}
        dataCategory={dataCategory}
        isSelected={dataCategory === "Off-grid"}
      />
      <SingleCategory
        image_path="/icons/icon3.png"
        title="House"
        onClick={() => setCategory?.("House")}
        dataCategory={dataCategory}
        isSelected={dataCategory === "House"}
      />
      <SingleCategory
        image_path="/icons/icon4.png"
        title="Wow"
        onClick={() => setCategory?.("Wow")}
        dataCategory={dataCategory}
        isSelected={dataCategory === "Wow"}
      />
      <SingleCategory
        image_path="/icons/icon5.png"
        title="Tropical"
        onClick={() => setCategory?.("Tropical")}
        dataCategory={dataCategory}
        isSelected={dataCategory === "Tropical"}
      />
      <SingleCategory
        image_path="/icons/icon6.png"
        title="Tiny house"
        onClick={() => setCategory?.("Tiny house")}
        dataCategory={dataCategory}
        isSelected={dataCategory === "Tiny house"}
      />
    </div>
  );
};

export default PropertyCategories;
