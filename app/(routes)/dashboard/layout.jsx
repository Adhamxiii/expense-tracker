"use client";

import { Budgets } from "../../../utils/schema";
import { db } from "../../../utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.fullName));

    if (result?.length === 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <section>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </section>
  );
}
