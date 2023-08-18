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
  // const supply = await nft.totalSupply()
  const supply = 3
  console.log('\nCurrent total upply:', Number(supply))
  try {
    console.log(" ")
    for (let id = 0 ; id < supply ; id++) {
      const holderAddress = await nft.ownerOf(id)
      console.log("ID #"+id+" is owned by account", holderAddress)
    }
  } catch(e) {
    console.log("Error ❌", e)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
