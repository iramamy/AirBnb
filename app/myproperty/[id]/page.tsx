"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// Custom component
import EditPropertyForm from "@/app/components/forms/EditPropertyForm";
import apiService from "@/app/services/apiService";
import Spinner from "@/app/components/Spinner";

type EditProfileFormValues = {
  id: string;
  country: string;
  category: string;
  title: string;
  description: string;
  price_per_night: string;
  bedrooms: string;
  guests: string;
  image_url: string;
};

const EditProperty = () => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("id") || "";
  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] =
    useState<EditProfileFormValues | null>(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      const url = `/api/properties/${propertyId}`;
      try {
        const data = await apiService.get(url);
        setPropertyData(data);
      } catch (error) {
        console.log("ERROR FETCHING DATA!", error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyData();
    }
  }, [propertyId]);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        propertyData && <EditPropertyForm property={propertyData} />
      )}
    </>
  );
};

export default EditProperty;
