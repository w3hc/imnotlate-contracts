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
  const numberOfMint = 100
  let timestamp = Date.now()
  try {
    for (let i = 0 ; i < numberOfMint ; i++) {
      let previousMint = timestamp
      // 500000 works
      // 50000 fails
      // 100000 fails
      // 300000 works
      const mint = await nft.safeMint({gasLimit: 300000});
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
