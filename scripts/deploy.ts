import { ethers } from "hardhat";

async function main() {
  const AWP = await ethers.getContractFactory("AWP");
  const uri = "https://bafybeibud4xds4el75ggpvwgexw45xtxxiv56h5akgfnvrcdad7q2hxgiy.ipfs.w3s.link/imnotlate.json"
  const nft = await AWP.deploy(uri);
  const nftDeployed = await nft.deployed();
  console.log("\nDeployed ✅", nftDeployed.deployTransaction.hash)
  console.log("\nContract address:", nft.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
