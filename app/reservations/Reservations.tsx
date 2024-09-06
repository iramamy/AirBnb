"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// Custom components
import BackArrow from "../components/BackArrow";
import useLoginModal from "../hooks/useLoginModal";
import useDeleteReservationModal from "../hooks/useDeleteReservationModal";

interface ReservationsProps {
  reservations: any[];
  userId?: string | null;
}

const Reservations: React.FC<ReservationsProps> = ({
  reservations,
  userId,
}) => {
  const deleteReservationModal = useDeleteReservationModal();
  const router = useRouter();
  const loginModal = useLoginModal();

  if (!userId || !Array.isArray(reservations)) {
    router.push("/");
    loginModal.open();

    return null;
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="flex items-center gap-14">
        <BackArrow />
        <h1 className="my-6 text-2xl">My reservations</h1>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-xl">
          You do not have any reservations
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation: any) => {
            return (
              <div
                key={`${reservation.property.id}-${reservation.id}`}
                className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
              >
                <div className="col-span-1">
                  <div className="relative overflow-hidden aspect-square rounded-xl">
                    <Image
                      onClick={() =>
                        router.push(`/properties/${reservation.property.id}`)
                      }
                      src={
                        reservation.property.image_url
                          ? reservation.property.image_url
                          : "/properties/4aegim.jpeg"
                      }
                      alt="properties reservation"
                      className="hover:scale-110 object-cover transition h-full w-full cursor-pointer"
                      fill
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3">
                  <h2 className="mb-4 text-xl">{reservation.property.title}</h2>
                  <p className="mb-2">
                    <strong>Check In date:</strong> {reservation.start_date}
                  </p>
                  <p className="mb-2">
                    <strong>Check Out date:</strong> {reservation.end_date}
                  </p>
                  <p className="mb-2">
                    <strong>Number of nights:</strong>{" "}
                    {reservation.number_of_nights}
                  </p>
                  <p className="mb-2">
                    <strong>Total price:</strong> ${reservation.total_price}
                  </p>
                  <div className="flex flex-col">
                    <div
                      onClick={() =>
                        router.push(`/properties/${reservation.property.id}`)
                      }
                      className=" mt-6 inline-block cursor-pointer py-2 px-6 bg-airbnb rounded-xl text-white hover:bg-airbnb-dark w-[30%] text-center"
                    >
                      Go to property
                    </div>
                    <div
                      onClick={() =>
                        deleteReservationModal.open(reservation.id)
                      }
                      className=" mt-6 inline-block cursor-pointer py-2 px-6 bg-black rounded-xl text-white hover:bg-gray-800 w-[30%] text-center"
                    >
                      Delete reservation
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Reservations;
