"use client";

import { Button } from "../../components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex items-center justify-between p-5 border shadow-sm">
      <Image src="/logo.svg" alt="logo" width={160} height={100} />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/dashboard">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
