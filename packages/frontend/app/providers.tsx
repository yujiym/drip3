"use client";
import { NextUIProvider } from "@nextui-org/react";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? "";
const chains = [sepolia];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "drip3",
});
createWeb3Modal({ wagmiConfig, projectId, chains });

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <NextUIProvider>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </NextUIProvider>
  );
}
