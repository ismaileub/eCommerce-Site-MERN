import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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

const PROFILE_CACHE_KEY = "PP_DASHBOARD_PROFILE";

const getCachedProfile = (email?: string) => {
  if (!email) return null;

  try {
    const cached = JSON.parse(
      sessionStorage.getItem(PROFILE_CACHE_KEY) || "null",
    ) as (DashboardProfile & { cacheEmail?: string }) | null;

    return cached?.cacheEmail === email ? cached : null;
  } catch {
    return null;
  }
};

const Dashboard = () => {
  const { user, loading: loadingAuth } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [profile, setProfile] = useState<DashboardProfile | null>(() =>
    getCachedProfile(user?.email || undefined),
  );
  const profileRef = useRef(profile);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      profileRef.current = null;
      setLoadingProfile(false);
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      setLoadingProfile(!profileRef.current);

      try {
        const response = await axiosPublic.get("/user/me");
        if (!isMounted) return;

        const nextProfile = response.data?.data ?? null;
        profileRef.current = nextProfile;
        setProfile(nextProfile);
        sessionStorage.setItem(
          PROFILE_CACHE_KEY,
          JSON.stringify({ ...nextProfile, cacheEmail: user.email }),
        );
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

  if (loadingAuth || loadingProfile) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 text-sm text-slate-600">
        Loading your dashboard...
      </div>
    );
  }

  if (user && isAdmin) {
    return <AdminDashboard profile={profile} />;
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-2xl shadow-cyan-900/20 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
          Dashboard
        </p>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">
          Welcome to your control center
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
          Track your orders, review your cart, and manage your profile.
        </p>

        {user ? (
          <UserDashboard profile={profile} />
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
