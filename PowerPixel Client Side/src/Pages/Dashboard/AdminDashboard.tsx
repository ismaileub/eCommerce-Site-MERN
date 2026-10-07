import React from "react";
import Sidebar from "./components/Sidebar";
import HeroKPI from "./components/HeroKPI";
import SalesChart from "./components/SalesChart";
import RecentOrders from "./components/RecentOrders";
import TopProducts from "./components/TopProducts";
import LowStock from "./components/LowStock";
import RecentReviews from "./components/RecentReviews";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { DashboardProfile } from "./Dashboard";

type AdminDashboardProps = {
  profile: DashboardProfile | null;
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ profile }) => {
  const orderStatusData = [
    { name: "Pending", value: 12, color: "#f59e0b" },
    { name: "Processing", value: 24, color: "#06b6d4" },
    { name: "Shipped", value: 42, color: "#3b82f6" },
    { name: "Delivered", value: 89, color: "#10b981" },
    { name: "Cancelled", value: 3, color: "#f43f5e" },
  ];

  return (
    <div className="flex h-full min-h-[80vh]">
      <Sidebar />

      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Top hero */}
          <div className="rounded-xl bg-slate-900 text-white p-6 shadow-soft">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">
                    PowerPixel Admin Dashboard
                  </h1>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600/20 px-3 py-1 text-sm font-semibold text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />{" "}
                    Live
                  </span>
                </div>
                <p className="mt-2 text-slate-300">
                  Monitor store performance, orders, products, and customer
                  activity.
                </p>

                <HeroKPI />
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-md bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
                  Export Report
                </button>
                <button className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400">
                  Add Product
                </button>
              </div>
            </div>
          </div>

          {/* Analytics row */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-5 rounded-xl bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-slate-700">
                Sales Analytics
              </h3>
              <div className="mt-4">
                <SalesChart />
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-slate-700">
                Order Status Summary
              </h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-44 w-44 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={52}
                        outerRadius={72}
                        paddingAngle={2}
                      >
                        {orderStatusData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  {orderStatusData.map((status) => (
                    <div
                      key={status.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: status.color }}
                        />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-slate-700">
                            {status.name} Orders
                          </div>
                          <div className="text-xs text-slate-400">
                            Status volume
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-800">
                          {status.value}
                        </div>
                        <div className="text-xs text-slate-400">orders</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key metrics grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            <div className="lg:col-span-1 rounded-xl bg-white p-4 shadow-soft">
              Total Products
              <br />
              <div className="mt-2 text-2xl font-bold">328</div>
            </div>
            <div className="lg:col-span-1 rounded-xl bg-white p-4 shadow-soft">
              In Stock
              <br />
              <div className="mt-2 text-2xl font-bold">292</div>
            </div>
            <div className="lg:col-span-1 rounded-xl bg-white p-4 shadow-soft">
              Out of Stock
              <br />
              <div className="mt-2 text-2xl font-bold">36</div>
            </div>
            <div className="lg:col-span-1 rounded-xl bg-white p-4 shadow-soft">
              Total Categories
              <br />
              <div className="mt-2 text-2xl font-bold">14</div>
            </div>
            <div className="lg:col-span-1 rounded-xl bg-white p-4 shadow-soft">
              Total Orders
              <br />
              <div className="mt-2 text-2xl font-bold">156</div>
            </div>
            <div className="lg:col-span-1 rounded-xl bg-white p-4 shadow-soft">
              Revenue This Month
              <br />
              <div className="mt-2 text-2xl font-bold">$45,200</div>
            </div>
          </div>

          {/* Operational insights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl bg-white p-4 shadow-soft">
              Inventory Health
              <br />
              <div className="mt-2 text-sm text-slate-500">
                Stock levels and replenishment status
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-soft">
              Sales Performance
              <br />
              <div className="mt-2 text-sm text-slate-500">
                Conversion and revenue trends
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-soft">
              Customer Growth
              <br />
              <div className="mt-2 text-sm text-slate-500">
                New vs returning customers
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-soft">
              Order Fulfillment
              <br />
              <div className="mt-2 text-sm text-slate-500">
                Shipping performance and delays
              </div>
            </div>
          </div>

          {/* Recent Orders + Top Products */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentOrders />
            <TopProducts />
          </div>

          {/* Low stock + Reviews + Quick actions */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <LowStock />
            </div>
            <div className="lg:col-span-1">
              <RecentReviews />
            </div>
            <div className="lg:col-span-1 rounded-xl bg-white p-4 shadow-soft">
              <h4 className="font-semibold text-slate-700">Quick Actions</h4>
              <div className="mt-4 flex flex-col gap-3">
                <button className="rounded-md bg-cyan-500 px-3 py-2 text-white">
                  Add Product
                </button>
                <button className="rounded-md bg-white/5 px-3 py-2">
                  Manage Orders
                </button>
                <button className="rounded-md bg-white/5 px-3 py-2">
                  View Customers
                </button>
                <button className="rounded-md bg-white/5 px-3 py-2">
                  Moderate Reviews
                </button>
                <button className="rounded-md bg-white/5 px-3 py-2">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
