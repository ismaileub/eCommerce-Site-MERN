import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";

export type CartItemProduct = {
  _id: string;
  title: string;
  price: number;
  brand: string;
  stock: number;
  images?: string;
};

export type CartItem = {
  _id: string;
  product: CartItemProduct | string;
  quantity: number;
};

type CartResponse = {
  items: CartItem[];
  totalQuantity: number;
};

export type CartContextType = {
  items: CartItem[];
  cartCount: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
};

export const CartContext = createContext<CartContextType | null>(null);

const CartProviders = ({ children }: { children: ReactNode }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const openAuthModal = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  const applyCartResponse = useCallback((data: CartResponse | undefined) => {
    const nextItems = data?.items ?? [];
    setItems(nextItems);
    setCartCount(data?.totalQuantity ?? 0);
  }, []);

  const refreshCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      setCartCount(0);
      return;
    }

    try {
      const res = await axiosPublic.get("/cart");
      applyCartResponse(res.data?.data as CartResponse);
    } catch (err: any) {
      // If token expired or user not authorized, just reset.
      setItems([]);
      setCartCount(0);
    }
  }, [applyCartResponse, axiosPublic, user]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(
    async (productId: string, quantity = 1) => {
      if (!user) {
        toast.error("Please sign in to add to cart");
        openAuthModal();
        return;
      }

      try {
        await axiosPublic.post("/cart/items", { productId, quantity });
        toast.success("Added to cart");
        await refreshCart();
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.errorSources?.[0]?.message ||
          "Failed to add to cart";
        toast.error(message);
      }
    },
    [axiosPublic, refreshCart, user],
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      if (!user) {
        toast.error("Please sign in");
        openAuthModal();
        return;
      }

      try {
        await axiosPublic.delete(`/cart/items/${itemId}`);
        toast.success("Removed from cart");
        await refreshCart();
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to remove item");
      }
    },
    [axiosPublic, refreshCart, user],
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (!user) {
        toast.error("Please sign in");
        openAuthModal();
        return;
      }

      try {
        await axiosPublic.patch(`/cart/items/${itemId}`, { quantity });
        await refreshCart();
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message || "Failed to update quantity",
        );
      }
    },
    [axiosPublic, refreshCart, user],
  );

  const value = useMemo<CartContextType>(
    () => ({
      items,
      cartCount,
      refreshCart,
      addToCart,
      removeFromCart,
      updateQuantity,
    }),
    [addToCart, cartCount, items, refreshCart, removeFromCart, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProviders;
