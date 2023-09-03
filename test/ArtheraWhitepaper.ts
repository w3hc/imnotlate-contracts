import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Arthera Whitepaper", function () {

  async function deployContracts() {
    
    const [alice, bob] = await ethers.getSigners()

    const uri = "https://bafybeifkpdwa4tkbbze5qui3yn2ph5cntiiojmdlkoxah5fs4mc55b3vt4.ipfs.w3s.link/arthera-whitepaper-nft-metadata.json"
    const AWP = await ethers.getContractFactory("ArtheraWhitepaper");
    const nft = await AWP.deploy(uri as any);

    return { nft, alice, bob, uri }
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
    it("Should not mint twice", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await nft.safeMint();
      expect(await nft.ownerOf(0)).to.be.equal(alice.address);
      await expect(nft.safeMint()).to.be.revertedWith('Caller already minted')
    })
    it("Should transfer the NFT", async function () {
      const { nft, alice, bob } = await loadFixture(deployContracts);
      await nft.safeMint();
      expect(await nft.ownerOf(0)).to.be.equal(alice.address);
      await nft.connect(alice).transferFrom(alice.address, bob.address, 0);
      expect(await nft.ownerOf(0)).to.be.equal(bob.address);
    })
    it("Should access the Whitepaper", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await nft.safeMint();
      expect(await nft.balanceOf(alice.address)).to.be.equal(1);
    })
  })
})