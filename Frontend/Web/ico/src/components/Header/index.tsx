"use client";

declare var window: any;
import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ethers } from "ethers";
import { setWalletInfo } from "@/redux/reducers/accounts/account.slice";
import WalletConnect from "../WalletConnect";
import WalletInfo from "../WalletInfo";
import Link from "next/link";

const { Header } = Layout;

const items1: MenuProps["items"] = ["Home", "investment"].map((key) => ({
  key,
  label:
    key === "Home" || key === "investment" ? (
      <Link href={`/${key === "Home" ? "" : key}`} key={key}>
        {key}
      </Link>
    ) : (
      key
    ),
}));
const HeaderComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const { wallet } = useAppSelector((state: any) => state.account);
  const [isConnectWallet, setIsConnectWallet] = useState<boolean>(false);
  const [isReload, setIsReload] = useState<boolean>(false);

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      console.log("New account:", accounts);
    };

    let cleanup: any;
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      console.log("OKKKK", window.ethereum.networkVersion);

      cleanup = () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }

    const timeoutId = setTimeout(() => {
      setIsReload(!isReload);
    }, 5000);

    return () => {
      if (cleanup) {
        cleanup();
      }
      clearTimeout(timeoutId);
    };
  }, [isReload]);

  const connectWallet = async () => {
    setIsConnectWallet(true);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not found");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];

      const balance = await provider.getBalance(address);

      dispatch(
        setWalletInfo({
          address,
          eth: Number.parseFloat(ethers.formatEther(balance)),
        })
      );

      setIsConnectWallet(false);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setIsConnectWallet(false);
    }
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["Home"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />

        {wallet.address.length > 0 ? (
          <WalletInfo
            address={wallet?.address || ""}
            amount={wallet?.eth || 0}
          />
        ) : isConnectWallet ? (
          <Spin size="large" />
        ) : (
          <WalletConnect onClick={connectWallet} />
        )}
      </Header>
    </Layout>
  );
};

export default HeaderComponent;
