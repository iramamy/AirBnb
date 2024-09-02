import React from "react";
import Image from "next/image";

interface SingleCategoryProps {
  image_path: string;
  title: string;
  onClick?: () => void;
  dataCategory?: string;
  isSelected?: boolean;
}

const SingleCategory: React.FC<SingleCategoryProps> = ({
  image_path,
  title,
  onClick,
  dataCategory,
  isSelected,
}) => {
  return (
    <div
      onClick={onClick}
      className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
        dataCategory == title
          ? "border-gray-900 opacity-100 hover:border-gray-800"
          : "border-white opacity-60 hover:border-gray-400"
      } hover:opacity-95 cursor-pointer`}
    >
      <Image src={image_path} width={20} height={20} alt="category" />
      <span className="text-xs">{title}</span>
    </div>
  );
};

export default SingleCategory;
