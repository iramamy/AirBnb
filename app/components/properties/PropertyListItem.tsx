import Image from "next/image";
import { useRouter } from "next/navigation";

// Custom components
import FavoriteButton from "../FavoriteButton";
import CustomButton from "../forms/CustomButton";

interface PropertyListItemProps {
  id: string;
  image_path: string;
  name: string;
  price: string;
  markFavorite?: (is_favorite: boolean) => void;
  is_favorite: boolean;
  landloardId?: string | null;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  id,
  image_path,
  name,
  price,
  markFavorite,
  is_favorite,
  landloardId,
}) => {
  const router = useRouter();
  const property_detail_url = `/properties/${id}`;
  const edit_property_url = `/myproperty/${id}`;

  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push(property_detail_url)}
    >
      <div className="relative overflow-hidden aspect-square rounded-xl mb-2">
        <Image
          fill
          src={image_path}
          sizes="(max-width: 768px) 768px (max-width: 1200px): 768px, 768px "
          className="hover:scale-110 object-cover transition h-full w-full"
          alt="Properties"
        />

        {markFavorite && (
          <FavoriteButton
            id={id}
            is_favorite={is_favorite}
            markFavorite={(is_favorite) => markFavorite(is_favorite)}
          />
        )}
      </div>

      {landloardId ? (
        <CustomButton
          label="Edit property"
          onClick={(event: any) => {
            event.stopPropagation();
            router.push(edit_property_url);
          }}
        />
      ) : (
        <div className="mt-2 flex flex-col">
          <span className="text-sm font-bold">{name}</span>
          <span className="text-xs text-gray-500">
            <strong>${price}</strong> per night
          </span>
        </div>
      )}
    </div>
  );
};

export default PropertyListItem;
