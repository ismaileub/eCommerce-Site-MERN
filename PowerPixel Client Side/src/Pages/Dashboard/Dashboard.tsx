import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export type DashboardProfile = {
  name?: string;
  email?: string;
  picture?: string;
  role?: "USER" | "ADMIN" | "SUPER_ADMIN";
};

const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoadingProfile(false);
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      setLoadingProfile(true);

      try {
        const response = await axiosPublic.get("/user/me");
        if (!isMounted) return;

        setProfile(response.data?.data ?? null);
      } catch (error) {
        if (!isMounted) return;
        setProfile(null);
      } finally {
        if (isMounted) {
          setLoadingProfile(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [axiosPublic, user]);

  const role = profile?.role;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-2xl shadow-cyan-900/20 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
          Dashboard
        </p>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">
          Welcome to your control center
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
          {isAdmin
            ? "Manage products, users, and orders from one place."
            : "Track your orders, review your cart, and manage your profile."}
        </p>

        {user ? (
          loadingProfile ? (
            <div className="mt-8 rounded-2xl border border-cyan-400/30 bg-slate-800/80 p-6 text-sm text-slate-300">
              Loading your dashboard...
            </div>
          ) : isAdmin ? (
            <AdminDashboard profile={profile} />
          ) : (
            <UserDashboard profile={profile} />
          )
        ) : (
          <div className="mt-8 rounded-2xl border border-cyan-400/30 bg-slate-800/80 p-6">
            <h2 className="text-xl font-bold text-white">Sign in required</h2>
            <p className="mt-2 text-sm text-slate-300">
              Please sign in from the navbar to access your dashboard.
            </p>
            <Link
              to="/"
              className="mt-4 inline-flex rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
