"use client";
import { Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import {
  useInitWeb3InboxClient,
  useManageSubscription,
} from "@web3inbox/widget-react";
import NftAbi from "@/lib/abi/Drip3NFT.json";

export default function Product() {
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0xC36dcDfF4968a80a91015A55fF07426E0e9F8658",
    abi: NftAbi.abi,
    chainId: 11155111,
    functionName: "createMarketSale",
    args: ["drip3"],
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const {
    subscribe,
    unsubscribe,
    isSubscribed,
    isSubscribing,
    isUnsubscribing,
  } = useManageSubscription(address);

  const mintAndSubscribe = async () => {
    subscribe();
    toast("Subscribed!");
  };

  return (
    <div>
      <div className="border-b border-foreground">
        <img
          src="https://bafybeiac5punremwf6kywmapcq6cgzjak7dr7xetydesllw4mglnfepleq.ipfs.w3s.link/top-image.png"
          className="object-cover w-full h-full"
          alt="top"
        />
      </div>
      <div className="w-fullfont-bold text-3xl font-dot p-6 border-b border-foreground text-right">
        0.01 ETH
      </div>
      <div className="border-b border-foreground p-6">
        Mint this NFT you can get my portfolio files (10PSD) & future update
        messages by owner.
      </div>
      <div className="fixed bottom-0 mx-auto right-0 left-0 max-w-2xl p-6">
        <Button
          className="w-full bg-foreground text-white text-xl h-16 font-dot"
          type="submit"
          onClick={() => mintAndSubscribe()}
        >
          Mint & Subscribe
        </Button>
      </div>
    </div>
  );
}
