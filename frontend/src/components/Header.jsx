import React from 'react';
import { IoMenuOutline } from "react-icons/io5";
import profileImage from '../assets/profile.png';

const Header = ({ toggleSidebar }) => {
  return (
    <div className="w-full p-4 bg-gray-200 rounded-b-sm flex justify-between items-center">
      <div className="font-bold text-xl">Nobstash</div>
      <div className="flex items-center">
        <div className="cursor-pointer block sm:hidden" onClick={toggleSidebar}>
          <IoMenuOutline className="text-2xl" />
        </div>
        <div className="cursor-pointer hidden sm:block">
          <img src={profileImage} alt="Profile" className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
};

export default Header;
