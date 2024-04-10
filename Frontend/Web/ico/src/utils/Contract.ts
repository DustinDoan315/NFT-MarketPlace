import Web3 from "web3";
import marketplace from "../../ContractsData/Marketplace.json";
import marketplaceAddr from "../../ContractsData/Marketplace-address.json";

import nft from "../../ContractsData/DTC.json";
import nftAddress from "../../ContractsData/DTC-address.json";

const network = "sepolia";

// Initialize Web3 instance
export const web3 = new Web3(
  `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
);

// Add account using private key
export const signer = web3.eth.accounts.privateKeyToAccount(
  "0x" + process.env.PRIVATE_KEY
);
web3.eth.accounts.wallet.add(signer);

// Instantiate contract
export const marketplaceContract = new web3.eth.Contract(
  marketplace.abi,
  marketplaceAddr.address
);

export const nftContract = new web3.eth.Contract(nft.abi, nftAddress.address);
