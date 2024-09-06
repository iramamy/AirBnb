"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Custom components
import FavoriteButton from "../FavoriteButton";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";

interface PropertyListItemProps {
  property: any;
  markFavorite?: (is_favorite: boolean) => void;
  is_favorite: boolean;
  is_details?: boolean;
  userId?: string | null;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  property,
  markFavorite,
  is_favorite,
  is_details,
  userId,
}) => {
  const router = useRouter();
  const property_detail_url = `/properties/${property.id}`;

  console.log(userId);

  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push(property_detail_url)}
    >
      <div className="relative overflow-hidden aspect-square rounded-xl mb-2">
        <Image
          fill
          src={property.image_url}
          sizes="(max-width: 768px) 768px (max-width: 1200px): 768px, 768px "
          className="hover:scale-110 object-cover transition h-full w-full"
          alt="Properties"
        />

        {markFavorite && (
          <FavoriteButton
            id={property.id}
            is_favorite={is_favorite}
            markFavorite={(is_favorite) => markFavorite(is_favorite)}
          />
        )}
      </div>

      {is_details ? (
        <CustomButton
          label="Edit property"
          onClick={(event: any) => {
            event.stopPropagation();
            router.push(`/myproperty/${property.id}?id=${property.id}`);
          }}
        />
      ) : (
        <div className="mt-2 flex flex-col">
          <span className="text-sm font-bold">{property.title}</span>
          <span className="text-xs text-gray-500">
            <strong>${property.price_per_night}</strong> per night
          </span>
        </div>
      )}
    </div>
  );
};

export default PropertyListItem;
