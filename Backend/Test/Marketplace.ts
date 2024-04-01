import { ethers } from "hardhat";
import { expect } from "chai";
import { describe } from "mocha";
import { DTC, DTC__factory } from "../typechain-types";

describe("NFTMarketplace", () => {
  let DTC: DTC__factory;
  let dtc: any;
  let Marketplace: any;
  let marketplace: any;
  let deployer: any;
  let addr1: any;
  let addr2: any;
  let addrs: any;
  let feePercent: number = 10;
  const tokenURI: string = "tokenURI";

  beforeEach(async function () {
    [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();
    DTC = await ethers.getContractFactory("DTC");
    Marketplace = await ethers.getContractFactory("Marketplace");
    dtc = (await DTC.deploy()) as DTC;
    marketplace = await Marketplace.deploy(feePercent);
  });

  it("Should track each minted NFT", async function () {
    // addr1 mints an nft
    await dtc.connect(addr1).mintNewToken(addr1, tokenURI);
    expect(await dtc._nextTokenId()).to.equal(1);
    expect(await dtc.balanceOf(addr1.address)).to.equal(1);
    expect(await dtc.tokenURI(1)).to.equal(tokenURI);
    // addr2 mints an dtc
    await dtc.connect(addr2).mintNewToken(addr2, tokenURI);
    expect(await dtc._nextTokenId()).to.equal(2);
    expect(await dtc.balanceOf(addr2.address)).to.equal(1);
    expect(await dtc.tokenURI(2)).to.equal(tokenURI);
  });
});
