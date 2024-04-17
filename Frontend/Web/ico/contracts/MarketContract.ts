import { marketplaceContract } from "@/utils/Contract";

export default class MarketContract {
  getPriceItem = async (tokenId: number | string) => {
    const totalPrice = await marketplaceContract.methods
      .getTotalPrice(tokenId)
      .call();
    return totalPrice;
  };

  getFeePercent = async () => {
    const feePercent = await marketplaceContract.methods.feePercent().call();
    return feePercent;
  };

  getFeeAccount = async () => {
    const feeAccount = await marketplaceContract.methods.feeAccount().call();
    return feeAccount;
  };
}
