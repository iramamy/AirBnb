import React from "react";

// Custom components
import PropertyList from "../components/properties/PropertyList";

const MyProperty = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My property</h1>
      <PropertyList />
    </main>
  );
};

export default MyProperty;
