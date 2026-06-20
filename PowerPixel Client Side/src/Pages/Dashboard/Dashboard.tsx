import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

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
          From here you can manage your profile, review orders, and keep track
          of what you have in your cart.
        </p>

        {user ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-800/80 p-5 ring-1 ring-white/10">
              <p className="text-sm text-slate-400">Signed in as</p>
              <p className="mt-2 break-all text-lg font-bold text-white">
                {user.email}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-800/80 p-5 ring-1 ring-white/10">
              <p className="text-sm text-slate-400">Quick actions</p>
              <Link
                to="/cart"
                className="mt-2 inline-flex rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                Go to Cart
              </Link>
            </div>
            <div className="rounded-2xl bg-slate-800/80 p-5 ring-1 ring-white/10">
              <p className="text-sm text-slate-400">Shortcuts</p>
              <Link
                to="/"
                className="mt-2 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-400"
              >
                Back to Home
              </Link>
            </div>
          </div>
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
