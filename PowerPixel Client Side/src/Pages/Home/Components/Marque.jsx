import React from "react";
import Marquee from "react-fast-marquee";

const Marque = () => {
  return (
    <div className=" py-2 my-7 text-[#a500ff] rounded-full bg-white">
      <Marquee pauseOnHover={true}>
        For any quires, don't hesitate to contact us at 01356497812. Visit our
        showroom we're open 10 AM to 8 PM every day! Get discount on special
        day.
      </Marquee>
    </div>
  );
};

export default Marque;
