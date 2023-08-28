import { ethers } from "hardhat";
import fs from 'fs'

async function main() {

  const [issuer] = await ethers.getSigners()
  const contractAddress = '0xCd738DF3e710AE002D6Ae990645aA5Fb0A1Ee158'
  const abiDir = __dirname + '/../artifacts/contracts';
  const nftAbiContract = abiDir + "/" + "AWP.sol" + "/" + "AWP" + ".json"  
  let nftAbi;
  try {
    nftAbi = JSON.parse(fs.readFileSync(nftAbiContract,{encoding:'utf8', flag:'r'}));
  } catch (error) {
    console.log(error)
    return;
  }
  const nft = new ethers.Contract(contractAddress, nftAbi.abi, issuer)

  try {
    const mint = await nft.safeMint(); 
    const mintReceipt = await mint.wait(1);
    console.log("\nMinted ✅", mintReceipt.transactionHash)
  } catch(e) {
    console.log("Error ❌", e)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
