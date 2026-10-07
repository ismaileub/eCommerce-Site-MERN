import React from "react";
import { FiDollarSign } from "react-icons/fi";
import {
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineCube,
} from "react-icons/hi";

const HeroKPI: React.FC = () => {
  const kpis = [
    {
      id: "r",
      label: "Total Revenue",
      value: "$124,320",
      change: "+12.4%",
      icon: <FiDollarSign />,
    },
    {
      id: "o",
      label: "Total Orders",
      value: "1,240",
      change: "+3.8%",
      icon: <HiOutlineShoppingCart />,
    },
    {
      id: "c",
      label: "Total Customers",
      value: "842",
      change: "+5.1%",
      icon: <HiOutlineUserGroup />,
    },
    {
      id: "p",
      label: "Total Products",
      value: "328",
      change: "-1.2%",
      icon: <HiOutlineCube />,
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {kpis.map((k) => (
        <div
          key={k.id}
          className="rounded-xl bg-slate-800/60 p-3 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-md bg-cyan-500/10 p-2 text-cyan-300">
              {k.icon}
            </div>
            <div>
              <div className="text-xs text-slate-300">{k.label}</div>
              <div className="mt-1 text-lg font-bold text-white">{k.value}</div>
              <div
                className={`mt-1 text-sm ${k.change.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}
              >
                {k.change}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroKPI;
