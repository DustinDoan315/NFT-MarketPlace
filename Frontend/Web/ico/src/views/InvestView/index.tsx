"use client";

declare var window: any;

import React, { useState } from "react";
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { WalletConnect, WalletInfo } from "@/components";
import { ethers } from "ethers";
import { menus } from "@/constants";
import Link from "next/link";

export default function InvestView() {
  const [wallet, setWallet] = useState<any>();
  const [web3Provider, setWeb3Provider] = useState<ethers.BrowserProvider>();

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum, undefined);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      setWallet({
        address,
        bnb: Number.parseFloat(ethers.formatEther(balance)),
      });
    }
  };

  return (
    <Flex
      w={{ base: "full", lg: "85%" }}
      flexDirection={"column"}
      margin={"50px auto"}>
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Heading as="h4" size="xl" noOfLines={1}>
          Blockchain Trainee
        </Heading>
        <Spacer />
        {menus.map((menu) => (
          <Link href={menu.url} key={menu.url}>
            <Text mx="20px" fontSize="20px" textDecoration="underline">
              {menu.name}
            </Text>
          </Link>
        ))}

        {!wallet ? (
          <WalletConnect onClick={connectWallet} />
        ) : (
          <WalletInfo
            address={wallet?.address || ""}
            amount={wallet?.bnb || 0}
          />
        )}
      </Flex>
    </Flex>
  );
}
