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
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
