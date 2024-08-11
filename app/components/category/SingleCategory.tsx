import React from "react";
import Image from "next/image";

interface SingleCategoryProps {
  image_path: string;
  title: string;
}

const SingleCategory: React.FC<SingleCategoryProps> = ({
  image_path,
  title,
}) => {
  return (
    <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100 cursor-pointer">
      <Image src={image_path} width={20} height={20} alt="category" />
      <span className="text-xs">{title}</span>
    </div>
  );
};

export default SingleCategory;
