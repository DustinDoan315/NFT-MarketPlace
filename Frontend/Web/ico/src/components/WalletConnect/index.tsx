"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends ButtonProps {
  onClick?: () => void;
}

export default function WalletConnect({ ...props }: IProps) {
  return (
    <Button colorScheme="blue" {...props}>
      Connect Wallet
    </Button>
  );
}
