import Reservations from "../reservations/Reservations";
import apiService from "../services/apiService";
import { getUserId } from "../lib/actions";

export default async function ReservationPage() {
  const reservations = await apiService.get("/api/auth/myreservations/");
  const userId = await getUserId();

  return <Reservations reservations={reservations} userId={userId} />;
}
