"use client";
import Image from "next/image";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Menu, LogOut, PackagePlus } from "lucide-react";
import LogoImg from "@/assets/logo.png";
import { useDisconnect } from "wagmi";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { address, isDisconnected } = useAccount();

  useEffect(() => {
    if (isDisconnected || !address) {
      redirect("/");
    }
  }, [address, isDisconnected]);

  const HMenu = () => {
    const { disconnect } = useDisconnect();
    const pathname = usePathname();

    return (
      <Dropdown>
        <DropdownTrigger>
          <button className="outline-none">
            <Menu size={32} />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new" onClick={() => redirect("/app/products/new")}>
            <span className="inline-flex items-center">
              <PackagePlus className="mr-4" />
              New product
            </span>
          </DropdownItem>
          <DropdownItem
            key="signout"
            className="text-danger"
            color="danger"
            onClick={() => disconnect()}
          >
            <span className="inline-flex items-center">
              <LogOut className="mr-4" />
              Signout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  return (
    <main className="container mx-auto max-w-2xl min-h-screen">
      <header className="h-16 fixed right-0 left-0 flex items-center justify-between px-6 z-40 bg-background/90 backdrop-blur-sm border-b border-foreground">
        <Image src={LogoImg} height={32} alt="drip3" />
        <HMenu />
      </header>
      <div className="h-16" />
      {children}
    </main>
  );
}
