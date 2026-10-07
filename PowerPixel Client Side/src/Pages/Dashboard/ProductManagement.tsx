import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Sidebar from "./components/Sidebar";

type Product = {
  _id: string;
  title: string;
  price: number;
  brand: string;
  stock: number;
  images: string;
  description?: string;
  specs: Record<string, unknown>;
};

type ProductForm = {
  title: string;
  price: string;
  brand: string;
  stock: string;
  images: string;
  description: string;
  specs: string;
};

const emptyForm: ProductForm = {
  title: "",
  price: "",
  brand: "",
  stock: "0",
  images: "",
  description: "",
  specs: '{\n  "type": "ram"\n}',
};

const getErrorMessage = (error: unknown) => {
  const response = (error as { response?: { data?: { message?: string } } })
    ?.response;
  return response?.data?.message || "Something went wrong. Please try again.";
};

const ProductManagement = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPublic.get("/product/all-products", {
        params: {
          search,
          page: 1,
          limit: 100,
          sort: "createdAt",
          order: "desc",
        },
      });
      setProducts(response.data?.data ?? []);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search]);

  const updateField = (field: keyof ProductForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEditing = (product: Product) => {
    setEditingId(product._id);
    setForm({
      title: product.title,
      price: String(product.price),
      brand: product.brand,
      stock: String(product.stock),
      images: product.images,
      description: product.description || "",
      specs: JSON.stringify(product.specs || {}, null, 2),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    let specs: Record<string, unknown>;
    try {
      specs = JSON.parse(form.specs) as Record<string, unknown>;
    } catch {
      setError("Specs must be valid JSON.");
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      brand: form.brand.trim(),
      stock: Number(form.stock),
      images: form.images.trim(),
      description: form.description.trim(),
      specs,
    };

    try {
      if (editingId) {
        await axiosPublic.patch(`/product/${editingId}`, payload);
        setMessage("Product updated successfully.");
      } else {
        await axiosPublic.post("/product/create-product", payload);
        setMessage("Product created successfully.");
      }
      resetForm();
      await loadProducts();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (product: Product) => {
    if (!window.confirm(`Delete ${product.title}?`)) return;
    setError(null);
    setMessage(null);
    try {
      await axiosPublic.delete(`/product/${product._id}`);
      setMessage("Product deleted successfully.");
      await loadProducts();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="mt-2 text-3xl font-black text-slate-900">
                Product Management
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Manage products stored in your database.
              </p>
            </div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-500 sm:w-72"
            />
          </div>

          {(error || message) && (
            <div
              className={`mt-5 rounded-xl border p-4 text-sm font-semibold ${error ? "border-rose-200 bg-rose-50 text-rose-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
            >
              {error || message}
            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
            <form
              onSubmit={submitForm}
              className="h-fit rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-900">
                  {editingId ? "Edit product" : "Add product"}
                </h2>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-sm font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <div className="mt-4 space-y-3">
                {(["title", "brand", "images"] as const).map((field) => (
                  <input
                    key={field}
                    required
                    value={form[field]}
                    onChange={(event) => updateField(field, event.target.value)}
                    placeholder={field[0].toUpperCase() + field.slice(1)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-500"
                  />
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    min="0"
                    step="0.01"
                    type="number"
                    value={form.price}
                    onChange={(event) =>
                      updateField("price", event.target.value)
                    }
                    placeholder="Price"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-500"
                  />
                  <input
                    required
                    min="0"
                    type="number"
                    value={form.stock}
                    onChange={(event) =>
                      updateField("stock", event.target.value)
                    }
                    placeholder="Stock"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-500"
                  />
                </div>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Description"
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-500"
                />
                <textarea
                  required
                  value={form.specs}
                  onChange={(event) => updateField("specs", event.target.value)}
                  placeholder="Specs JSON"
                  rows={8}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 font-mono text-xs outline-none focus:border-cyan-500"
                />
                <button
                  disabled={saving}
                  className="w-full rounded-xl bg-cyan-700 px-4 py-3 text-sm font-bold text-white hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update product"
                      : "Create product"}
                </button>
              </div>
            </form>

            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-900">
                  Products ({products.length})
                </h2>
                <button
                  type="button"
                  onClick={loadProducts}
                  className="text-sm font-semibold text-cyan-700 hover:text-cyan-900"
                >
                  Refresh
                </button>
              </div>
              {loading ? (
                <p className="py-12 text-center text-sm text-slate-500">
                  Loading products...
                </p>
              ) : products.length === 0 ? (
                <p className="py-12 text-center text-sm text-slate-500">
                  No products found.
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[680px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-3 py-3">Product</th>
                        <th className="px-3 py-3">Brand</th>
                        <th className="px-3 py-3">Price</th>
                        <th className="px-3 py-3">Stock</th>
                        <th className="px-3 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product._id}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-3 py-4 font-semibold text-slate-800">
                            {product.title}
                          </td>
                          <td className="px-3 py-4 text-slate-600">
                            {product.brand}
                          </td>
                          <td className="px-3 py-4 font-semibold text-slate-800">
                            ${product.price.toFixed(2)}
                          </td>
                          <td
                            className={`px-3 py-4 font-semibold ${product.stock === 0 ? "text-rose-600" : product.stock <= 5 ? "text-amber-600" : "text-emerald-600"}`}
                          >
                            {product.stock}
                          </td>
                          <td className="px-3 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => startEditing(product)}
                                className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteProduct(product)}
                                className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductManagement;
