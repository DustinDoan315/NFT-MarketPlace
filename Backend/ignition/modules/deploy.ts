import { artifacts, ethers } from "hardhat";

const tokenName: string = "DTCV3";
const nftName: string = "DTNft";
const marketplaceName: string = "Marketplace";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "../../.env" });

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the ContractFactories and Signers here.
  const Token = await ethers.getContractFactory(tokenName);
  const NFT = await ethers.getContractFactory(nftName);
  const Marketplace = await ethers.getContractFactory(marketplaceName);
  // deploy contracts
  // const token = await Token.deploy(
  //   "0xbB66BcBcE152273DF812bd988405168ADB889285"
  // );
  const market = await Marketplace.deploy(
    "0xe3B34C381756609Eb593e67128ab22c7c610D323",
    "0x154028C2758a2415e3C9198fE4cb709C5E79d393",
    deployer.address
  );
  // const marketplace = await Marketplace.deploy(10);
  // Save copies of each contracts abi and address to the frontend.
  // saveFrontendFiles(marketplace, marketName);
  saveFrontendFiles(market, marketplaceName);
  console.log("Contract address:", market);
}

function saveFrontendFiles(contract: any, name: string) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../../Frontend/Web/ico/ContractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.target }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
