import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";

const Cart = () => {
  const { items, cartCount, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8fafc] px-4 sm:px-6 md:px-12 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h1 className="text-2xl font-extrabold text-slate-900">Cart</h1>
            <p className="mt-2 text-slate-600 font-semibold">
              Please sign in to view your cart.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-bold"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 sm:px-6 md:px-12 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Cart
            </h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {cartCount} item(s)
            </p>
          </div>
          <Link
            to="/"
            className="text-sm font-bold text-slate-700 hover:text-slate-900"
          >
            Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-6 bg-white border border-slate-100 rounded-2xl p-6 text-slate-600 font-semibold">
            Your cart is empty.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((item) => {
              const product =
                typeof item.product === "string" ? null : item.product;

              return (
                <div
                  key={item._id}
                  className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center"
                >
                  <div className="w-full sm:w-28 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center">
                    {product?.images ? (
                      <img
                        src={product.images}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-slate-300 font-black text-sm">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-slate-900 truncate">
                      {product?.title || "Product"}
                    </div>
                    <div className="mt-1 text-sm font-bold text-orange-600">
                      ${product?.price?.toFixed(2) ?? "0.00"}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="w-9 h-9 cursor-pointer rounded-lg bg-slate-100 text-slate-900 font-black"
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <div className="min-w-8 text-center font-extrabold text-slate-900">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      className="w-9 h-9 cursor-pointer rounded-lg bg-slate-100 text-slate-900 font-black"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="sm:pl-4">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item._id)}
                      className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-100 text-sm font-bold hover:bg-rose-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
