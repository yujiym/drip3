"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";

export default function Home() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    if (!isDisconnected && address) {
      redirect("/app");
    }
  }, [address, isConnecting, isDisconnected]);

  return (
    <main>
      <button onClick={() => open()}>Start Selling</button>
    </main>
  );
}
