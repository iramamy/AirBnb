"use client";

import { useState, useEffect } from "react";

// Custom components
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";

export type PropertyType = {
  id: string;
  image_url: string;
  title: string;
  price_per_night: string;
};

interface PropertyListProps {
  landlord_id?: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ landlord_id }) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const getProperties = async () => {
    let url = "/api/properties/";

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    }

    const tmpProperties = await apiService.get(url);
    setProperties(tmpProperties.data);
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
            id={property.id}
            image_path={property.image_url}
            name={property.title}
            price={property.price_per_night}
          />
        );
      })}
    </div>
  );
};

export default PropertyList;
