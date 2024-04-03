/* eslint-disable jsx-a11y/alt-text */
"use client";

import { numberFormat, showSortAddress } from "@/utils";
import { Button, ButtonProps, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  address: string;
  amount: number;
}

export default function WalletInfo({ address, amount }: IProps) {
  return (
    <Button colorScheme="blue">
      <HStack>
        <Text>{showSortAddress(address)}</Text>
        <Image src={"/bnb.png"} w={"25px"} ml={"20px"} alt="bnb" />
        <Text>{numberFormat(amount)}</Text>
      </HStack>
    </Button>
  );
}
