import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const StoreLocation = () => {
  return (
    <div className="bg-gradient-to-tl from-red-500 via-orange-500 to-yellow-500 rounded-md text-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 px-4 sm:px-6 py-6 sm:py-8 mt-6">
      <div className="flex items-center gap-4">
        <FaMapMarkerAlt className="text-3xl" />
        <div>
          <h2 className="text-2xl font-bold">20+ Physical Stores</h2>
          <p className="text-sm">
            Visit Our Store & Get Your Desired IT Product!
          </p>
        </div>
      </div>

      <button className="bg-white text-blue-700 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-medium shadow-md transition-all duration-200 cursor-pointer w-full sm:w-auto">
        Find Our Store <FaSearch />
      </button>
    </div>
  );
};

export default StoreLocation;
