import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Imnotlate", function () {

  async function deployContracts() {
    
    const [alice, bob] = await ethers.getSigners()

    const uri = "ipfs://bafkreih2ac5yabo2daerkw5w5wcwdc7rveqejf4l645hx2px26r5fxfnpe"
    const Imnotlate = await ethers.getContractFactory("Imnotlate");
    const nft = await Imnotlate.deploy(uri as any);

    return { nft, alice, uri, bob }
  }

  describe("Deployment", function () {
    it("Should have the right tokenUri", async function () {
      const { nft, alice, uri } = await loadFixture(deployContracts);
      expect(await nft.uri()).to.be.equal(uri)
    })
  })
  describe("Interactions", function () {
    it("Should mint 1 NFT", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await nft.safeMint();
      expect(await nft.ownerOf(0)).to.be.equal(alice.address);
    })
    it("Should transfer 1 NFT", async function () {
      const { nft, alice, bob } = await loadFixture(deployContracts);
      await nft.safeMint();
      await nft.transferFrom(alice.address, bob.address, 0);
      expect(await nft.ownerOf(0)).to.be.equal(bob.address);
    })
    it("Should not mint twice", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await nft.safeMint();
      expect(await nft.ownerOf(0)).to.be.equal(alice.address);
      await expect(nft.safeMint()).to.be.revertedWith("Caller already minted")
    })  
  })
})