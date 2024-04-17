"use client";

import React, { useEffect } from "react";
import MarketContract from "../../../contracts/MarketContract";

export default function InvestmentLayout() {
  const marketContract = new MarketContract();
  useEffect(() => {
    const getFeePercent = async () => {
      const data = await marketContract.getPriceItem(1);
    };
    getFeePercent();
  }, []);

  return <div>{1231}</div>;
}
