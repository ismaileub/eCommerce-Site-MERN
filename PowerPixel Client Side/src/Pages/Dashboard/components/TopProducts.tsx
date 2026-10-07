import React from "react";

const products = [
  { id: "p1", name: "UltraMonitor X1", sold: 120, revenue: 120 * 299, img: "" },
  { id: "p2", name: "Pro RAM 32GB", sold: 200, revenue: 200 * 129, img: "" },
  {
    id: "p3",
    name: "Gaming Motherboard Z",
    sold: 95,
    revenue: 95 * 189,
    img: "",
  },
];

const TopProducts: React.FC = () => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-700">Top Selling Products</h4>
        <div className="text-sm text-slate-500">This month</div>
      </div>

      <div className="mt-4 space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
                Img
              </div>
              <div>
                <div className="font-medium text-slate-700">{p.name}</div>
                <div className="text-xs text-slate-400">
                  {p.sold} units sold
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${p.revenue}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
