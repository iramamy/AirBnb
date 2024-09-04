"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

// Custom components
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";
import useSearchModal from "@/app/hooks/useSearchModal";
import Spinner from "../Spinner";

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
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const country = searchModal.query.country;
  const numGuests = searchModal.query.guests;
  const numBedrooms = searchModal.query.bedrooms;
  const checkIn = searchModal.query.checkIn;
  const checkOut = searchModal.query.checkOut;
  const category = searchModal.query.category;

  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);

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
    } else {
      let urlQuery = "";

      if (country) {
        urlQuery += "&country=" + country;
      }

      if (numGuests) {
        urlQuery += "&numGuests=" + numGuests;
      }

      if (numBedrooms) {
        urlQuery += "&numBedrooms=" + numBedrooms;
      }

      if (checkIn) {
        urlQuery += "&checkIn=" + format(checkIn, "yyyy-MM-dd");
      }

      if (checkOut) {
        urlQuery += "&checkOut=" + format(checkOut, "yyyy-MM-dd");
      }

      if (category) {
        urlQuery += "&category=" + category;
      }

      if (urlQuery.length) {
        urlQuery = "?" + urlQuery.substring(1);

        url += urlQuery;
      }
    }

    try {
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
    } catch (error) {
      console.log("ERROR FETCHING DATA!", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProperties();
  }, [category, searchModal.query, params]);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : properties.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-xl">
          No properties found
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyListItem
              key={property.id}
              property={property}
              is_favorite={property.is_favorite}
              markFavorite={(is_favorite: any) =>
                markFavorite(property.id, is_favorite)
              }
              is_details={is_details}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PropertyList;
