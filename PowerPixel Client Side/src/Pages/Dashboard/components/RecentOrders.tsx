import React from "react";

const orders = [
  {
    id: "O-1001",
    customer: "Alice K.",
    product: "UltraMonitor X1",
    amount: 599.99,
    date: "2026-06-23",
    status: "pending",
  },
  {
    id: "O-1002",
    customer: "Bob M.",
    product: "Pro RAM 32GB",
    amount: 129.0,
    date: "2026-06-22",
    status: "processing",
  },
  {
    id: "O-1003",
    customer: "Cindy L.",
    product: "Gaming Motherboard Z",
    amount: 249.0,
    date: "2026-06-20",
    status: "delivered",
  },
  {
    id: "O-1004",
    customer: "Dan R.",
    product: "Turbo CPU 7",
    amount: 240.0,
    date: "2026-06-19",
    status: "delivered",
  },
];

const RecentOrders: React.FC = () => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-700">Recent Orders</h4>
        <div className="text-sm text-slate-500">Showing latest 10</div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="pb-2">Order</th>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Product</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Status</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="py-3">{o.id}</td>
                <td className="py-3 font-medium">{o.customer}</td>
                <td className="py-3 text-slate-600">{o.product}</td>
                <td className="py-3 font-semibold">${o.amount.toFixed(2)}</td>
                <td className="py-3 text-slate-500">{o.date}</td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${o.status === "delivered" ? "bg-emerald-100 text-emerald-700" : o.status === "processing" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="rounded-md bg-white/5 px-3 py-1 text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-500">1-10 of 124 orders</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-md bg-white/5">Prev</button>
          <button className="px-3 py-1 rounded-md bg-white/5">Next</button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
