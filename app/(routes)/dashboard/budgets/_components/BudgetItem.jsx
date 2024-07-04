import Link from "next/link";
import React from "react";

const BudgetItem = ({ budget }) => {
  const calculatePercentage = () => {
    const perc = (budget?.totalSpend / budget?.amount) * 100;

    return perc.toFixed(2);
  };

  return (
    <Link href={`/dashboard/expenses/${budget?.id}`}>
      <div className="p-5 shadow-sm border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="text-lg font-bold">{budget?.name}</h2>
              <h2 className="text-sm text-gray-500">
                {budget?.totalItem} Item
              </h2>
            </div>
          </div>
          <h2 className="text-lg text-primary font-bold">${budget?.amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex justify-between items-center gap-2 mb-3">
            <h2 className="text-xs text-slate-400">
              ${budget?.totalSpend ? budget.totalSpend : 0} Spent
            </h2>
            <h2 className="text-xs text-slate-400">
              ${budget?.amount - budget?.totalSpend} Remaining
            </h2>
          </div>
          <div className="w-full h-2 bg-slate-300 rounded-full">
            <div
              className="h-2 bg-primary rounded-full"
              style={{ width: `${calculatePercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
