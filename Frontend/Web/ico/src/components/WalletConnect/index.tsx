"use client";
import { Button } from "antd";
import React from "react";

interface IProps {
  onClick?: () => void;
}

export default function WalletConnect({ ...props }: IProps) {
  return (
    <Button {...props} type="primary">
      Connect Wallet
    </Button>
  );
}
