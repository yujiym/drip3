"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { Spinner } from "@nextui-org/react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    if (isDisconnected) {
      setLoading(false);
    } else if (isConnecting) {
      setLoading(true);
    } else if (address) {
      setLoading(false);
    }
  }, [address, isConnecting, isDisconnected]);

  return loading ? (
    <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-background/90">
      <Spinner size="lg" color="primary" />
    </div>
  ) : null;
}
