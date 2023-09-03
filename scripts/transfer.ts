// npx hardhat run scripts/transfer.ts --network arthera-testnet
import { ethers } from "hardhat";

async function main() {
  const [account1] = await ethers.getSigners()
  const tx = await account1.sendTransaction({
    to: account1.address,
    value: 1
  });  
  
  console.log("\ntx hash:", tx.hash)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

