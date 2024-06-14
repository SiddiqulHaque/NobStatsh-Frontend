import React, { useState } from "react";
import { MdOutlineQuestionMark } from "react-icons/md";

const Details = () => {
  const [isChatEnabled, setIsChatEnabled] = useState(false);
  const [isAdsEnabled, setIsAdsEnabled] = useState(false);
  const [isPocSelf, setIsPocSelf] = useState(true);
  const [isPocOthers, setIsPocOthers] = useState(false);
  const [pocName, setPocName] = useState("");
  const [pocEmail, setPocEmail] = useState("");
  const [pocMobile, setPocMobile] = useState("");
  const [pocAddress, setPocAddress] = useState("");

  const handleChatsToggle = () => {
    setIsChatEnabled(!isChatEnabled);
  };

  const handleAdsToggle = () => {
    setIsAdsEnabled(!isAdsEnabled);
  };

  const handlePocSelfToggle = () => {
    setIsPocSelf(!isPocSelf);
    if (isPocOthers) {
      setIsPocOthers(false);
    }
  };

  const handlePocOthersToggle = () => {
    setIsPocOthers(!isPocOthers);
    if (isPocSelf) {
      setIsPocSelf(false);
    }
  };

  return (
    <div className="min-h-[89vh]">
      {/* Auction room pr */}
      <div className="flex p-2 items-center ml-2">
        <span className="border-black border-b-2 font-bold text-lg px-1-2">
          Auction Room Privileges
        </span>
        <div className="ml-2">
          <MdOutlineQuestionMark
            className="ml-2 text-gray-500 cursor-pointer text-lg"
          />
        </div>
      </div>

      <div className="p-2">
        {/* set number */}
        <div>
          {/* sentence */}
          <div className="ml-4 font-bold">
            Set number of coins that has to be collected for alloting Bidder ID
            to registered Bidders
          </div>

          {/* input */}
          <div className="ml-14 mt-2 flex flex-col">
            <div className="flex flex-row items-center mb-1">
              <p className="w-3/12 font-bold">Random Bidder ID</p>
              <input
                type="text"
                placeholder="0 nob coins(*not editable)"
                className="mt-1 p-1 w-1/2 border border-gray-400 rounded-md bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div className="flex flex-row items-center mt-1">
              <p className="w-3/12 font-bold">same as their @username</p>
              <input
                type="text"
                placeholder="min 1000 nob coins"
                className="mt-1 p-1 w-1/2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* nobchat */}
        <div className="ml-4 mt-2">
          <div className="font-bold">
            <p>Nob Chat [Comment Section in Auction Room]</p>
          </div>

          <div className="flex gap-3 ml-14 flex-col mt-2">
            {/* Checkboxes */}
            <label className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={!isChatEnabled}
                onChange={handleChatsToggle}
                className="mr-2 custom-checkbox"
              />
              Disable
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isChatEnabled}
                onChange={handleChatsToggle}
                className="mr-2 custom-checkbox"
              />
              Enable
            </label>
          </div>
        </div>

        {/* Display ads */}
        <div className="ml-4 mt-4">
          <div className="font-bold">
            <p>Display Ads in Auction Room</p>
          </div>

          <div className="flex gap-3 ml-14 flex-col mt-2">
            {/* Checkboxes */}
            <label className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={!isAdsEnabled}
                onChange={handleAdsToggle}
                className="mr-2 custom-checkbox"
              />
              No
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAdsEnabled}
                onChange={handleAdsToggle}
                className="mr-2 custom-checkbox"
              />
              Yes
            </label>
          </div>
        </div>

        {/* Poc details */}
        <div className="flex flex-col ml-2 mt-2">

          <div className="flex flex-row">
            {/* Poc */}
            <span className="px-2 border-b-2 border-black font-bold">
              Point of Contact [POC]
            </span>

            {/* Checkbox */}
            <div className="flex flex-row gap-4 ml-6 mt-1">
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={isPocSelf}
                  onChange={handlePocSelfToggle}
                  className="mr-2 custom-checkbox"
                />
                self
              </label>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={isPocOthers}
                  onChange={handlePocOthersToggle}
                  className="mr-2 custom-checkbox"
                />
                others
              </label>
            </div>
          </div>

          {/* Poc details */}
          <div className="flex flex-col mt-4 ml-14">
            <div className="flex items-center mb-2">
              <label className="w-1/12 text-gray-700 text-sm font-bold " htmlFor="pocName">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-4/12 py-1 px-2 text-gray-700 leading-tight  focus:shadow-outline ml-4 "
                id="pocName"
                type="text"
                placeholder="name"
                value={pocName}
                onChange={(e) => setPocName(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-2">
              <label className="w-1/12 text-gray-700 text-sm font-bold" htmlFor="pocEmail">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-4/12 py-1 px-2 text-gray-700 leading-tight  focus:shadow-outline ml-4"
                id="pocEmail"
                type="email"
                placeholder="example@email.com"
                value={pocEmail}
                onChange={(e) => setPocEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-2">
              <label className="w-1/12 text-gray-700 text-sm font-bold " htmlFor="pocMobile">
                Mobile
              </label>
              <input
                className="shadow appearance-none border rounded w-4/12 py-1 px-2  leading-tight  focus:shadow-outline ml-4"
                id="pocMobile"
                type="text"
                placeholder="9999999999"
                value={pocMobile}
                onChange={(e) => setPocMobile(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-2">
              <label className="w-1/12 text-gray-700 text-sm font-bold " htmlFor="pocAddress">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-4/12 py-1 px-2 text-gray-700 leading-tight  focus:shadow-outline ml-4"
                id="pocAddress"
                type="text"
                placeholder="Address"
                value={pocAddress}
                onChange={(e) => setPocAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Host Button */}

          <div className="ml-4 mt-2">
            <button className="bg-black text-white font-bold py-2 px-6 rounded mt-2">
              Host
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Details;
