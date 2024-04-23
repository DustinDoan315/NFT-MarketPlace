/* eslint-disable jsx-a11y/alt-text */
"use client";

declare var window: any;

import { useAppDispatch } from "@/redux/hooks";
import { setWalletInfo } from "@/redux/reducers/accounts/account.slice";
import { numberFormat, showSortAddress } from "@/utils";
import { Button, Flex, Image } from "antd";
import { ethers } from "ethers";
import React from "react";

interface IProps {
  address: string;
  amount: number;
}

export default function WalletInfo({ address, amount }: IProps) {
  const dispatch = useAppDispatch();

  const handleSwitchAccount = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("wallet_requestPermissions", [
      {
        eth_accounts: {},
      },
    ]);
    const accounts = await provider.send("eth_requestAccounts", []);
    const address = accounts[0];
    const balance = await provider.getBalance(address);

    dispatch(
      setWalletInfo({
        address,
        eth: Number.parseFloat(ethers.formatEther(balance)),
      })
    );
  };

  return (
    <Flex justify="center" align="center" gap="small">
      <span style={{ color: "white" }}>{showSortAddress(address)}</span>
      <Image src={"/eth.webp"} width={25} />
      <span style={{ color: "white" }}>{numberFormat(amount)}</span>

      <Button onClick={handleSwitchAccount} type="default">
        Switch Account
      </Button>
    </Flex>
  );
}
