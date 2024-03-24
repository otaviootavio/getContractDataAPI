import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { config as configEnv } from "dotenv";

configEnv();

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: "https://scroll-sepolia.public.blastapi.io",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  solidity: "0.8.24",
};

export default config;
