// Custom components
import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";
import BackArrow from "../components/BackArrow";

const MyFavoritePage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }
  return (
    <main className="max-w-[1500px] max-auto px-6 pb-12">
      <div className="flex items-center gap-14">
        <BackArrow />
        <h1 className="my-6 text-2xl">My Favorites</h1>
      </div>
      <PropertyList favorites={true} />
    </main>
  );
};

export default MyFavoritePage;
