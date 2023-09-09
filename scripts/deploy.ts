import { ethers, upgrades } from "hardhat";

async function main() {
  const Imnotlate = await ethers.getContractFactory("Imnotlate");
  const uri = "https://bafybeibud4xds4el75ggpvwgexw45xtxxiv56h5akgfnvrcdad7q2hxgiy.ipfs.w3s.link/imnotlate.json"
  const nft = await upgrades.deployProxy(Imnotlate as any, [uri], { initializer: 'initialize' });
  console.log(`${await nft.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
