import React from "react";

const BiddersCard = ({ b }) => {
  function timeAgo(createdAt) {
    // Parse the createdAt date from MongoDB
    var createdDate = new Date(createdAt);

    // Get the current date and time
    var currentDate = new Date();

    // Calculate the difference in milliseconds
    var difference = currentDate.getTime() - createdDate.getTime();

    // Convert the difference to seconds, minutes, hours, etc.
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var weeks = Math.floor(days / 7);
    var months = Math.floor(days / 30);
    var years = Math.floor(days / 365);

    // Determine the appropriate time unit and value
    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
    }
  }
  const t = timeAgo(b.createdAt);
  return (
    <div className="flex flex-row justify-between mt-1">
      <div className="flex flex-col">
        <div className="font-bold">{b.userName}</div>
        <div className="text-xs text-gray-500">{t}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold">1</div>
        <div className="text-xs text-gray-500">Quantity</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold">Rs. {b.bidAmount}/-</div>
        <div className="text-xs text-gray-500">bidnumber6</div>
      </div>
    </div>
  );
};

export default BiddersCard;
