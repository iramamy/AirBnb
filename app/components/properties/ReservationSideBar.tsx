"use client";

import { useState, useEffect } from "react";
import { Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";

// Custom components
import DatePicker from "../forms/Calendar";
import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Property = {
  id: string;
  guests: number;
  price_per_night: number;
};

interface ReservationSideBarProps {
  userId: string | null;
  property: Property;
}

const ReservationSideBar: React.FC<ReservationSideBarProps> = ({
  property,
  userId,
}) => {
  const loginModal = useLoginModal();
  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<string>("1");
  const guestsRange = Array.from(
    { length: property.guests },
    (_, index) => index + 1
  );

  // Booking data
  const performBooking = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formdata = new FormData();
        formdata.append("guests", guests);
        formdata.append(
          "start_date",
          format(dateRange.startDate, "yyyy-MM-dd")
        );
        formdata.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
        formdata.append("number_of_nights", nights.toString());
        formdata.append("total_price", totalPrice.toString());

        const response = await apiService.post(
          `/api/properties/${property.id}/book/`,
          formdata
        );

        if (response.success) {
          console.log("FOrm submitted successfully");
        } else {
          console.log("something went wrong...");
        }
      }
    } else {
      loginModal.open();
    }
  };
  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate());
    }

    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const getReservation = async () => {
    const reservations = await apiService.get(
      `/api/properties/${property.id}/reservations/`
    );

    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date),
      });

      dates = [...dates, ...range];
    });

    setBookedDates(dates);
  };

  // Booking details
  useEffect(() => {
    getReservation();
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount =
        differenceInDays(dateRange.endDate, dateRange.startDate) + 1;

      if (dayCount && property.price_per_night) {
        const _fee = ((dayCount * property.price_per_night) / 100) * 5;

        setFee(_fee);
        setTotalPrice(dayCount * property.price_per_night + _fee);
        setNights(dayCount);
      } else {
        const _fee = (property.price_per_night / 100) * 5;

        setFee(_fee);
        setTotalPrice(property.price_per_night + _fee);
        setNights(1);
      }
    }
  }, [dateRange]);

  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="text-2xl mb-5">${property.price_per_night} per night</h2>

      <DatePicker
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="block font-bold text-xs mb-2">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="text-sm rounded-lg w-full p-2 bg-white border"
        >
          {guestsRange.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={performBooking}
        className="w-full mb-6 py-6 text-center text-white bg-airbnb rounded-xl hover:bg-airbnb-dark"
      >
        Book
      </button>

      <div className="mb-4 flex justify-between align-center">
        <span>
          ${property.price_per_night} x {nights} nights{" "}
        </span>
        <span>${property.price_per_night * nights} </span>
      </div>
      <div className="mb-4 flex justify-between align-center">
        <span>Fee </span>
        <span>${fee} </span>
      </div>
      <hr />
      <div className="my-4 flex justify-between align-center">
        <span>Total: </span>
        <span>${totalPrice} </span>
      </div>
    </aside>
  );
};

export default ReservationSideBar;
