"use client";
import { useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function Home() {
  const { open } = useWeb3Modal();
  const { address, isDisconnected } = useAccount();

  useEffect(() => {
    if (!isDisconnected && address) {
      redirect("/app");
    }
  }, [address, isDisconnected]);

  return (
    <>
      <main className="container mx-auto max-w-2xl min-h-screen">
        <h1 className="text-6xl md:text-7xl font-bold pt-24 px-6">
          Sell <span className="font-dot">anything</span>,
          <br />
          Build <span className="font-dot">community</span>
        </h1>
        <div className="overflow-hidden h-64 w-full fixed bottom-64 right-0 left-0">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={{ height: "100%", width: "100%" }}
          >
            <path
              d="M0.00,49.99 C150.00,150.00 349.20,-49.99 500.00,49.99 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none", fill: "#f7f7f7" }}
            />
          </svg>
        </div>
        <div className="bg-white fixed bottom-0 right-0 left-0 h-64" />
        <footer className="sticky top-[100vh] p-6 pb-10 md:pb-16">
          <Button
            onClick={() => open()}
            className="w-full bg-foreground text-white background text-xl h-16 font-dot"
          >
            Start Selling
          </Button>
        </footer>
      </main>
    </>
  );
}
