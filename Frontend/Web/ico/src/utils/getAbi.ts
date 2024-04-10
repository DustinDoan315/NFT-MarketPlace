import marketplace from "../../ContractsData/Marketplace.json";
import nft from "../../ContractsData/DTC.json";

export const getMarketAbi = () => marketplace.abi;
export const getNftAbi = () => nft.abi;
