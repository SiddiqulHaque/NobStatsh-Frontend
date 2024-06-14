import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const AuctionCard = ({ a }) => {
  const userId = "666b337924d299b927a28569";
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(true);
  const startd = new Date(a.StartDate).toDateString();
  const endd = new Date(a.EndDate).toDateString();
  const sh = new Date(a.StartTime).getUTCHours();
  const sm = new Date(a.StartTime).getUTCMinutes();
  const eh = new Date(a.EndTime).getUTCHours();
  const em = new Date(a.EndTime).getUTCMinutes();
  const registerButton = () => {
    if (!a.Users.includes(userId)) {
      setIsRegistered(false);
    }
  };
  useEffect(() => {
    registerButton();
  }, []);
  return (
    <div className="mt-4 mb-4 flex flex-row gap-4 border-2 w-10/12 lg:w-8/12 mx-auto p-4 rounded shadow-lg h-96">
      {/* Left */}
      <div className="w-5/12">
        <img
          src={a.imageURL}
          alt="Painting"
          className="w-full h-full object-fill rounded shadow-md"
        />
      </div>
      {/* Right */}
      <div className="w-7/12 flex flex-col justify-between p-2">
        <div>
          <p>
            <span className="font-bold">{a.Title} </span>by{" "}
            <span className="font-semibold">Famous Artist</span>
          </p>
          <p className="text-sm text-gray-600">{a.Description}</p>
          <p className="mt-2">
            Start Time - {sh}:{sm}
            {"    "}
            {startd}
          </p>
          <p className="">
            End Time - {eh}:{em}
            {"    "}
            {endd}
          </p>
          <p className="mt-2 font-bold">Reserve Price</p>
          <p className="">Rs {a.reserved_price}/</p>
          {a.current_price && (
            <>
              <p className="mt-2 font-bold">Highest Bid</p>
              <p className="">Rs {a.current_price}/-</p>
            </>
          )}
        </div>
        {/* buttons */}
        <div className="mt-4 flex gap-4">
          {isRegistered ? (
            <button
              className="w-1/2 px-4 py-2 rounded-lg bg-black text-white"
              onClick={() => {
                navigate(`/home-bidding/${a._id}`);
              }}
            >
              Bid
            </button>
          ) : (
            <button
              className="w-1/2 px-4 py-2 rounded-lg bg-black text-white"
              onClick={() => {
                navigate(`/auction-register/${a._id}`);
              }}
            >
              Register to Bid
            </button>
          )}
          <button className="w-1/2 px-4 py-2 rounded-lg bg-white text-black border-black border-2">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
