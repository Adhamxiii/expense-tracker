"use client";

import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { useEffect, useState } from "react";
import { db } from "../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../../utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpensesListTable from "./expenses/_components/ExpensesListTable";

const DashboardPage = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

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
    getExpensesList();
  };

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
    <div className="p-8">
      <h2 className="text-3xl font-bold">Hi, {user?.fullName} ✌️</h2>
      <p className="text-gray-500">
        Here's what happening with your money, Let's Manage your expenses
      </p>

      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          <ExpensesListTable
            expensesList={expensesList}
            refreshData={() => getExpensesList()}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="text-lg font-bold">Latest Budgets</h2>
          {budgetList.map((budget, i) => (
            <BudgetItem key={i} budget={budget} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
