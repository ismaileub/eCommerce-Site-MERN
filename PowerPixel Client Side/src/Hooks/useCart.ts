import { useContext } from "react";
import { CartContext } from "../Providers/CartProviders";

const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProviders");
  }
  return ctx;
};

export default useCart;
