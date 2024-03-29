"use client";
import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import NftAbi from "@/lib/abi/Drip3NFT.json";
import toast from "react-hot-toast";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const { address } = useAccount();

  const onSubmit = async (data: any) => {
    try {
      console.log("--formData: ", data);
      // 1. upload image
      const res1 = await fetch(`/api/upload`, {
        method: "POST",
        body: image?.[0],
      });
      console.log("--upload image: ", res1);
      // 2. create NFT
      const { hash } = await writeContract({
        address: "0xC36dcDfF4968a80a91015A55fF07426E0e9F8658",
        abi: NftAbi.abi,
        functionName: "createToken",
        chainId: 11155111,
        args: ["drip3", BigInt(data.price) * BigInt(10 ** 18)],
      });
      // 3. create NFT
      const readData = await readContract({
        address: "0xC36dcDfF4968a80a91015A55fF07426E0e9F8658",
        abi: NftAbi.abi,
        chainId: 11155111,
        functionName: "fetchItemsListed",
      });
      console.log("readData: ", readData);
      const tokenId = readData.length - 1;
      // 4. save file to IPFS
      // const res3 = await fetch(`/api/lit/encrypt?tokenId=${tokenId}`, {
      //   method: "POST",
      //   body: data.file[0],
      // });
      const cid = "";
      // 4. save metadata to db
      const res4 = await fetch(
        `/api/add-product?title=${data.title}&description=${data.description}&price=${data.price}&image=${res1}&owner=${address}&cid=${cid}&tokenId=${tokenId}`
      );
      console.log("--update db: ", res4);
      toast("uploaded!");
    } catch (error) {
      console.log("---err:", error);
    }
  };

  return (
    <>
      <form className="px-6 py-12" onSubmit={handleSubmit(onSubmit)}>
        <Input
          size="lg"
          type="text"
          label="Title"
          placeholder="Enter a title"
          isInvalid={!!errors.title}
          {...register("title", { required: true, maxLength: 255 })}
        />
        {errors.title && (
          <p className="text-sm text-alert text-right">
            {errors.title?.message as string}
          </p>
        )}
        <Textarea
          size="lg"
          label="Description"
          placeholder="Describe details"
          className="mt-5"
          isInvalid={!!errors.description}
          {...register("description", { required: true, maxLength: 1500 })}
        />
        <Input
          size="lg"
          type="number"
          label="Price (ETH)"
          step={0.01}
          placeholder="0.01"
          className="mt-5"
          isInvalid={!!errors.price}
          {...register("price", { required: true, min: 0 })}
        />
        <div className="mt-5 px-2">
          <label className="text-sm pb-2">Image</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              //@ts-ignore
              setImage(e.target.files[0]);
            }}
          />
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={URL.createObjectURL(image)}
              className="w-full rounded-lg"
              alt="thumb"
            />
          )}
        </div>
        <div className="mt-5 px-2">
          <label className="text-sm pb-2">File</label>
          <br />
          <input type="file" {...register("file", { required: true })} />
        </div>
        <p className="text-foreground/50 mx-3">
          File is encrypted & upload to IPFS. Only purchaser can decrypt &
          download it.
        </p>
        <div className="h-24" />
        <div className="fixed bottom-0 mx-auto right-0 left-0 max-w-2xl p-6">
          <Button
            className="w-full bg-foreground text-white text-xl h-16 font-dot"
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
