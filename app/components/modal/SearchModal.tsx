"use client";

import { useState } from "react";
import { Range } from "react-date-range";

// Custom components
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import CustomButton from "../forms/CustomButton";
import DatePicker from "../forms/Calendar";
import { SearchQuery } from "@/app/hooks/useSearchModal";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  let content = <></>;
  const searchModal = useSearchModal();
  const [country, setCountry] = useState<SelectCountryValue>();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [numGuests, setNumGuests] = useState<string>("1");
  const [numBedrooms, setNumBedrooms] = useState<string>("0");

  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      country: country?.label || "",
      checkIn: dateRange.startDate ?? null,
      checkOut: dateRange.endDate ?? null,
      guests: parseInt(numGuests),
      bedrooms: parseInt(numBedrooms),
      category: "",
    };

    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };

  const _setDateRange = (selection: Range) => {
    if (searchModal.step === "checkin") {
      searchModal.open("checkout");
    } else if (searchModal.step === "checkout") {
      searchModal.open("details");
    }

    setDateRange(selection);
  };
  const contentLocation = (
    <>
      <div>
        <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
        <div className="mb-10">
          <SelectCountry
            value={country}
            onChange={(value) => setCountry(value as SelectCountryValue)}
          />
        </div>
        <div className="flex flex-row">
          <CustomButton
            label="Check in date"
            isAbsolute={true}
            onClick={() => searchModal.open("checkin")}
          />
        </div>
      </div>
    </>
  );

  const contentCheckIn = (
    <>
      <div>
        <h2 className="mb-6 text-2xl">When do you want to check in?</h2>

        <DatePicker
          value={dateRange}
          onChange={(value) => _setDateRange(value.selection)}
        />
        <div className="flex align-items-center justify-between w-100">
          <CustomButton
            label="Location"
            onClick={() => searchModal.open("location")}
            isPrev={true}
          />

          <CustomButton
            label="Check out date"
            onClick={() => searchModal.open("checkout")}
          />
        </div>
      </div>
    </>
  );

  const contentCheckOut = (
    <>
      <div>
        <h2 className="mb-6 text-2xl">When do you want to check out?</h2>

        <DatePicker
          value={dateRange}
          onChange={(value) => _setDateRange(value.selection)}
        />
        <div className="flex align-items-center justify-between w-100">
          <CustomButton
            label="Check in date"
            onClick={() => searchModal.open("checkin")}
            isPrev={true}
          />

          <CustomButton
            label="Details"
            onClick={() => searchModal.open("details")}
          />
        </div>
      </div>
    </>
  );

  const contentDetails = (
    <>
      <div>
        <h2 className="mb-6 text-2xl">Details</h2>

        <div className="space-y-4">
          <div className="space-y-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Number of guests
            </label>
            <input
              type="number"
              name="guests"
              min="1"
              value={numGuests}
              onChange={(e) => setNumGuests(e.target.value)}
              className={`bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none border-gray-300`}
              placeholder="Type here ..."
            />
          </div>

          <div className="space-y-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Number of bedrooms
            </label>
            <input
              type="number"
              name="guests"
              min="1"
              value={numBedrooms}
              onChange={(e) => setNumBedrooms(e.target.value)}
              className={`bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none border-gray-300`}
              placeholder="Type here ..."
            />
          </div>
        </div>

        <div className="flex align-items-center justify-between w-100 mt-4">
          <CustomButton
            label="Check out date"
            onClick={() => searchModal.open("checkout")}
            isPrev={true}
          />

          <CustomButton label="Search" onClick={closeAndSearch} />
        </div>
      </div>
    </>
  );

  if (searchModal.step == "location") {
    content = contentLocation;
  } else if (searchModal.step == "checkin") {
    content = contentCheckIn;
  } else if (searchModal.step == "checkout") {
    content = contentCheckOut;
  } else if (searchModal.step == "details") {
    content = contentDetails;
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      close={searchModal.close}
      title="Search"
      content={content}
    />
  );
};

export default SearchModal;
