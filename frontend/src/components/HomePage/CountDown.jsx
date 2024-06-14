import React, { useEffect, useState } from "react";

const CountDown = ({ time }) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime(time));

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTime(getRemainingTime(time));
    }, 1000);

    return () => clearInterval(timerId);
  }, [time]);
  function getRemainingTime(targetDateStr) {
    // Parse the target date in UTC
    var targetDate = new Date(targetDateStr);

    // Get the current date and time in UTC
    var currentDate = new Date();

    // Calculate the difference in milliseconds
    var difference = targetDate.getTime() - currentDate.getTime();

    if (difference <= 0) {
      return "00 Hrs:00 Min:00 Sec"; // If the target date is in the past or now
    }

    // Calculate hours, minutes, and seconds
    var hours = Math.floor(difference / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = hours - 6;
    minutes = minutes + 30;

    // Format the remaining time
    var remainingTime = `${hours.toString().padStart(2, "0")} Hrs:${minutes
      .toString()
      .padStart(2, "0")} Min:${seconds.toString().padStart(2, "0")} Sec`;

    return remainingTime;
  }
  return <span className="font-bold text-red-600">{remainingTime}</span>;
};

export default CountDown;
