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

  let permissionRequestPending = false;

  const handleSwitchAccount = async () => {
    try {
      if (permissionRequestPending) {
        console.log("Permission request already pending. Please wait.");
        return;
      }

      permissionRequestPending = true;

      const provider = new ethers.BrowserProvider(window.ethereum);

      await provider.send("wallet_requestPermissions", [{ eth_accounts: {} }]);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      const balance = await provider.getBalance(address);

      dispatch(
        setWalletInfo({
          address,
          eth: Number.parseFloat(ethers.formatEther(balance)),
        })
      );
    } catch (error: any) {
      console.error("Error handling switch account:", error);
      if (error.code === 4001) {
        console.log("User rejected the request. Please try again.");
      }
    } finally {
      permissionRequestPending = false;
    }
  };

  return (
    <Flex justify="center" align="center" gap="small">
      <span style={{ color: "white" }}>{showSortAddress(address)}</span>
      <Image preview={false} src={"/eth.webp"} width={25} />
      <span style={{ color: "white" }}>{numberFormat(amount)}</span>

      <Button onClick={handleSwitchAccount} type="default">
        <Image
          preview={false}
          onClick={handleSwitchAccount}
          src={"/switchWallet.webp"}
          width={20}
        />
      </Button>
    </Flex>
  );
}
