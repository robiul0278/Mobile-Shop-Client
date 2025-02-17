import { useEffect, useState } from "react";
import useFlashSale from "../../hooks/useFlashSale";

const Countdown = () => {
    const [flashData] = useFlashSale();
    const endTime = flashData?.endTime;
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    
      useEffect(() => {
        const timer = setInterval(() => {
          const now = new Date();
          const end = new Date(endTime);
          const timeDiff = end - now;
    
          if (timeDiff <= 0) {
            clearInterval(timer);
            setTimeLeft({
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
          } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
            setTimeLeft({
              days,
              hours,
              minutes,
              seconds,
            });
          }
        }, 1000);
    
        return () => clearInterval(timer); // Clean up on unmount
      }, [endTime]);
    
  return (
    <div className="grid grid-flow-col gap-2 text-center auto-cols-max font-bold">
      <div className="flex border shadow shadow-slate-200 flex-col p-3 rounded-box text-slate-700">
        <span className="countdown font-mono text-2xl">
          <span style={{ "--value": timeLeft.days }}></span>
        </span>
        days
      </div>
      <div className="flex border shadow shadow-slate-200 flex-col p-3 rounded-box text-slate-700">
        <span className="countdown font-mono text-2xl">
          <span style={{ "--value": timeLeft.hours }}></span>
        </span>
        hours
      </div>
      <div className="flex border shadow shadow-slate-200 flex-col p-3 rounded-box text-slate-700">
        <span className="countdown font-mono text-2xl">
          <span style={{ "--value": timeLeft.minutes }}></span>
        </span>
        min
      </div>
      <div className="flex border shadow shadow-slate-200 flex-col p-3 rounded-box text-slate-700">
        <span className="countdown font-mono text-2xl">
          <span style={{ "--value": timeLeft.seconds }}></span>
        </span>
        sec
      </div>
    </div>
  )
}

export default Countdown;