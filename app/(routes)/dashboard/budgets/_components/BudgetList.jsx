"use client";

import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import CreateBudget from "./CreateBudget";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.fullName))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0
          ? budgetList.map((budget, i) => (
              <BudgetItem key={budget.id} budget={budget} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, i) => {
              return (
                <div
                  key={i}
                  className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
                ></div>
              );
            })}
      </div>
    </div>
  );
};

export default BudgetList;
