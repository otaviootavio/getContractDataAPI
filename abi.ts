export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "JsonCIDSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "PdfCIDSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getJsonCID",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getPdfCID",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "setMyJsonCID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "setMyPdfCID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
