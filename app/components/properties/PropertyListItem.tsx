import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropertyListItemProps {
  id: string;
  image_path: string;
  name: string;
  price: string;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  id,
  image_path,
  name,
  price,
}) => {
  const router = useRouter();
  const property_detail_url = `/properties/${id}`;

  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push(property_detail_url)}
    >
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
