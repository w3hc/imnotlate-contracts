import { ethers } from "hardhat";
import fs from 'fs'

async function main() {

  const [issuer] = await ethers.getSigners()
  const contractAddress = '0xe2c7afe278BD3B60798208F84281A4e4733d1688'
  const abiDir = __dirname + '/../artifacts/contracts';
  const nftAbiContract = abiDir + "/" + "Imnotlate.sol" + "/" + "Imnotlate" + ".json"  
  let nftAbi;
  try {
    nftAbi = JSON.parse(fs.readFileSync(nftAbiContract,{encoding:'utf8', flag:'r'}));
  } catch (error) {
    console.log(error)
    return;
  }
  const nft = new ethers.Contract(contractAddress, nftAbi.abi, issuer)
  const numberOfMint = 1
  let timestamp = Date.now()
  try {
    for (let i = 0 ; i < numberOfMint ; i++) {
      let previousMint = timestamp
      // const mint = await nft.safeMint({gasLimit: 300000}); // Shouldn't use the gasLimit option: https://docs.arthera.net/build/differences/#differences
      const mint = await nft.safeMint(issuer.address); 
      const mintReceipt = await mint.wait(1);
      const diff = Date.now() - previousMint // not super reliable
      console.log("Done ✅", mintReceipt.transactionHash, diff, "milliseconds")
    }
    
  } catch(e) {
    console.log("Error ❌", e)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
