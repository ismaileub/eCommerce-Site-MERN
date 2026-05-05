import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../AuthForm/AuthForm";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import useCart from "../../../Hooks/useCart";

const NavBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const openAuthModal = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const { user, logOut } = useAuth();
  const { cartCount } = useCart();

  const userLabel = user?.email;

  const handleLogOut = () => {
    logOut().catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-gray-300 shadow-md py-4 px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-7 sm:space-y-0">
          {/* Top row: Logo and Sign In */}
          <div className="flex justify-between items-center">
            <Link to="/">
              <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
                PowerPixel
              </h2>

              <p className="text-xs font-bold text-nowrap text-[#790de5]">
                Your accessories are here{" "}
              </p>
            </Link>
            <div className="flex items-center space-x-4 sm:hidden">
              {/* Cart for small screens */}
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-600" />
                {user && cartCount > 0 ? (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                ) : null}
              </Link>
              {/* Sign In / Logout */}
              {user ? (
                <>
                  <button
                    onClick={handleLogOut}
                    type="button"
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-nowrap cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={openAuthModal}
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-nowrap cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <form
              className="w-auto xl:min-w-lg mx-auto"
              onSubmit={handleSearchSubmit}
            >
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full outline-none p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white cursor-pointer absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Cart and Sign In for larger screens */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-600" />
              {user && cartCount > 0 ? (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            {user ? (
              <>
                {userLabel ? (
                  <span className="text-sm  font-semibold text-gray-700 max-w-[180px] truncate">
                    {userLabel}
                  </span>
                ) : null}
                <button
                  onClick={handleLogOut}
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-nowrap cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={openAuthModal}
                type="button"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-nowrap cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="h-[170px] sm:h-[92px]" />

      <div className="hidden lg:block ">
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box  w-full p-0 overflow-visible xl:max-w-[800px] lg:max-w-[600px] xl:max-h-[480px]">
            <AuthForm />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      {/* k;llllllllllll */}
      <div></div>
    </div>
  );
};

export default NavBar;
