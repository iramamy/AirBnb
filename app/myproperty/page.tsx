// Custom components
import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";
import BackArrow from "../components/BackArrow";

const MyProperty = async () => {
  const userId = await getUserId();
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="flex items-center gap-14">
        <BackArrow />
        <h1 className="my-6 text-2xl">My Properties</h1>
      </div>
      <PropertyList landlord_id={userId} is_details={true} />
    </main>
  );
};

export default MyProperty;
