import React from "react";

const low = [
  { id: "p2", name: "Gaming Motherboard Z", stock: 3 },
  { id: "p4", name: "Turbo CPU 7", stock: 6 },
  { id: "p3", name: "Pro RAM 32GB", stock: 0 },
];

const LowStock: React.FC = () => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-700">Low Stock Products</h4>
        <div className="text-sm text-slate-500">Needs restock</div>
      </div>

      <div className="mt-4 space-y-3">
        {low.map((p) => (
          <div key={p.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-700">{p.name}</div>
              <div className="text-xs text-slate-400">
                {p.stock <= 0 ? "Out of stock" : "Low stock"}
              </div>
            </div>
            <div
              className={`font-semibold ${p.stock === 0 ? "text-red-600" : "text-yellow-600"}`}
            >
              {p.stock}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStock;
