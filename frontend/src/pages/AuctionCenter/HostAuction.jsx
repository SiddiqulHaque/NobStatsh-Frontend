import React, { useEffect, useState } from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import { app } from "../../firbaseConfig";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const HostAuction = () => {
  const HostId = "666b337924d299b927a28569";
  const indianStates = [
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

  const [tooltip, setTooltip] = useState(null);
  const [title, setTitle] = useState("");
  const [HostName, setHostName] = useState("");
  const [description, setDescription] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [serviceableLocations, setServiceableLocations] = useState([]);
  const [messageToBidders, setMessageToBidders] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState(null);
  const [imgperc, setImgperc] = useState(0);
  const [videos, setVideos] = useState(null);
  const [vidperc, setvidperc] = useState(0);
  const [provenanceDocuments, setProvenanceDocuments] = useState(null);
  const [provenperc, setprovenperc] = useState(0);
  const [consignorAgreement, setConsignorAgreement] = useState(null);
  const [consignperc, setconsignperc] = useState(0);
  const [termsConditions, setTermsConditions] = useState(null);
  const [termperc, settermperc] = useState(0);
  const [conditionReport, setConditionReport] = useState(null);
  const [condperc, setcondperc] = useState(0);
  const [NobFees, setNobfees] = useState("");
  const [isChatEnabled, setIsChatEnabled] = useState(false);
  const [isAdsEnabled, setIsAdsEnabled] = useState(false);
  const [isPocSelf, setIsPocSelf] = useState(true);
  const [isPocOthers, setIsPocOthers] = useState(false);
  const [pocName, setPocName] = useState("");
  const [pocEmail, setPocEmail] = useState("");
  const [pocMobile, setPocMobile] = useState("");
  const [pocAddress, setPocAddress] = useState("");
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const handleQuestionClick = (text) => {
    setTooltip(text);
  };

  const closeTooltip = () => {
    setTooltip(null);
  };

  const handleFileChange = (event, setter) => {
    setter(event.target.files[0]);
  };

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
  const uploadFile = (file, urlType, setPrecFunc) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPrecFunc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };
  const getHostName = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/auth/${HostId}`)
        .then((res) => {
          // console.log(res.data.userName);
          setHostName(res.data.userName);
        });
    } catch (error) {
      console.log(error);
      alert("Something wrong in hostname");
    }
  };
  useEffect(() => {
    getHostName();
  }, []);
  const handleformSubmit = async () => {
    try {
      let NobChat = "Disable";
      let Ads = "No";
      let Poc_type = "self";
      if (isChatEnabled) {
        NobChat = "Enable";
      }
      if (isAdsEnabled) {
        Ads = "Yes";
      }
      if (isPocOthers) {
        Poc_type = "others";
      }
      const data = {
        Title: title,
        HostName: HostName,
        HostId: HostId,
        description: description,
        reserved_price: reservePrice,
        Quantity: quantity,
        StartDate: startDate,
        StartTime: startTime,
        EndDate: endDate,
        EndTime: endTime,
        Location: serviceableLocations,
        MessagetoBidders: messageToBidders,
        Category: category,
        NobFees: NobFees,
        NobChat: NobChat,
        Ads: Ads,
        Poc_type: Poc_type,
        Poc_name: pocName,
        Poc_email: pocEmail,
        Poc_mobile: pocMobile,
        Poc_address: pocAddress,
        ...inputs,
      };
      await axios
        .post("http://localhost:8000/api/auctions/hostAuction", data)
        .then((res) => {
          // console.log(res.data);
          navigate("/center");
        });
    } catch (error) {
      console.log(error);
      alert("something went wrong ! Please try again");
    }
  };
  useEffect(() => {
    images && uploadFile(images, "imageUrl", setImgperc);
  }, [images]);
  useEffect(() => {
    videos && uploadFile(videos, "videoURL", setvidperc);
  }, [videos]);
  useEffect(() => {
    provenanceDocuments &&
      uploadFile(provenanceDocuments, "provenance", setprovenperc);
  }, [provenanceDocuments]);
  useEffect(() => {
    consignorAgreement &&
      uploadFile(consignorAgreement, "consigner", setconsignperc);
  }, [consignorAgreement]);
  useEffect(() => {
    termsConditions && uploadFile(termsConditions, "tandc", settermperc);
  }, [termsConditions]);
  useEffect(() => {
    conditionReport && uploadFile(conditionReport, "condition", setcondperc);
  }, [conditionReport]);
  return (
    <div>
      {/* first view */}
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-xl p-3 font-bold border-b-2 border-black">
          Host Auction
        </h1>

        <div className="flex flex-col md:flex-row bg-white border-black border-b-2">
          {/* Basic Details Section */}
          <div className="w-full md:w-2/3 px-4 py-2 border-r border-gray-200">
            <span className="text-lg font-semibold px-2 border-b-2 border-black">
              Basic Details
            </span>

            <div className="flex flex-col min-w-full gap-1 mt-2 p-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Title</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="Title"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("Enter the title of the auction.")
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Host Name
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="@username(*not editable)"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("This field is not editable.")
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Auction ID
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="xxxxxx(*not editable)"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "This is the unique ID of the auction and is not editable."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Description
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="description"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Provide a description for the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Reserve Price
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="number"
                    placeholder="1000"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={reservePrice}
                    onChange={(e) => setReservePrice(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter the reserve price for the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Quantity</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="number"
                    placeholder="n"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter the quantity of items in the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Serviceable Location
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <Select
                    isMulti
                    options={indianStates}
                    value={serviceableLocations}
                    onChange={(selectedOptions) =>
                      setServiceableLocations(selectedOptions)
                    }
                    className="mt-1 w-full"
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Select the locations where the auction items can be serviced."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Start Date
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter the start date for the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Start Time
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="time"
                    placeholder="17:30"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter the start time for the auction."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">End Date</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("Enter the end date for the auction.")
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">End Time</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="time"
                    placeholder="23:15"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("Enter the end time for the auction.")
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">
                  Message to Bidders
                </label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="message"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={messageToBidders}
                    onChange={(e) => setMessageToBidders(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(
                        "Enter any message you want to send to the bidders."
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="block font-semibold sm:w-1/4">Category</label>
                <div className="flex items-center w-full sm:w-3/4">
                  <input
                    type="text"
                    placeholder="vehicle"
                    className="mt-1 p-1 w-full border border-gray-400 rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <MdOutlineQuestionMark
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() =>
                      handleQuestionClick("Enter the category of the auction.")
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload Documents Section */}
          <div className="w-full md:w-1/3 p-4">
            <span className="text-xl font-semibold mb-4 border-b-2 px-2 border-black">
              Upload Documents
            </span>
            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="w-full">
                <label
                  htmlFor="images"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Images
                </label>
                <input
                  type="file"
                  id="images"
                  accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp, .svg, .heic"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setImages)}
                />
                {imgperc > 0 && <p>{imgperc}%</p>}
                {images && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {images.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => {
                        setImages(null);
                        setImgperc(0);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="videos"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Videos
                </label>
                <input
                  type="file"
                  id="videos"
                  accept=".mp4, .avi, .mov, .wmv, .flv, .mkv, .webm, .mpeg, .mpg, .3gp, .m4v"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setVideos)}
                />
                {vidperc > 0 && <p>{vidperc}%</p>}
                {videos && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {videos.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => {
                        setVideos(null);
                        setvidperc(0);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="provenanceDocuments"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Provenance Documents
                </label>
                <input
                  type="file"
                  id="provenanceDocuments"
                  accept=".pdf, .doc, .docx, .txt"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setProvenanceDocuments)}
                />
                {provenperc > 0 && <p>{provenperc}%</p>}
                {provenanceDocuments && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {provenanceDocuments.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => {
                        setProvenanceDocuments(null);
                        setprovenperc(0);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="consignorAgreement"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Consignor Agreement
                </label>
                <input
                  type="file"
                  id="consignorAgreement"
                  accept=".pdf, .doc, .docx, .txt"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setConsignorAgreement)}
                />
                {consignperc > 0 && <p>{consignperc}%</p>}
                {consignorAgreement && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {consignorAgreement.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => {
                        setConsignorAgreement(null);
                        setconsignperc(0);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="termsConditions"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Terms & Conditions
                </label>
                <input
                  type="file"
                  id="termsConditions"
                  accept=".pdf, .doc, .docx, .txt"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setTermsConditions)}
                />
                {termperc > 0 && <p>{termperc}%</p>}
                {termsConditions && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {termsConditions.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => {
                        setTermsConditions(null);
                        settermperc(0);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="conditionReport"
                  className="w-full py-4 bg-white border border-black font-bold rounded-md shadow-sm flex justify-center items-center cursor-pointer"
                >
                  Condition Report
                </label>
                <input
                  type="file"
                  id="conditionReport"
                  accept=".pdf, .doc, .docx, .txt"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setConditionReport)}
                />
                {condperc > 0 && <p>{condperc} %</p>}
                {conditionReport && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      {conditionReport.name}
                    </p>
                    <button
                      className="text-red-500 font-semibold ml-2"
                      onClick={() => {
                        setConditionReport(null);
                        setcondperc(0);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {tooltip && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md">
              <div className="flex justify-end">
                <button
                  onClick={closeTooltip}
                  className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-700">{tooltip}</p>
            </div>
          </div>
        )}
      </div>

      {/* second view */}
      <div className="mt-2">
        <div className="min-h-[89vh]">
          {/* Auction room pr */}
          <div className="flex p-2 items-center ml-2">
            <span className="border-black border-b-2 font-bold text-lg px-1-2">
              Auction Room Privileges
            </span>
            <div className="ml-2">
              <MdOutlineQuestionMark className="ml-2 text-gray-500 cursor-pointer text-lg" />
            </div>
          </div>

          <div className="p-2">
            {/* set number */}
            <div>
              {/* sentence */}
              <div className="ml-4 font-bold">
                Set number of coins that has to be collected for alloting Bidder
                ID to registered Bidders
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
                    onChange={(e) => setNobfees(e.target.value)}
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
                  <label
                    className="w-1/12 text-gray-700 text-sm font-bold "
                    htmlFor="pocName"
                  >
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
                  <label
                    className="w-1/12 text-gray-700 text-sm font-bold"
                    htmlFor="pocEmail"
                  >
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
                  <label
                    className="w-1/12 text-gray-700 text-sm font-bold "
                    htmlFor="pocMobile"
                  >
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
                  <label
                    className="w-1/12 text-gray-700 text-sm font-bold "
                    htmlFor="pocAddress"
                  >
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
                <button
                  className="bg-black text-white font-bold py-2 px-6 rounded mt-2"
                  onClick={handleformSubmit}
                >
                  Host
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostAuction;
