import React, { useEffect, useState } from "react";

const HeaderOrderListComponent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const waktu = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => {
      clearInterval(waktu);
    };
  }, []);

  return (
    <div className="order-list-title">
      <p>Order List</p>
      <span>
        {time.toLocaleDateString("id-ID", { weekday: "long" })},{" "}
        {time.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        |{" "}
        {time.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default HeaderOrderListComponent;
