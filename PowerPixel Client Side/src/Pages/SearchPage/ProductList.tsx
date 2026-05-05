import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";

interface Product {
  _id: string;
  title: string;
  price: number;
  brand: string;
  stock: number;
  images: string;
  description?: string;
  specs: any;
}

interface ProductListProps {
  products: Product[];
}

const formatSpecKey = (key: string) => {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
};

const formatSpecValue = (value: unknown) => {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const getSecondarySpecs = (specs: any): Array<[string, string]> => {
  if (!specs || typeof specs !== "object") return [];

  const entries = Object.entries(specs)
    .filter(
      ([key, value]) =>
        key !== "type" &&
        value !== null &&
        value !== undefined &&
        String(value).trim() !== "",
    )
    .slice(0, 3)
    .map(([key, value]) => [key, formatSpecValue(value)] as [string, string]);

  return entries;
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-in fade-in duration-500">
        {products.map((product) => {
          const secondarySpecs = getSecondarySpecs(product.specs);
          const subtitle = secondarySpecs[0]?.[1] || product.specs?.type || "";
          const badgeLabel =
            product.specs?.badge ||
            (product.stock === 0
              ? "Unavailable"
              : product.stock <= 5
                ? "Limited"
                : undefined);

          return (
            <div
              key={product._id}
              className="group relative bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Badge */}
              {badgeLabel && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 uppercase tracking-wider border border-orange-100">
                    {badgeLabel}
                  </span>
                </div>
              )}

              {/* Image Placeholder / Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-gray-100 mb-4">
                {product.images ? (
                  <img
                    src={product.images}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-gray-200 transform transition-transform duration-500 group-hover:scale-110">
                    <svg
                      className="w-14 h-14"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  {subtitle && (
                    <p className="mt-0.5 text-xs text-gray-500 line-clamp-1 leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-medium">
                      Price
                    </span>
                    <span className="text-lg font-extrabold text-orange-600">
                      $
                      {product.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <Link
                    to={`/product/${product._id}`}
                    className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300"
                    aria-label={`View ${product.title}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7-7 7M21 12H3"
                      />
                    </svg>
                  </Link>

                  <button
                    type="button"
                    onClick={() => addToCart(product._id, 1)}
                    disabled={product.stock === 0}
                    className={
                      "p-2 rounded-lg transition-all duration-300 " +
                      (product.stock === 0
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-orange-600 text-white hover:bg-orange-700")
                    }
                    aria-label={`Add ${product.title} to cart`}
                    title={product.stock === 0 ? "Out of stock" : "Add to cart"}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <Link
                to={`/product/${product._id}`}
                className="mt-4 block w-full py-2.5 px-4 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-300 shadow-sm active:scale-95 text-center"
              >
                View Product
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
