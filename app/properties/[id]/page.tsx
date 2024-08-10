import Image from "next/image";

// Custom component
import ReservationSideBar from "@/app/components/properties/ReservationSideBar";

const PropertyDetailPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className=" w-full h-[64vh] overflow-hidden rounded-xl relative">
        <Image
          fill
          src="/beach_1.jpg"
          sizes="(max-width: 768px) 768px (max-width: 1200px): 768px, 768px "
          className="object-cover h-full w-full"
          alt="Property detail"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="text-4xl mb-4">Property name</h1>
          <span className="mb-6 block text-lg text-gray-600">
            Guests: 4 - 2 bedrooms - 1 bathroom
          </span>

          <hr />

          <div className="py-6 flex items-center space-x-4">
            <Image
              src="/profiles/profile1.png"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
            />
            <p>
              <strong>John Doe</strong> is your host
            </p>
          </div>

          <hr />
          <p className="text-lg mt-6">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum amet
            esse ducimus iure. Corporis itaque possimus ab quia quo incidunt
            enim ullam, distinctio consequatur assumenda labore, iure, quam hic
            fugit consectetur nemo. Dolorum obcaecati facilis magnam sapiente
            modi dignissimos illo?
          </p>
        </div>
        <ReservationSideBar />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
