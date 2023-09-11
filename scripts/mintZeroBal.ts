import { ethers } from "hardhat";
import fs from 'fs'

async function main() {

  const [signer] = await ethers.getSigners()
  // const contractAddress = '0xe2c7afe278BD3B60798208F84281A4e4733d1688'
  const contractAddress = '0x159025f4A1FbA5e592317b2Ff988004f8582Ca78'
  const abiDir = __dirname + '/../artifacts/contracts';
  const nftAbiContract = abiDir + "/" + "Imnotlate.sol" + "/" + "Imnotlate" + ".json"  
  let nftAbi;
  try {
    nftAbi = JSON.parse(fs.readFileSync(nftAbiContract,{encoding:'utf8', flag:'r'}));
  } catch (error) {
    console.log(error)
    return;
  }
  const nft = new ethers.Contract(contractAddress, nftAbi.abi, signer)

  try {   
    const balBefore = await ethers.provider.getBalance(signer.address)
    console.log('Balance before mint:', Number(balBefore))
    const mint = await nft.safeMint(signer.address, {gaslimit:100000}); 
    await mint.wait(1);
    const balAfter = await ethers.provider.getBalance(signer.address)
    console.log('Balance  after mint:', Number(balAfter))
    console.log('Total amount of AA spent (tx fee):', Number(balBefore-balAfter))
    console.log("Mint done ✅")
  }
  
 catch(e) {
  console.log("Error ❌", e)
}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
