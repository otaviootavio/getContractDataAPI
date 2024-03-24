import {
  createPublicClient,
  createWalletClient,
  defineChain,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { config } from "dotenv";
import { hardhat } from "viem/chains";

config();

export const contractAddress: string = process.env.CONTRACT_ADDRESS || "";
export const account = privateKeyToAccount(
  `0x${process.env.PRIVATE_KEY}` ?? `0x${"000"}`
).address;
export const scrollSepolia = defineChain({
  id: 534351,
  name: "Scroll Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.scroll.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://sepolia.scrollscan.com" },
  },
});

export const walletClient = createWalletClient({
  account,
  chain: hardhat,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});
