import Image from "next/image";
import Link from "next/link";

// Custom components
import ContactButton from "../../components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import BackArrow from "@/app/components/BackArrow";

const LandlordDetailPage = async ({ params }: { params: { id: string } }) => {
  const landlord = await apiService.get(`/api/auth/${params.id}/`);
  const userId = await getUserId();

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="flex items-center gap-14">
        <BackArrow />
        <h1 className="my-6 text-2xl">Details</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="col-span-1 my-4">
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-md">
            <Image
              src={
                landlord.avatar_url
                  ? landlord.avatar_url
                  : "/profiles/profile1.png"
              }
              alt="profile"
              width={200}
              height={200}
              className="rounded-full"
            />
            <h1 className="lg:text-2xl md:text-lg my-4">{landlord.name}</h1>
            <h1 className="lg:text-2xl md:text-lg mb-4">{landlord.email}</h1>
            {userId != params.id ? (
              <ContactButton userId={userId} landlordId={params.id} />
            ) : (
              <>
                <Link
                  href={`/landlord/`}
                  className={`text-white bg-airbnb hover:bg-airbnb-dark end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 mb-4`}
                >
                  Edit profile
                </Link>

                <Link
                  href={`/password/`}
                  className={`text-white bg-black hover:bg-gray-800 end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2`}
                >
                  Change password
                </Link>
              </>
            )}
          </div>
        </aside>
        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
          <PropertyList
            landlord_id={params.id}
            is_details={userId === params.id}
          />
        </div>
      </div>
    </main>
  );
};

export default LandlordDetailPage;
