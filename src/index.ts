import express, { Request, Response } from "express";
import {
  publicClient,
  account,
  walletClient,
  contractAddress,
} from "../config";
import { abi } from "../abi";

import { hardhat } from "viem/chains";

// Interface definitions are great. Keeping them is good practice.
interface Contract {
  owner: string;
  cids: string[];
}

const contracts: Contract[] = [];

const app = express();
const port = 3000;

app.use(express.json());

// Improved error messages and added try-catch for better error handling
app.get(
  "/CIDFromContractByUserAddress",
  async (req: Request, res: Response) => {
    try {
      const cidOwnerAddress = req.query.cidOwnerAddress as string; // Explicitly declare the type

      if (!cidOwnerAddress) {
        return res.status(400).send("Address is required");
      }

      const response = await publicClient.readContract({
        address: `0x${contractAddress}`,
        abi,
        functionName: "getCIDs",
        args: [`0x${cidOwnerAddress}`],
        account,
      });

      if (response) {
        res.json({ CIDS: response });
      } else {
        res.status(404).send("No CIDs found for the given address");
      }
    } catch (error) {
      console.error("Failed to get CIDs:", error);
      res.status(500).send("Internal server error");
    }
  }
);

// Improved error handling and response messages
app.post("/AddCIDToContract", async (req: Request, res: Response) => {
  try {
    const { cidOwnerAddress, cid } = req.body;

    if (!cidOwnerAddress || !cid) {
      return res.status(400).send("Both owner address and CID are required");
    }

    const { request, result } = await publicClient.simulateContract({
      address: `0x${contractAddress}`,
      abi,
      functionName: "addMyCID",
      args: [cid, `0x${cidOwnerAddress}`],
      account,
      chain: hardhat,
    });

    if (request) {
      await walletClient.writeContract(request);
      res.status(201).send("CID successfully added to contract");
    } else {
      res.status(400).send("Failed to simulate contract operation");
    }
  } catch (error) {
    console.error("Failed to add CID:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
