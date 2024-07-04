"use client";

import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import EmojiPicker from "emoji-picker-react";
import { PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Input } from "../../../../../components/ui/input";
import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";

const EditExpenses = ({ budgetInfo, refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  const { user } = useUser();

  useEffect(() => {
    setEmojiIcon(budgetInfo?.icon);
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({ name: name, amount: amount, icon: emojiIcon })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      toast.success("Budget updated successfully");
      refreshData();
    }
    console.log(result);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Groceries"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={budgetInfo?.name}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 1000$"
                    onChange={(e) => setAmount(e.target.value)}
                    defaultValue={budgetInfo?.amount}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="w-full mt-5"
                onClick={() => onUpdateBudget()}
                // disabled={!name || !amount || !emojiIcon}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditExpenses;
