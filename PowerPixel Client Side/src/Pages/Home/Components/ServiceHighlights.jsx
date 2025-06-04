import { FaRocket, FaUndo, FaCreditCard, FaWeixin } from "react-icons/fa";

const data = [
  {
    icon: <FaRocket className="text-white" size={20} />,
    title: "Free Delivery",
    subtitle: "For order over 10,000Tk",
  },
  {
    icon: <FaUndo className="text-white" size={20} />,
    title: "7 Days Return",
    subtitle: "If goods have problems",
  },
  {
    icon: <FaCreditCard className="text-white" size={20} />,
    title: "Secure Payment",
    subtitle: "100% secure payment",
  },
  {
    icon: <FaWeixin className="text-white" size={20} />,
    title: "10am-11pm Support",
    subtitle: "Dedicated support",
  },
];

const ServiceHighlights = () => {
  return (
    <div className=" w-full flex flex-wrap gap-4 justify-between items-center mt-8">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white shadow-sm p-4 rounded-md min-w-[250px]"
        >
          <div className="bg-red-600 rounded-full p-3">{item.icon}</div>
          <div>
            <h4 className="text-lg font-medium">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceHighlights;
