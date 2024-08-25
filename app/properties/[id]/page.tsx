import Image from "next/image";

// Custom component
import ReservationSideBar from "@/app/components/properties/ReservationSideBar";
import apiService from "@/app/services/apiService";

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await apiService.get(`/api/properties/${params.id}`);
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className=" w-full h-[64vh] overflow-hidden rounded-xl relative">
        <Image
          fill
          src={property.image_url}
          sizes="(max-width: 768px) 768px (max-width: 1200px): 768px, 768px "
          className="object-cover h-full w-full"
          alt="Property detail"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="text-4xl mb-4">{property.title}</h1>
          <span className="mb-6 block text-lg text-gray-600">
            Guests: {property.guests} - bedrooms {property.bedrooms}
          </span>

          <hr />

          <div className="py-6 flex items-center space-x-4">
            {property.landlord.avatar_url ? (
              <Image
                src={property.landlord.avatar_url}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full cursor-pointer"
              />
            ) : (
              <Image
                src="/profiles/profile1.png"
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full cursor-pointer"
              />
            )}
            <p>
              <strong>{property.landlord.name}</strong> is your host
            </p>
          </div>

          <hr />
          <p className="text-lg mt-6"> {property.description} </p>
        </div>
        <ReservationSideBar property={property} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
