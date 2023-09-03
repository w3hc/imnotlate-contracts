import { ethers } from "hardhat";

async function main() {
  const Imnotlate = await ethers.getContractFactory("Imnotlate");
  const uri = "https://bafybeibud4xds4el75ggpvwgexw45xtxxiv56h5akgfnvrcdad7q2hxgiy.ipfs.w3s.link/imnotlate.json"
  const nft = await Imnotlate.deploy(uri);
  await nft.deployed();
  console.log(`${nft.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
