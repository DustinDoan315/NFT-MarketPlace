"use client";

import { marketplaceContract } from "@/utils/Contract";
import { getTokenByAddress } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { Image, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { DataListingType } from "@/constants/types";
export default function InvestmentLayout() {
  const myAddress: string = "0xbB66BcBcE152273DF812bd988405168ADB889285";
  const [listToken, setListToken] = useState<number[]>([]);
  useEffect(() => {
    const getListingByAddress = async () => {
      const data: number[] = await getTokenByAddress(myAddress);
      setListToken(data);
    };
    getListingByAddress();
  }, []);

  const columns: TableProps<DataListingType>["columns"] = [
    {
      title: "TokenId",
      dataIndex: "tokenId",
      key: "tokenId",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
  ];

  const data: DataListingType[] = listToken?.map((token: number) => {
    return {
      key: token,
      tokenId: token.toString(),
      image: (
        <Image
          alt={`nft_${token}`}
          style={{
            borderRadius: 100,
          }}
          // preview={false}
          width={65}
          src={`/nft_${token}.webp`}
        />
      ),
    };
  });

  return <Table columns={columns} dataSource={data} />;
}
