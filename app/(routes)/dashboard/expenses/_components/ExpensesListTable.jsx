import { Trash } from "lucide-react";
import React from "react";
import { db } from "../../../../../utils/dbConfig";
import { Expenses } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const ExpensesListTable = ({ expensesList, refreshData }) => {
  const deleteHandler = async (item) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, item.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refreshData();
    }
  };

  return (
    <div className="mt-3">
      <h2 className="text-lg font-bold">Latest Expenses</h2>

      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>

      {expensesList?.map((item) => (
        <div key={item.id} className="grid grid-cols-4 bg-white p-2">
          <h2>{item.name}</h2>
          <h2>${item.amount}</h2>
          <h2>{item.createdAt}</h2>
          <h2>
            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteHandler(item)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpensesListTable;
