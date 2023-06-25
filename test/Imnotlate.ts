import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Imnotlate", function () {

  async function deployContracts() {
    
    const [alice] = await ethers.getSigners()

    const uri = "ipfs://bafkreih2ac5yabo2daerkw5w5wcwdc7rveqejf4l645hx2px26r5fxfnpe"
    const Imnotlate = await ethers.getContractFactory("Imnotlate");
    const nft = await Imnotlate.deploy(uri as any);

    return { nft, alice, uri }
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
  })
})