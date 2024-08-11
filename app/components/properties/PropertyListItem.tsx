import Image from "next/image";

interface PropertyListItemProps {
  image_path: string;
  name: string;
  price: string;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  image_path,
  name,
  price,
}) => {
  return (
    <div className="cursor-pointer">
      <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
          fill
          src={image_path}
          sizes="(max-width: 768px) 768px (max-width: 1200px): 768px, 768px "
          className="hover:scale-110 object-cover transition h-full w-full"
          alt="Properties"
        />
      </div>
      <div className="mt-2 flex flex-col">
        <span className="text-sm font-bold">{name}</span>
        <span className="text-xs text-gray-500">
          <strong>${price}</strong> per night
        </span>
      </div>
    </div>
  );
};

export default PropertyListItem;
