"use client";

import { useState, useEffect } from "react";

// Custom components
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";

export type PropertyType = {
  property: any;
  id: string;
  is_favorite: boolean;
};

interface PropertyListProps {
  landlord_id?: string | null;
  is_favorite?: boolean;
  is_details?: boolean;
  favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
  landlord_id,
  is_favorite,
  favorites,
  is_details,
}) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (property.id == id) {
        property.is_favorite = is_favorite;

        if (is_favorite) {
          console.log("Added to favorite property");
        } else {
          console.log("Removed to favorite property");
        }
      }
      return property;
    });

    setProperties(tmpProperties);
  };

  const getProperties = async () => {
    let url = "/api/properties/";

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    } else if (favorites) {
      url += "?is_favorites=true";
    }

    const tmpProperties = await apiService.get(url);
    setProperties(
      tmpProperties.data.map((property: PropertyType) => {
        if (tmpProperties.favorites.includes(property.id)) {
          property.is_favorite = true;
        } else {
          property.is_favorite = false;
        }

        return property;
      })
    );
  };
  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {properties.map((property) => {
        return (
          <PropertyListItem
            key={property.id}
            property={property}
            is_favorite={property.is_favorite}
            markFavorite={(is_favorite: any) =>
              markFavorite(property.id, is_favorite)
            }
            is_details={is_details}
          />
        );
      })}
    </div>
  );
};

export default PropertyList;
