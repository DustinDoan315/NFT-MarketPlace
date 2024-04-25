import { nftContract } from "./Contract";

const myAddress: string = "0xbB66BcBcE152273DF812bd988405168ADB889285";
const gasPrice: string = "300000000";
const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shouldReturnTrue = (address: string) => {
  const randomNumber = getRandomIntInclusive(1, 100);
  if (address === myAddress) {
    if (randomNumber <= 20) {
      return 1;
    } else if (randomNumber <= 70) {
      return 2;
    } else {
      return 3;
    }
  } else {
    if (randomNumber <= 80) {
      return 1;
    } else if (randomNumber <= 95) {
      return 2;
    } else {
      return 3;
    }
  }
};

export const mintNft = async (senderAddress: string, walletAddress: string) => {
  return await nftContract.methods
    .mint(senderAddress, shouldReturnTrue(senderAddress))
    .send({
      from: walletAddress,
      gasPrice: gasPrice,
    });
};

export const setApprovalFroWallet = async (
  senderAddress: string,
  walletAddress: string,
  tokenId: string
) => {};
