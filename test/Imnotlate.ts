import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Imnotlate", function () {

  async function deployContracts() {
    
    const [alice, bob] = await ethers.getSigners()

    const uri = "https://bafybeibud4xds4el75ggpvwgexw45xtxxiv56h5akgfnvrcdad7q2hxgiy.ipfs.w3s.link/imnotlate.json"
    const Imnotlate = await ethers.getContractFactory("Imnotlate");
    const nft = await upgrades.deployProxy(Imnotlate as any, [uri], { initializer: 'initialize' });
    return { nft, alice, bob, uri }
  }

  describe("Deployment", function () {
    it("Should have the right tokenURI", async function () {
      const { nft, alice, uri } = await loadFixture(deployContracts);
      expect(await nft.uri()).to.be.equal(uri)
    })
  })
  describe("Interactions", function () {
    it("Should mint 1 NFT", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await nft.safeMint(alice.address);
      expect(await nft.ownerOf(0)).to.be.equal(alice.address);
    })
    it("Should transfer 1 NFT", async function () {
      const { nft, alice, bob } = await loadFixture(deployContracts);
      await nft.safeMint(alice.address);
      await nft.transferFrom(alice.address, bob.address, 0);
      expect(await nft.ownerOf(0)).to.be.equal(bob.address);
    })
    it("Should not mint twice", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await nft.safeMint(alice.address);
      expect(await nft.ownerOf(0)).to.be.equal(alice.address);
      await expect(nft.safeMint(alice.address)).to.be.revertedWith("Target already holds the NFT")
    })  
  })
  describe("Upgrades", function () {
    it("Should perform upgrades", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await nft.safeMint(alice.address);
      const ImnotlateV2 = await ethers.getContractFactory("ImnotlateV2");
      const up = await upgrades.upgradeProxy(await nft.getAddress(), ImnotlateV2)
      expect(await nft.ownerOf(0)).to.be.equal(alice.address);
      expect(await up.newVar()).to.be.equal(0);
    })
  })
})