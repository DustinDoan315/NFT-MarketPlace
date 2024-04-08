import { ethers } from "hardhat";
import { expect } from "chai";
import { describe } from "mocha";
import { DTC, DTC__factory } from "../typechain-types";

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
    dtc = (await DTC.deploy(deployer)) as DTC;
    marketplace = await Marketplace.deploy(feePercent);
  });

  describe("Deployment", async () => {
    const tokenName: string = "Dustin Token";
    const tokenSymbol: string = "Dustin";

    it("Should track name and symbol of the nft collection", async function () {
      expect(await dtc.name()).to.equal(tokenName);
      expect(await dtc.symbol()).to.equal(tokenSymbol);
    });
  });

  describe("Log price by id", async () => {
    it("Should Log price by id", async function () {
      const feePercent = await marketplace.connect(addr1).feePercent.call();
    });
  });

  // describe("Minting NFTs", () => {
  //   it("Should track each minted NFT", async function () {
  //     await dtc.connect(addr1).mintNewToken(addr1, tokenURI);
  //     expect(await dtc._nextTokenId()).to.equal(1);
  //     expect(await dtc.balanceOf(addr1.address)).to.equal(1);
  //     expect(await dtc.tokenURI(1)).to.equal(tokenURI);

  //     await dtc.connect(addr2).mintNewToken(addr2, tokenURI);
  //     expect(await dtc._nextTokenId()).to.equal(2);
  //     expect(await dtc.balanceOf(addr2.address)).to.equal(1);
  //     expect(await dtc.tokenURI(2)).to.equal(tokenURI);
  //   });

  //     it("Should track each minted the second NFT", async function () {
  //       await dtc.connect(addr1).mintNewToken(addr1, tokenURI);
  //       expect(await dtc._nextTokenId()).to.equal(1);
  //       expect(await dtc.balanceOf(addr1.address)).to.equal(1);
  //       expect(await dtc.tokenURI(1)).to.equal(tokenURI);

  //       await dtc.connect(addr2).mintNewToken(addr2, tokenURI);
  //       expect(await dtc._nextTokenId()).to.equal(2);
  //       expect(await dtc.balanceOf(addr2.address)).to.equal(1);
  //       expect(await dtc.tokenURI(2)).to.equal(tokenURI);
  //     });
  //   });

  //   describe("Making marketplace items", () => {
  //     let price = 1;
  //     let tokenID = 1;
  //     let result;
  //     beforeEach(async () => {
  //       await dtc.connect(addr1).mintNewToken(addr1, tokenURI);
  //       await dtc.connect(addr1).setApprovalForAll(marketplace.target, true);
  //     });

  //     it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async () => {
  //       await expect(
  //         marketplace
  //           .connect(addr1)
  //           .makeNewItem(dtc.target, tokenID, toWei(price))
  //       )
  //         .to.emit(marketplace, "Offered")
  //         .withArgs(1, dtc.target, 1, toWei(price), addr1.address);

  //       // Owner of NFT should now be the marketplace
  //       expect(await dtc.ownerOf(1)).to.equal(marketplace.target);
  //       // Item count should now equal 1
  //       expect(await marketplace.itemCount()).to.equal(1);
  //       // Get item from items mapping then check fields to ensure they are correct
  //       const item = await marketplace.items(1);
  //       expect(item.itemId).to.equal(1);
  //       expect(item.nft).to.equal(dtc.target);
  //       expect(item.tokenId).to.equal(1);
  //       expect(item.price).to.equal(toWei(price));
  //       expect(item.sold).to.equal(false);
  //     });

  //     it("Should fail if price is set to zero", async function () {
  //       await expect(
  //         marketplace.connect(addr1).makeNewItem(dtc.target, 1, 0)
  //       ).to.be.revertedWith("Price must be greater than zero");
  //     });
  //   });

  //   describe("Purchasing marketplace items", () => {
  //     let price = 2;
  //     let fee = (feePercent / 100) * price;
  //     let totalPriceInWei;
  //     const epsilon = 0.000000000001; // Define a very small difference threshold

  //     beforeEach(async () => {
  //       await dtc.connect(addr1).mintNewToken(addr1, tokenURI);
  //       await dtc.connect(addr1).setApprovalForAll(marketplace.target, true);

  //       await marketplace.connect(addr1).makeNewItem(dtc.target, 1, toWei(price));
  //     });

  //     it("Should update item as sold, pay seller, transfer NFT to buyer, charge fees and emit a Bought event", async () => {
  //       const sellerInitialEthBal: any = await ethers.provider.getBalance(
  //         addr1.address
  //       );
  //       const feeAccountInitialEthBal: any = await ethers.provider.getBalance(
  //         deployer.address
  //       );

  //       totalPriceInWei = await marketplace.getTotalPrice(1);
  //       // addr 2 purchases item.
  //       await expect(
  //         marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei })
  //       )
  //         .to.emit(marketplace, "Bought")
  //         .withArgs(1, dtc.target, 1, toWei(price), addr1.address, addr2.address);

  //       const sellerFinalEthBal: any = await ethers.provider.getBalance(
  //         addr1.address
  //       );
  //       const feeAccountFinalEthBal: any = await ethers.provider.getBalance(
  //         deployer.address
  //       );
  //       // Item should be marked as sold
  //       expect((await marketplace.items(1)).sold).to.equal(true);
  //       // Seller should receive payment for the price of the NFT sold.
  //       expect(+fromWei(sellerFinalEthBal)).to.equal(
  //         +price + +fromWei(sellerInitialEthBal)
  //       );
  //       // feeAccount should receive fee
  //       expect((+fromWei(feeAccountFinalEthBal)).toFixed(1)).to.equal(
  //         (+fee + +fromWei(feeAccountInitialEthBal)).toFixed(1)
  //       );

  //       // The buyer should now own the nft
  //       expect(await dtc.ownerOf(1)).to.equal(addr2.address);
  //     });

  //     it("Should fail if price is not enough tp buy Item", async () => {
  //       await expect(
  //         marketplace.connect(addr2).purchaseItem(1, { value: 0 })
  //       ).to.be.revertedWith(
  //         "Not enough ether to cover item price and market fee"
  //       );
  //     });
  //   });
});
