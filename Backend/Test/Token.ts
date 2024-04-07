import { ethers } from "hardhat";
import { expect } from "chai";
import { describe } from "mocha";
import { DTC, DTC__factory } from "../typechain-types";
import { keccak256 } from "ethers";

describe("---DTC---", () => {
  let DTC: DTC__factory;
  let dtc: any;
  let Marketplace: any;
  let marketplace: any;
  let deployer: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [deployer, addr1, addr2] = await ethers.getSigners();
    DTC = await ethers.getContractFactory("DTC");
    dtc = (await DTC.deploy(deployer)) as DTC;
  });

  describe("Deployment", async () => {
    it("Should set the correct name and symbol", async () => {
      expect(await dtc.name()).to.equal("Dustin Token");
      expect(await dtc.symbol()).to.equal("Dustin");
    });
  });

  describe("Minting NFTs", async () => {
    it("Should mint and track NFTs correctly", async () => {
      await dtc
        .connect(deployer)
        .grantRole(await dtc.MINTER_ROLE(), await addr1.address);

      await dtc.connect(addr1).mint(addr1.address, 1);
      expect(await dtc.balanceOf(await addr1.address)).to.equal(1);
    });

    it("Should not mint by account not match role", async () => {
      await dtc
        .connect(deployer)
        .grantRole(await dtc.MINTER_ROLE(), await addr1.address);

      await expect(
        dtc.connect(addr2).mint(addr2.address, 1)
      ).to.be.revertedWith("Caller is not a minter");
    });
  });
});
