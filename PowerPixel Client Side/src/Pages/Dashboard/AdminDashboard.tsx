import { Link } from "react-router-dom";
import type { DashboardProfile } from "./Dashboard";

type AdminDashboardProps = {
  profile: DashboardProfile | null;
};

const AdminDashboard = ({ profile }: AdminDashboardProps) => {
  const displayName = profile?.name || "Admin";
  const displayEmail = profile?.email || "";
  const role = profile?.role || "ADMIN";

  return (
    <div className="mt-8 space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-800/80 p-5 ring-1 ring-white/10 sm:col-span-2">
          <p className="text-sm text-slate-400">Signed in as</p>
          <p className="mt-2 text-lg font-bold text-white">{displayName}</p>
          <p className="mt-1 break-all text-sm text-slate-300">
            {displayEmail}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-800/80 p-5 ring-1 ring-white/10">
          <p className="text-sm text-slate-400">Role</p>
          <p className="mt-2 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-400/20">
            {role}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-800/80 p-5 ring-1 ring-white/10">
          <p className="text-sm text-slate-400">Admin actions</p>
          <p className="mt-2 text-base font-semibold text-white">
            Manage inventory and user access.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/cart"
              className="inline-flex rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              View Cart
            </Link>
            <Link
              to="/"
              className="inline-flex rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Go Home
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-800/80 p-5 ring-1 ring-white/10">
          <p className="text-sm text-slate-400">Admin dashboard</p>
          <p className="mt-2 text-base font-semibold text-white">
            This area is ready for product, order, and user controls.
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Add your admin panels here when you are ready.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
