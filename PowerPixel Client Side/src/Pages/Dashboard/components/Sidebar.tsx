import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
  Users,
  Star,
  LogOut,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Home size={18} />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { id: "products", label: "Product Management", icon: <Package size={18} /> },
  { id: "add", label: "Add Product", icon: <PlusCircle size={18} /> },
  { id: "orders", label: "Order Management", icon: <ShoppingCart size={18} /> },
  { id: "customers", label: "Customer List", icon: <Users size={18} /> },
  { id: "reviews", label: "Reviews", icon: <Star size={18} /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (id: string) => {
    if (id === "home") {
      return location.pathname === "/";
    }

    if (id === "products") {
      return location.pathname === "/dashboard/products";
    }

    if (id === "dashboard") {
      return location.pathname === "/dashboard";
    }

    return false;
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-[#0F172A] text-white h-screen sticky top-0 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="rounded-md bg-cyan-500/20 p-2 text-cyan-300">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-cyan-300"
          >
            <path d="M12 2 L20 7 L12 12 L4 7 Z" />
          </svg>
        </div>
        <div>
          <div className="font-bold">PowerPixel</div>
          <div className="text-xs text-slate-300">Admin Panel</div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={
                  item.id === "home"
                    ? "/"
                    : item.id === "products" || item.id === "add"
                      ? "/dashboard/products"
                      : "/dashboard"
                }
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm hover:bg-white/5 ${isActive(item.id) ? "bg-cyan-500 text-white border-l-4 border-cyan-400" : "text-slate-200"}`}
              >
                <span className="opacity-90">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-white">
            A
          </div>
          <div>
            <div className="font-semibold">Admin</div>
            <div className="text-xs text-slate-400">Administrator</div>
          </div>
        </div>

        <button className="mt-4 w-full rounded-md bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2 justify-center">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
