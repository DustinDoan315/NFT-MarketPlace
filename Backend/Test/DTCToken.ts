import { ethers } from "hardhat";
import { expect } from "chai";
import { describe } from "mocha";
import { DTCV3, DTC__factory } from "../typechain-types";

describe("---DTC---", () => {
  let DTCV3: DTC__factory;
  let dtc: any;
  let Marketplace: any;
  let marketplace: any;
  let deployer: any;
  let addr1: any;
  let addr2: any;

  let amount = 1000000 ^ 18;

  beforeEach(async function () {
    [deployer, addr1, addr2] = await ethers.getSigners();
    DTCV3 = await ethers.getContractFactory("DTCV3");
    dtc = (await DTCV3.deploy(deployer)) as DTCV3;
  });

  describe("Deployment", async () => {
    it("Should set the correct name and symbol", async () => {
      expect(await dtc.name()).to.equal("Dustin");
      expect(await dtc.symbol()).to.equal("DTCV3");
    });
  });

  describe("Minting", async () => {
    it("Should transfer and track balance correctly", async () => {
      await dtc.connect(deployer);
      await dtc.connect(deployer).transfer(addr1.address, amount);
      expect(await dtc.balanceOf(await addr1.address)).to.equal(amount);
    });
  });
});
