import Reservations from "../reservations/Reservations";
import apiService from "../services/apiService";

export default async function ReservationPage() {
  const reservations = await apiService.get("/api/auth/myreservations/");

  return <Reservations reservations={reservations} />;
}
