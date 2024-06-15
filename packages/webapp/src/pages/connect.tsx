import React, { useCallback, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { Identity } from "@semaphore-protocol/core/identity";

import { useConfigWallet } from "../hooks/useConfigWallet";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import useStore from "@/store/store";
import { Routes } from "@/types/enums";

const ConnectPage: NextPage = () => {
  const router = useRouter();
  const { connectWallet, signMessage } = useConfigWallet();
  const { setSemaphoreIdentity, walletAddress } = useStore();

  const handleConnectClick = useCallback(async () => {
    // connect wallet
    const connection = await connectWallet();

    // sign message
    let msgSignature: string | undefined = undefined;
    if (connection) {
      msgSignature = await signMessage("truths galore");
    } else {
      // handle error
      console.log("sign issue");
    }

    if (msgSignature) {
      const identity = new Identity(msgSignature);
      setSemaphoreIdentity(identity.commitment);
      router.push(Routes.Feed);
    }
  }, [connectWallet, router, setSemaphoreIdentity, signMessage]);

  useEffect(() => {
    // if user is already connected, send them over to the gossip feed page
    if (walletAddress) {
      router.push(Routes.Feed);
    }
  }, [router, walletAddress]);

  return (
    <div className="flex flex-col px-4 w-full h-full min-h-screen bg-sbee">
      <Header /> 
      <div className="flex flex-col flex-grow items-center justify-center space-y-4 p-4">
        <Image
          src={"/img/honeypot.svg"}
          width={400}
          height={400}
          alt={"honeypot"}
        />
        <span className="text-[#60330a] text-[20px] font-comic font-bold text-center">
          Connect wallet & post honest truths
        </span>

        <button
          className="bg-[#ffc70f] w-[200px] h-12 border-[#f59f00] border-[2px] font-comic text-[20px] font-bold rounded-xl"
          onClick={handleConnectClick}
        >
          Connect Wallet
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ConnectPage;
