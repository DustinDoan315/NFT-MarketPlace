/* eslint-disable jsx-a11y/alt-text */
"use client";

import { numberFormat, showSortAddress } from "@/utils";
import { Button, Flex, Image } from "antd";
import React from "react";

interface IProps {
  address: string;
  amount: number;
}

export default function WalletInfo({ address, amount }: IProps) {
  return (
    <Flex justify="center" align="center" gap="small">
      <span style={{ color: "white" }}>{showSortAddress(address)}</span>
      <Image src={"/bnb.png"} width={25} />
      <span style={{ color: "white" }}>{numberFormat(amount)}</span>
    </Flex>
  );
}
