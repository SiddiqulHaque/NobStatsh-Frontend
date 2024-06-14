import React, { useState } from "react";
import HostAuction from "../../components/AuctionCenter/HostAuction";
import AuctionHistory from "../../components/AuctionCenter/AuctionHistory";
import BiddingHistory from "../../components/AuctionCenter/BiddingHistory";
import Settlements from "../../components/AuctionCenter/Settlements";

const AuctionCenter = () => {
  const [activeComponent, setActiveComponent] = useState("HostAuction");
  const HostId = "666b337924d299b927a28569";
  const renderComponent = () => {
    switch (activeComponent) {
      case "HostAuction":
        return <HostAuction />;
      case "AuctionHistory":
        return <AuctionHistory />;
      case "BiddingHistory":
        return <BiddingHistory />;
      case "Settlements":
        return <Settlements />;
      default:
        return <HostAuction />;
    }
  };

  return (
    <div className="mx-10">
      <div className="max-w-4xl">
        <div className="font-bold text-xl mt-6 border-black border-b-2 max-w-6/12 p-2">
          Auction Center
        </div>
        <div className="flex flex-wrap justify-start gap-4 mt-5 border-black pb-3 border-b-2">
          <button
            onClick={() => setActiveComponent("HostAuction")}
            className={`p-3 sm:p-4 md:p-5 lg:p-5 border-black border-2 rounded-lg font-bold ${
              activeComponent === "HostAuction"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            } w-full sm:w-auto`}
          >
            Host Auction
          </button>
          <button
            onClick={() => setActiveComponent("AuctionHistory")}
            className={`p-3 sm:p-4 md:p-5 lg:p-5  border-black border-2 rounded-lg font-bold ${
              activeComponent === "AuctionHistory"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            } w-full sm:w-auto`}
          >
            Auction History
          </button>
          <button
            onClick={() => setActiveComponent("BiddingHistory")}
            className={`p-3 sm:p-4 md:p-5 lg:p-5 border-black border-2 rounded-lg font-bold ${
              activeComponent === "BiddingHistory"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            } w-full sm:w-auto`}
          >
            Bidding History
          </button>
          <button
            onClick={() => setActiveComponent("Settlements")}
            className={`p-3 sm:p-4 md:p-5 lg:p-5 border-black border-2 rounded-lg font-bold ${
              activeComponent === "Settlements"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            } w-full sm:w-auto`}
          >
            Settlements
          </button>
        </div>
      </div>
      <div className="max-w-4xl mt-5 mb-6">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AuctionCenter;
