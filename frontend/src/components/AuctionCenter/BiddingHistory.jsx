import React, { useEffect, useState } from "react";
import painting from "../../assets/painting.jpg";
import axios from "axios";

const BiddingHistory = () => {
  const HostId = "666b337924d299b927a28569";
  // const HostId = "6666e418289acc87b64fcf82";
  const [isModalOpen, setModalOpen] = useState(false);
  const [Bids, setBids] = useState([]);

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const getBiddingHistory = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/bids/user/${HostId}`)
        .then((res) => {
          setBids(res.data);
        });
    } catch (error) {
      console.log(error);
      alert("something wrong in getting bidding history");
    }
  };
  useEffect(() => {
    getBiddingHistory();
  }, []);

  return (
    <div className="">
      {Bids.length != 0 ? (
        <>
          {Bids.map((b) => (
            <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-md w-full max-w-2xl font-sans m-4 p-4 bg-white">
              <img
                src={b.auctionID.imageURL}
                alt="Oil Painting"
                className="w-full md:w-60 h-60 md:h-auto object-cover border-2 rounded-lg cursor-pointer"
                onClick={handleImageClick}
              />
              <div className="flex flex-col justify-between mt-4 md:mt-0 md:ml-4 flex-1">
                <div className="">
                  <h2 className="text-lg font-semibold">
                    <span className="font-bold">{b.auctionID.Title}</span> by Famous
                    Artist
                  </h2>
                  <p className="text-gray-600">{b.auctionID.description}</p>
                  <div className="mt-5">
                    <p className="font-bold">Bidder ID: {b.userID}</p>
                  </div>
                  <div className="mt-5">
                    <p className="font-bold">Auction ID: {b.auctionID._id}</p>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-white border-2 border-black font-bold rounded-lg cursor-not-allowed">
                  Bidding Unsuccessful
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>NO Bids placed by you</>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-4/5 md:w-3/5 h-4/5 md:h-3/5">
            <button
              className="absolute top-0 right-11 text-white text-4xl font-bold"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={painting}
              alt="Oil Painting"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingHistory;
