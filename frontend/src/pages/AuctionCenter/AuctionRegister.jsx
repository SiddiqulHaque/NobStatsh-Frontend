import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const iStates = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
];

const AuctionRegister = () => {
  const pathname = useParams();
  const auctionID = pathname.id;
  console.log(auctionID);
  const UserId = "666b337924d299b927a28569";
  // const UserId = "66689dfd19cfc584797c8d61";
  // const UserId = "66680762546eb82b9c918f6a";
  // const [auctionID, setAuctionID] = useState("XXXXXXXX");
  const [indianStates, setIndianstates] = useState(iStates);
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [randomBidderID, setRandomBidderID] = useState(false);
  const [sameAsUserName, setSameAsUserName] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [auctiondetails, setauctionDetails] = useState(null);
  const [userName, setUserName] = useState("");
  const [buttonDisplay, setButtonDisplay] = useState(false);
  const navigate = useNavigate();
  const getauctionDetails = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/auctions/${auctionID}`)
        .then((res) => {
          setauctionDetails(res.data);
          setIndianstates(res.data.Location);
          if (!res.data.Users.includes(UserId)) {
            setButtonDisplay(true);
          }
        });
    } catch (error) {
      console.log(error);
      alert("error in getting auction detail");
    }
  };
  const getUserDetails = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/auth/${UserId}`)
        .then((res) => {
          setUserName(res.data.userName);
        });
    } catch (error) {
      console.log(error);
      alert("Error in getting user details");
    }
  };
  const formSubmit = async () => {
    try {
      const data = {
        uid: UserId,
        bidamount: auctiondetails.reserved_price,
        username: userName,
        state: state,
        pincode: pincode,
        address: address,
        mobilenumber: mobileNumber,
        email: email,
        bidderid: "random",
      };
      axios
        .post(`http://localhost:8000/api/bids/register/${auctionID}`, { data })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
      alert("error in registering bid");
    }
  };
  useEffect(() => {
    getauctionDetails();
    getUserDetails();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit();
    navigate("/center");
    // Handle form submission logic here
  };
  return (
    <div className="p-4 sm:px-8 md:px-16">
      {/* Heading */}
      <div className="border-b-2 border-black p-2">
        <div className="text-xl">
          Register to <span className="font-bold">{auctiondetails?.Title}</span>{" "}
          by <span className="font-bold">{userName}</span>
        </div>
      </div>

      <form className="mt-4" onSubmit={handleSubmit}>
        {/* Auction ID */}
        <div className="flex flex-col md:flex-row md:ml-8 items-center mb-2">
          <label className="block w-full md:w-2/12 font-semibold">
            Auction ID
          </label>
          <input
            type="text"
            placeholder={auctionID}
            disabled
            className="w-full md:w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Delivery Address */}
        <div className="text-lg font-bold mt-4">Delivery Address *</div>

        {/* State */}
        <div className="flex flex-col md:flex-row mb-2 mt-2 md:ml-8 items-center">
          <label className="block w-full md:w-2/12 font-semibold">State</label>
          <div className="w-full md:w-6/12 mt-2">
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              className="w-full p-1 px-2 border border-gray-300 rounded-md"
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pincode */}
        <div className="flex flex-col md:flex-row mb-2 md:ml-8 items-center">
          <label className="block font-semibold w-full md:w-2/12">
            Pincode
          </label>
          <input
            type="number"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Pincode"
            className="w-full md:w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col md:flex-row mb-2 md:ml-8 items-center">
          <label className="block font-semibold w-full md:w-2/12">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full md:w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col md:flex-row mb-2 md:ml-8 items-center">
          <label className="block font-semibold w-full md:w-2/12">
            Mobile Number
          </label>
          <input
            type="number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
            className="w-full md:w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col md:flex-row mb-2 md:ml-8 items-center">
          <label className="block font-semibold w-full md:w-2/12">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full md:w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Bidder ID */}
        <div className="text-lg font-bold mt-4">Bidder ID</div>
        <div className="flex flex-col md:flex-row mb-4 md:ml-8 items-center">
          <div className="w-full md:w-6/12 mt-2">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2 custom-checkbox"
                checked={randomBidderID}
                onChange={(e) => setRandomBidderID(e.target.checked)}
              />
              <span className="font-semibold">Random Bidder ID</span>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                className="mr-2 custom-checkbox"
                checked={sameAsUserName}
                onChange={(e) => setSameAsUserName(e.target.checked)}
              />
              <span className="font-semibold">
                same as @UserName [{auctiondetails?.NobFees} nob coins]
              </span>
            </div>
          </div>
        </div>

        {/* Agreement */}
        <div className="flex flex-col md:flex-row mb-4 mt-3 md:ml-8 items-center">
          <div className="mt-2 w-full md:w-6/12">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 custom-checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <span className="font-semibold">
                I agree{" "}
                <a href="#" className="font-bold border-b-2 border-black">
                  Terms of Service & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="font-bold border-b-2 border-black">
                  Privacy Policies
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Message from Seller */}
        <div className="flex flex-col md:flex-row mb-4 md:ml-8 items-center">
          <label className="block font-semibold w-full md:w-2/12">
            Message from Seller
          </label>
          <input
            type="text"
            placeholder="display message given by seller/host (*not an input field)"
            disabled
            value={auctiondetails?.MessagetoBidders}
            className="w-full md:w-6/12 mt-2 p-1 px-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Register Button */}
        <div className="flex flex-col md:flex-row items-center mb-4 md:ml-8">
          {buttonDisplay ? (
            <button
              type="submit"
              className="w-full md:w-2/12 h-14 mt-2 p-2 bg-black text-white rounded-md font-bold cursor-pointer"
            >
              Register
            </button>
          ) : (
            <div className="w-full md:w-2/12 h-14 mt-2 p-2 bg-black text-white rounded-md font-bold cursor-pointer flex justify-center items-center">
              Bid
            </div>
          )}

          <div className="w-full md:w-6/12 md:ml-12 mt-4 md:mt-0 font-semibold">
            <span>
              *delivery address should be in serviceable locations for seller
            </span>
            <br />
            <span>*only KYC completed users can BID</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuctionRegister;
