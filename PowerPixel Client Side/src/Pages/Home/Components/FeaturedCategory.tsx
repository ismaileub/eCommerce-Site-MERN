import * as React from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import ProductList from "../../SearchPage/ProductList";

const pcTabs = [
  "New Arrivals",
  "Laptop Deals",
  "Student Deals",
  "Bestsellers",
  "Featured",
];

const FEATURED_TAB_STORAGE_KEY = "pp_featured_category_tab";

type Product = {
  _id: string;
  title: string;
  price: number;
  brand: string;
  stock: number;
  images: string;
  description?: string;
  specs: any;
};

const tabQuery: Record<
  (typeof pcTabs)[number],
  { search?: string; type?: string; sort: string; order: "asc" | "desc" }
> = {
  "Laptop Deals": { type: "laptop", sort: "createdAt", order: "desc" },
  "Student Deals": { search: "student", sort: "createdAt", order: "desc" },
  "New Arrivals": { sort: "createdAt", order: "desc" },
  Bestsellers: { sort: "stock", order: "desc" },
  Featured: { sort: "createdAt", order: "desc" },
};

const FeaturedCategory = () => {
  const [value, setValue] = React.useState(() => {
    const fallbackIndex = Math.max(0, pcTabs.indexOf("Laptop Deals"));
    if (typeof window === "undefined") return fallbackIndex;

    const saved = window.sessionStorage.getItem(FEATURED_TAB_STORAGE_KEY);
    if (!saved) return fallbackIndex;

    const idx = pcTabs.indexOf(saved);
    return idx >= 0 ? idx : fallbackIndex;
  });

  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const activeCategory = pcTabs[value];

  React.useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      setError(null);

      try {
        const q = tabQuery[activeCategory];
        const baseParams = {
          ...(q.search ? { search: q.search } : {}),
          ...(q.type ? { type: q.type } : {}),
          sort: q.sort,
          order: q.order,
          page: 1,
          limit: 10,
        };

        const res = await axiosPublic.get("/product/all-products", {
          params: baseParams,
        });

        const firstList = (res.data?.data ?? []) as Product[];

        // If a keyword-based tab returns nothing (common for "Student Deals"),
        // fall back to a general list so the section never looks broken.
        if (firstList.length === 0 && q.search && !q.type) {
          const fallbackRes = await axiosPublic.get("/product/all-products", {
            params: {
              sort: q.sort,
              order: q.order,
              page: 1,
              limit: 10,
            },
          });
          setProducts((fallbackRes.data?.data ?? []) as Product[]);
        } else {
          setProducts(firstList);
        }
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Failed to load featured products",
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [activeCategory, axiosPublic]);

  return (
    <div className="mt-16 w-full max-w-8xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Featured Categories
          </h2>
          <p className="mt-2 text-gray-500 max-w-md">
            Handpicked selections from our most popular categories built for
            performance and reliability.
          </p>
        </div>

        {/* Tab Header */}
        <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          {pcTabs.map((tab, index) => {
            const isActive = value === index;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setValue(index);
                  if (typeof window !== "undefined") {
                    window.sessionStorage.setItem(
                      FEATURED_TAB_STORAGE_KEY,
                      tab,
                    );
                  }
                }}
                className={
                  "px-5 py-2.5 cursor-pointer text-sm font-semibold transition-all duration-200 rounded-lg whitespace-nowrap " +
                  (isActive
                    ? "bg-white text-orange-500 shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-900")
                }
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Content */}
      {error ? (
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 text-rose-700 text-sm font-bold">
          {error}
        </div>
      ) : loading ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-8 text-slate-500 font-semibold">
          Loading products...
        </div>
      ) : products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl p-8 text-slate-500 font-semibold">
          No products found.
        </div>
      )}
    </div>
  );
};

export default FeaturedCategory;
