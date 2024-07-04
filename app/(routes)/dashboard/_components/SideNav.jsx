"use client";

import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LayoutDashboard />,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: <PiggyBank />,
      link: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: <ReceiptText />,
      link: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: <ShieldCheck />,
      link: "/dashboard/upgrade",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src="/logo.svg" alt="Logo" width={160} height={100} />
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link
            key={menu.id}
            href={menu.link}
            className={`flex items-center gap-2 my-3 text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${
              pathname === menu.link && "bg-blue-100 text-primary"
            }`}
          >
            <span>{menu.icon}</span>
            {menu.name}
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center ">
        <UserButton />
        Profile
      </div>
    </div>
  );
};

export default SideNav;
