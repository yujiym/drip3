"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAccount } from "wagmi";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { address, isDisconnected } = useAccount();

  useEffect(() => {
    if (isDisconnected || !address) {
      redirect("/");
    }
  }, [address, isDisconnected]);

  return (
    <main className="container mx-auto max-w-2xl min-h-screen">{children}</main>
  );
}
