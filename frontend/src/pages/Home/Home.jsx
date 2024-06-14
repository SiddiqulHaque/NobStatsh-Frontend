import React, { useEffect, useState } from "react";
import Painting from "../../assets/painting.jpg";
import Tree from "../../assets/tree.jpg";
import { useNavigate } from "react-router";
import axios from "axios";
import AuctionCard from "../../components/HomePage/AuctionCard";

const Home = () => {
  const [auctions, setauctions] = useState([]);
 
  
  const getauctions = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/auctions/getauctions")
        .then((res) => {
          console.log(res.data);
          setauctions(res.data);
        });
    } catch (error) {
      console.log(error);
      alert("Error in getting auctions");
    }
  };
  useEffect(() => {
    getauctions();
  }, []);
  return (
    <div className="flex flex-col h-full">
      {auctions.length > 0 ? (
        <>
          {auctions.map((a) => (
            <AuctionCard a={a} />
          ))}
        </>
      ) : (
        <>NO auctions present</>
      )}
      =
    </div>
  );
};

export default Home;
