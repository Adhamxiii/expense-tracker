"use client";

import React from "react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { useState } from "react";
import { db } from "../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { toast } from "sonner";
import moment from "moment";
import { Loader } from "lucide-react";

const AddExpenses = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const [loading, setLoading] = useState(false);

  console.log(user);

  const addNewExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyyy"),
      })
      .returning({ insertedId: Budgets.id });

    setAmount("");
    setName("");
    if (result) {
      setLoading(false);
      refreshData();
      toast("New Expense Added!");
    }
    setLoading(false);
  };

  return (
    <div className="p-5 border rounded-lg">
      <h2 className="text-lg font-bold">Add Expenses</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          type="text"
          name="name"
          placeholder="e.g. Food"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          type="number"
          name="amount"
          placeholder="e.g. $10.00"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        className="mt-3 w-full"
        onClick={() => addNewExpense()}
      >
        {loading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          "Add New Expense"
        )}
      </Button>
    </div>
  );
};

export default AddExpenses;
