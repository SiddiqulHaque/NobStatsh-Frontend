import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoHome, IoShieldCheckmarkOutline, IoShieldCheckmark, IoWalletOutline, IoWallet, IoLogOutOutline, IoLogOut } from "react-icons/io5";
import profileImage from '../assets/profile.png';
import { FcFaq } from "react-icons/fc";
import { MdOutlinePhoneInTalk, MdPhoneInTalk } from "react-icons/md";
import { RiAuctionFill, RiAuctionLine } from "react-icons/ri";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate();

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
    if (window.innerWidth < 640) {
      toggleSidebar(); // Close sidebar on item click for small screens
    }
  };

  return (
    <div
      className={`fixed sm:static z-10 bg-white p-6  shadow-lg border-r border-gray-200 flex flex-col  transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 sm:w-20 lg:w-60 h-full sm:h-screen`}
    >
      <div className="space-y-8">
        <div
          className={`flex items-center cursor-pointer ${
            activeItem === 'home' ? 'font-bold' : 'hover:font-bold'
          }`}
          onClick={() => handleItemClick('home', '/')}
        >
          {activeItem === 'home' ? <IoHome className="text-2xl" /> : <IoHomeOutline className="text-2xl" />}
          <span className="ml-3 hidden lg:inline">Home</span>
        </div>
        <div
          className={`flex items-center cursor-pointer ${
            activeItem === 'profile' ? 'font-bold' : 'hover:font-bold'
          }`}
          onClick={() => handleItemClick('profile', '/profile')}
        >
          <img src={profileImage} className="h-7 w-7" alt="profile" />
          <span className="ml-3 hidden lg:inline">Profile</span>
        </div>
        <div
          className={`flex items-center cursor-pointer ${
            activeItem === 'kyc' ? 'font-bold' : 'hover:font-bold'
          }`}
          onClick={() => handleItemClick('kyc', '/kyc')}
        >
          {activeItem === 'kyc' ? <IoShieldCheckmark className="text-2xl" /> : <IoShieldCheckmarkOutline className="text-2xl" />}
          <span className="ml-3 hidden lg:inline">KYC</span>
        </div>
        <div
          className={`flex items-center cursor-pointer ${
            activeItem === 'trading' ? 'font-bold' : 'hover:font-bold'
          }`}
          onClick={() => handleItemClick('trading', '/trading')}
        >
          {activeItem === 'trading' ? <IoWallet className="text-2xl" /> : <IoWalletOutline className="text-2xl" />}
          <span className="ml-3 hidden lg:inline">Trading Account</span>
        </div>
        <div
          className={`flex items-center cursor-pointer ${
            activeItem === 'center' ? 'font-bold' : 'hover:font-bold'
          }`}
          onClick={() => handleItemClick('center', '/center')}
        >
          {activeItem === 'center' ? <RiAuctionFill className="text-2xl" /> : <RiAuctionLine className="text-2xl" />}
          <span className="ml-3 hidden lg:inline">Auction Center</span>
        </div>
        <div
          className={`flex items-center cursor-pointer ${
            activeItem === 'faq' ? 'font-bold' : 'hover:font-bold'
          }`}
          onClick={() => handleItemClick('faq', '/faq')}
        >
          <FcFaq className="text-2xl" />
          <span className="ml-3 hidden lg:inline">FAQ</span>
        </div>
        <div
          className={`flex items-center cursor-pointer ${
            activeItem === 'support' ? 'font-bold' : 'hover:font-bold'
          }`}
          onClick={() => handleItemClick('support', '/support')}
        >
          {activeItem === 'support' ? <MdPhoneInTalk className="text-2xl" /> : <MdOutlinePhoneInTalk className="text-2xl" />}
          <span className="ml-3 hidden lg:inline">Support</span>
        </div>
      </div>

      <div className="mt-52">
        <div
          className={`flex items-center cursor-pointer ${
            activeItem === 'logout' ? 'font-bold' : 'hover:font-bold'
          }`}
          onClick={() => handleItemClick('logout', '/logout')}
        >
          {activeItem === 'logout' ? <IoLogOut className="text-2xl" /> : <IoLogOutOutline className="text-2xl" />}
          <span className="ml-3 hidden lg:inline">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
