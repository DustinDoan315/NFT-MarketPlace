import Web3 from "web3";
import marketplace from "../../ContractsData/Marketplace.json";
import marketplaceAddr from "../../ContractsData/Marketplace-address.json";

import nft from "../../ContractsData/NFT.json";
import nftAddress from "../../ContractsData/NFT-address.json";

const network = "sepolia";

// Initialize Web3 instance
export const web3 = new Web3(
  `https://${network}.infura.io/v3/${"2b3b923ad44a4738ba5aa8e2bb5f7463"}`
);

// Add account using private key
const signer = web3.eth.accounts.privateKeyToAccount(
  "0x" + "0361aff9a985da7779d8e7f00cd460ecb483d38f0abd44ad40ecc0bfb26268b3"
);
web3.eth.accounts.wallet.add(signer);

// Instantiate contract
export const marketplaceContract = new web3.eth.Contract(
  marketplace.abi,
  marketplaceAddr.address
);

export const nftContract = new web3.eth.Contract(nft.abi, nftAddress.address);
