"use client";

declare var window: any;

import React, { useState } from "react";
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { WalletConnect, WalletInfo } from "@/components";
import { ethers } from "ethers";
import { menus } from "@/constants";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setWalletInfo } from "@/redux/reducers/accounts/account.slice";

export default function InvestView() {
  const dispatch = useAppDispatch();
  const { wallet, web3Provider } = useAppSelector((state) => state.account);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum, undefined);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      dispatch(
        setWalletInfo({
          address,
          bnb: Number.parseFloat(ethers.formatEther(balance)),
        })
      );
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
        <Heading color={"black"} as="h4" size="xl" noOfLines={1}>
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
