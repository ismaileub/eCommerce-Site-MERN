import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useCart from "../../Hooks/useCart";

type Product = {
  _id: string;
  title: string;
  price: number;
  brand: string;
  stock: number;
  images?: string;
  description?: string;
  specs?: Record<string, unknown> & { type?: string };
};

type SimilarProduct = {
  _id: string;
  title: string;
  price: number;
  brand: string;
  stock: number;
  images?: string;
  specs?: { type?: string };
};

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

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [similarError, setSimilarError] = useState<string | null>(null);

  const specEntries = useMemo(() => {
    const specs = product?.specs;
    if (!specs || typeof specs !== "object")
      return [] as Array<[string, string]>;

    return Object.entries(specs)
      .filter(
        ([k, v]) =>
          k !== "type" &&
          v !== null &&
          v !== undefined &&
          String(v).trim() !== "",
      )
      .map(([k, v]) => [k, formatSpecValue(v)] as [string, string]);
  }, [product]);

  const specType = useMemo(() => {
    const typeValue = product?.specs?.type;
    return typeof typeValue === "string" && typeValue.trim() ? typeValue : null;
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      setError(null);
      setProduct(null);
      setSimilarProducts([]);
      setSimilarError(null);

      if (!id) {
        setError("Missing product id");
        return;
      }

      try {
        const res = await axiosPublic.get(`/product/${id}`);
        setProduct(res.data?.data ?? null);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load product");
      }
    };

    fetchProduct();
  }, [id, axiosPublic]);

  useEffect(() => {
    const fetchSimilar = async () => {
      setSimilarError(null);
      setSimilarProducts([]);

      if (!specType) return;
      if (!product?._id) return;

      try {
        const res = await axiosPublic.get("/product/all-products", {
          params: {
            type: specType,
            page: 1,
            limit: 6,
            sort: "createdAt",
            order: "desc",
          },
        });

        const items = (res.data?.data ?? []) as SimilarProduct[];
        const filtered = items.filter((p) => p?._id && p._id !== product._id);
        setSimilarProducts(filtered.slice(0, 4));
      } catch (err: any) {
        setSimilarError(
          err?.response?.data?.message || "Failed to load similar products",
        );
      }
    };

    fetchSimilar();
  }, [axiosPublic, product?._id, specType]);

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 sm:px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link
            to={-1 as any}
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900"
          >
            <span className="text-lg">←</span> Back
          </Link>
        </div>

        {error ? (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 text-rose-700 text-sm font-bold">
            {error}
          </div>
        ) : product ? (
          <div className="bg-white border border-slate-100 rounded-[28px] shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 p-6 md:p-8">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden aspect-[4/3] flex items-center justify-center">
                  {product.images ? (
                    <img
                      src={product.images}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-slate-300 font-black">No image</div>
                  )}
                </div>

                <div className="mt-4 rounded-2xl border border-slate-100 bg-white px-4 py-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Product Info
                  </div>
                  <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <dt className="text-slate-500 font-semibold">Brand</dt>
                      <dd className="text-slate-900 font-bold break-words">
                        {product.brand}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 font-semibold">Stock</dt>
                      <dd className="text-slate-900 font-bold break-words">
                        {product.stock}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-slate-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white">
                      $
                      {product.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        product.stock > 0
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-slate-50 text-slate-500 border-slate-100"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white">
                      {product.brand}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product._id, 1)}
                    disabled={product.stock === 0}
                    className={
                      "shrink-0 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all active:scale-95 " +
                      (product.stock === 0
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-orange-600 text-white hover:bg-orange-700")
                    }
                  >
                    Add to cart
                  </button>
                </div>

                <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {product.title}
                </h1>

                {specEntries.length > 0 ? (
                  <div className="mt-8">
                    <div className="flex items-end justify-between gap-3">
                      <h2 className="text-sm font-black  tracking-widest text-slate-400">
                        Key Features
                      </h2>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {specEntries.map(([k, v]) => (
                        <div
                          key={k}
                          className="rounded-2xl border border-slate-100 bg-white px-4 py-3"
                        >
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            {formatSpecKey(k)}
                          </div>
                          <div className="mt-1 text-sm font-bold text-slate-800 break-words">
                            {v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">
                    No specs available for this product.
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  {product.description ? (
                    <>
                      <h2 className="text-2xl font-extrabold text-slate-900">
                        Description
                      </h2>
                      <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                        {product.title}
                      </h3>
                      <p className="mt-3 text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                        {product.description}
                      </p>
                    </>
                  ) : (
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-slate-500 font-semibold">
                      No description available.
                    </div>
                  )}
                </div>

                <div className="lg:col-span-4">
                  <div className="flex items-end justify-between gap-3">
                    <h2 className="text-sm font-black tracking-widest text-slate-400">
                      Similar Products
                    </h2>
                    {specType ? (
                      <span className="text-xs uppercase font-semibold text-slate-400">
                        {specType}
                      </span>
                    ) : null}
                  </div>

                  {similarError ? (
                    <div className="mt-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-rose-700 text-sm font-bold">
                      {similarError}
                    </div>
                  ) : similarProducts.length > 0 ? (
                    <div className="mt-3 grid grid-cols-1 gap-3">
                      {similarProducts.map((p) => (
                        <Link
                          key={p._id}
                          to={`/product/${p._id}`}
                          className="group rounded-2xl border border-slate-100 bg-white p-3 hover:border-slate-200"
                        >
                          <div className="flex gap-3">
                            <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                              {p.images ? (
                                <img
                                  src={p.images}
                                  alt={p.title}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              ) : null}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-extrabold text-slate-900 truncate group-hover:underline">
                                {p.title}
                              </div>
                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-slate-600">
                                  {p.brand}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-xs font-black text-orange-600">
                                  $
                                  {p.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : specType ? (
                    <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-500 text-sm font-semibold">
                      No similar products found.
                    </div>
                  ) : (
                    <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-500 text-sm font-semibold">
                      No type found for this product.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-[28px] p-10 text-slate-500 font-semibold">
            Loading product details...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
