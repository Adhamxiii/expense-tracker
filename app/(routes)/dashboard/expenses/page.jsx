"use client";

import React, { useEffect, useState } from "react";
import ExpensesListTable from "./_components/ExpensesListTable";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../utils/schema";
import { desc, eq } from "drizzle-orm";

const ExpensesPage = () => {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState();

  useEffect(() => {
    user && getExpensesList();
  }, [user]);

  const getExpensesList = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.fullName))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold">My Expenses</h2>
      <ExpensesListTable
        expensesList={expensesList}
        refreshData={getExpensesList}
      />
    </div>
  );
};

export default ExpensesPage;
