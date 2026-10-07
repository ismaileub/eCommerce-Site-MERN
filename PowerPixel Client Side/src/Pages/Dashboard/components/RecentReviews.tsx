import React from "react";

const reviews = [
  {
    id: "r1",
    author: "Sam H.",
    product: "UltraMonitor X1",
    rating: 5,
    text: "Fantastic monitor for the price.",
    date: "2026-06-21",
  },
  {
    id: "r2",
    author: "Jill P.",
    product: "Pro RAM 32GB",
    rating: 4,
    text: "Great performance, but a bit pricey.",
    date: "2026-06-18",
  },
];

const RecentReviews: React.FC = () => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-700">Recent Reviews</h4>
        <div className="text-sm text-slate-500">Latest feedback</div>
      </div>

      <div className="mt-4 space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
              {r.author.split(" ")[0][0]}
            </div>
            <div>
              <div className="font-medium text-slate-700">
                {r.author}{" "}
                <span className="text-xs text-slate-400">on {r.product}</span>
              </div>
              <div className="text-sm text-slate-600">{r.text}</div>
              <div className="text-xs text-slate-400 mt-1">
                {r.date} · {r.rating} ★
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;
