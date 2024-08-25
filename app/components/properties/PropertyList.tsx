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

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const getProperties = async () => {
    const url = "/api/properties/";
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
