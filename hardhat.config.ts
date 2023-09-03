import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const { 
  ARTHERA_TESTNET_PRIVATE_KEY,
  ARTHERA_TESTNET_ENDPOINT_URL,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  mocha: {
    timeout: 100000
  },
  networks: {
    'hardhat': {
      chainId: 1337,
      allowUnlimitedContractSize: true
    },
    'arthera-testnet': {
      url: ARTHERA_TESTNET_ENDPOINT_URL || "",
      chainId: 10243,
      accounts: ARTHERA_TESTNET_PRIVATE_KEY !== undefined ? [ARTHERA_TESTNET_PRIVATE_KEY] : [],
    },
  }, 

};

export default config;
