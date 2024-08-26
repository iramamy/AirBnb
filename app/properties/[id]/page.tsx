import Image from "next/image";
import Link from "next/link";

// Custom component
import ReservationSideBar from "@/app/components/properties/ReservationSideBar";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await apiService.get(`/api/properties/${params.id}`);
  const userId = await getUserId();
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
            {property.guests}: Guests: - {property.bedrooms}: bedrooms
          </span>

          <hr />

          <Link
            href={`/landlord/${property.landlord.id}`}
            className="py-6 flex items-center space-x-4"
          >
            <Image
              src={
                property.landlord.avatar_url
                  ? property.landlord.avatar_url
                  : "/profiles/profile1.png"
              }
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
            />
            <p>
              <strong>{property.landlord.name}</strong> is your host
            </p>
          </Link>

          <hr />
          <p className="text-lg mt-6"> {property.description} </p>
        </div>
        <ReservationSideBar property={property} userId={userId} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;

// Next 32: 11 part 6
