import Marquee from "react-fast-marquee";

const Marque = () => {
  return (
    <div className="max-w-8xl mx-auto py-2 px-4 my-7 text-[#a500ff] rounded-2xl sm:rounded-full bg-white">
      <Marquee pauseOnHover={true}>
        For any quires, don't hesitate to contact us at 01356497812. Visit our
        showroom we're open 10 AM to 8 PM every day! Get discount on special
        day.
      </Marquee>
    </div>
  );
};

export default Marque;
