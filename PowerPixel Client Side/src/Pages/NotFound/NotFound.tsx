import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-cyan-50 text-cyan-600 mx-auto">
          <span className="text-2xl font-bold">404</span>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-slate-800">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
