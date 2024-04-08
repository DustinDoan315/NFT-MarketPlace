import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test",
  },

  networks: {
    bsctest: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545",
      accounts: [process.env.PRIV_KEY || ""],
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/2b3b923ad44a4738ba5aa8e2bb5f7463",
      accounts: [process.env.PRIV_KEY || ""],
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY_SEPOLIA,
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
