import Image from "next/image";

// Custom components
import ContactButton from "../../components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";

const LandlordDetailPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="col-span-1 my-4">
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-md">
            <Image
              src="/profiles/profile1.png"
              alt="profile"
              width={200}
              height={200}
              className="rounded-full"
            />
            <h1 className="text-2xl mt-6">John Doe</h1>
            <ContactButton />
          </div>
        </aside>
        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
          <PropertyList />
        </div>
      </div>
    </main>
  );
};

export default LandlordDetailPage;
