import React from "react";
import { useNavigate } from "react-router-dom";

const HostAuction = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/host");
  };

  return (
    <div className="max-w-2xl pt-2">
      <span className="font-bold text-lg p-2 border-black border-b-2">
        Select a Category
      </span>
      <div className="flex flex-wrap justify-start gap-4 mt-10">
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Antiques
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Designer Jewelry
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Fashion Accessories
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Licenses
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Assets
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Vehicles
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Fashion Apparel
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Event Tickets
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Appointments
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Awards
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Art
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Gadgets
        </button>
        <button
          onClick={handleNavigation}
          className="p-6 font-bold border-black border-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
        >
          Others
        </button>
      </div>
    </div>
  );
};

export default HostAuction;
