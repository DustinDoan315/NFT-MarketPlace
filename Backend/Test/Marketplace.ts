import { ethers } from "hardhat";
import { expect } from "chai";
import { describe } from "mocha";
import { DTC, DTC__factory } from "../typechain-types";
import { Marketplace } from "../typechain-types/Contracts/Marketplace";

const toWei = (num: number) => ethers.parseEther(num.toString());
const fromWei = (num: number) => ethers.formatEther(num);

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

  describe("Deployment", async () => {
    const tokenName: string = "Dustin Token";
    const tokenSymbol: string = "DTCv2";

    it("Should track name and symbol of the nft collection", async function () {
      expect(await dtc.name()).to.equal(tokenName);
      expect(await dtc.symbol()).to.equal(tokenSymbol);
    });
  });

  describe("Minting NFTs", () => {
    it("Should track each minted NFT", async function () {
      await dtc.connect(addr1).mintNewToken(addr1, tokenURI);
      expect(await dtc._nextTokenId()).to.equal(1);
      expect(await dtc.balanceOf(addr1.address)).to.equal(1);
      expect(await dtc.tokenURI(1)).to.equal(tokenURI);

      await dtc.connect(addr2).mintNewToken(addr2, tokenURI);
      expect(await dtc._nextTokenId()).to.equal(2);
      expect(await dtc.balanceOf(addr2.address)).to.equal(1);
      expect(await dtc.tokenURI(2)).to.equal(tokenURI);
    });

    it("Should track each minted the second NFT", async function () {
      await dtc.connect(addr1).mintNewToken(addr1, tokenURI);
      expect(await dtc._nextTokenId()).to.equal(1);
      expect(await dtc.balanceOf(addr1.address)).to.equal(1);
      expect(await dtc.tokenURI(1)).to.equal(tokenURI);

      await dtc.connect(addr2).mintNewToken(addr2, tokenURI);
      expect(await dtc._nextTokenId()).to.equal(2);
      expect(await dtc.balanceOf(addr2.address)).to.equal(1);
      expect(await dtc.tokenURI(2)).to.equal(tokenURI);
    });
  });

  // describe("Making marketplace items", () => {
  //   let price = 1;
  //   let tokenID = 1;
  //   let result;
  //   beforeEach(async () => {
  //     await dtc.connect(addr1).mintNewToken(addr1, tokenURI);
  //     await dtc.connect(addr1).setApprovalForAll(marketplace.address, true);
  //   });

  //   it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async () => {
  //     await expect(
  //       marketplace
  //         .connect(addr1)
  //         .makeNewItem(dtc.address, tokenID, toWei(price))
  //     )
  //       .to.emit(marketplace, "Offered")
  //       .withArgs(1, dtc.address, 1, toWei(price), addr1.address);
  //   });
  // });
});
