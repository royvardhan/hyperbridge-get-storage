export const STORAGE_ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "ismpHost", type: "address", internalType: "address" },
      { name: "feeToken", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getQueryResult",
    inputs: [
      { name: "commitment", type: "bytes32", internalType: "bytes32" },
      { name: "key", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "host",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "onAccept",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IncomingPostRequest",
        components: [
          {
            name: "request",
            type: "tuple",
            internalType: "struct PostRequest",
            components: [
              { name: "source", type: "bytes", internalType: "bytes" },
              { name: "dest", type: "bytes", internalType: "bytes" },
              { name: "nonce", type: "uint64", internalType: "uint64" },
              { name: "from", type: "bytes", internalType: "bytes" },
              { name: "to", type: "bytes", internalType: "bytes" },
              {
                name: "timeoutTimestamp",
                type: "uint64",
                internalType: "uint64",
              },
              { name: "body", type: "bytes", internalType: "bytes" },
            ],
          },
          { name: "relayer", type: "address", internalType: "address" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onGetResponse",
    inputs: [
      {
        name: "incoming",
        type: "tuple",
        internalType: "struct IncomingGetResponse",
        components: [
          {
            name: "response",
            type: "tuple",
            internalType: "struct GetResponse",
            components: [
              {
                name: "request",
                type: "tuple",
                internalType: "struct GetRequest",
                components: [
                  {
                    name: "source",
                    type: "bytes",
                    internalType: "bytes",
                  },
                  {
                    name: "dest",
                    type: "bytes",
                    internalType: "bytes",
                  },
                  {
                    name: "nonce",
                    type: "uint64",
                    internalType: "uint64",
                  },
                  {
                    name: "from",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "timeoutTimestamp",
                    type: "uint64",
                    internalType: "uint64",
                  },
                  {
                    name: "keys",
                    type: "bytes[]",
                    internalType: "bytes[]",
                  },
                  {
                    name: "height",
                    type: "uint64",
                    internalType: "uint64",
                  },
                  {
                    name: "context",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
              {
                name: "values",
                type: "tuple[]",
                internalType: "struct StorageValue[]",
                components: [
                  { name: "key", type: "bytes", internalType: "bytes" },
                  {
                    name: "value",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
            ],
          },
          { name: "relayer", type: "address", internalType: "address" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onGetTimeout",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct GetRequest",
        components: [
          { name: "source", type: "bytes", internalType: "bytes" },
          { name: "dest", type: "bytes", internalType: "bytes" },
          { name: "nonce", type: "uint64", internalType: "uint64" },
          { name: "from", type: "address", internalType: "address" },
          {
            name: "timeoutTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          { name: "keys", type: "bytes[]", internalType: "bytes[]" },
          { name: "height", type: "uint64", internalType: "uint64" },
          { name: "context", type: "bytes", internalType: "bytes" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onPostRequestTimeout",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct PostRequest",
        components: [
          { name: "source", type: "bytes", internalType: "bytes" },
          { name: "dest", type: "bytes", internalType: "bytes" },
          { name: "nonce", type: "uint64", internalType: "uint64" },
          { name: "from", type: "bytes", internalType: "bytes" },
          { name: "to", type: "bytes", internalType: "bytes" },
          {
            name: "timeoutTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          { name: "body", type: "bytes", internalType: "bytes" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onPostResponse",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IncomingPostResponse",
        components: [
          {
            name: "response",
            type: "tuple",
            internalType: "struct PostResponse",
            components: [
              {
                name: "request",
                type: "tuple",
                internalType: "struct PostRequest",
                components: [
                  {
                    name: "source",
                    type: "bytes",
                    internalType: "bytes",
                  },
                  {
                    name: "dest",
                    type: "bytes",
                    internalType: "bytes",
                  },
                  {
                    name: "nonce",
                    type: "uint64",
                    internalType: "uint64",
                  },
                  {
                    name: "from",
                    type: "bytes",
                    internalType: "bytes",
                  },
                  { name: "to", type: "bytes", internalType: "bytes" },
                  {
                    name: "timeoutTimestamp",
                    type: "uint64",
                    internalType: "uint64",
                  },
                  { name: "body", type: "bytes", internalType: "bytes" },
                ],
              },
              {
                name: "response",
                type: "bytes",
                internalType: "bytes",
              },
              {
                name: "timeoutTimestamp",
                type: "uint64",
                internalType: "uint64",
              },
            ],
          },
          { name: "relayer", type: "address", internalType: "address" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onPostResponseTimeout",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct PostResponse",
        components: [
          {
            name: "request",
            type: "tuple",
            internalType: "struct PostRequest",
            components: [
              { name: "source", type: "bytes", internalType: "bytes" },
              { name: "dest", type: "bytes", internalType: "bytes" },
              { name: "nonce", type: "uint64", internalType: "uint64" },
              { name: "from", type: "bytes", internalType: "bytes" },
              { name: "to", type: "bytes", internalType: "bytes" },
              {
                name: "timeoutTimestamp",
                type: "uint64",
                internalType: "uint64",
              },
              { name: "body", type: "bytes", internalType: "bytes" },
            ],
          },
          { name: "response", type: "bytes", internalType: "bytes" },
          {
            name: "timeoutTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "pendingQueries",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "queryResults",
    inputs: [
      { name: "", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "queryTokenBalance",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "relayerFee", type: "uint256", internalType: "uint256" },
      { name: "slot", type: "bytes32", internalType: "bytes32" },
      { name: "height", type: "uint64", internalType: "uint64" },
      { name: "timeout", type: "uint64", internalType: "uint64" },
    ],
    outputs: [{ name: "commitment", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "quote",
    inputs: [
      {
        name: "request",
        type: "tuple",
        internalType: "struct DispatchPost",
        components: [
          { name: "dest", type: "bytes", internalType: "bytes" },
          { name: "to", type: "bytes", internalType: "bytes" },
          { name: "body", type: "bytes", internalType: "bytes" },
          { name: "timeout", type: "uint64", internalType: "uint64" },
          { name: "fee", type: "uint256", internalType: "uint256" },
          { name: "payer", type: "address", internalType: "address" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quote",
    inputs: [
      {
        name: "request",
        type: "tuple",
        internalType: "struct DispatchGet",
        components: [
          { name: "dest", type: "bytes", internalType: "bytes" },
          { name: "height", type: "uint64", internalType: "uint64" },
          { name: "keys", type: "bytes[]", internalType: "bytes[]" },
          { name: "timeout", type: "uint64", internalType: "uint64" },
          { name: "fee", type: "uint256", internalType: "uint256" },
          { name: "context", type: "bytes", internalType: "bytes" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quote",
    inputs: [
      {
        name: "response",
        type: "tuple",
        internalType: "struct DispatchPostResponse",
        components: [
          {
            name: "request",
            type: "tuple",
            internalType: "struct PostRequest",
            components: [
              { name: "source", type: "bytes", internalType: "bytes" },
              { name: "dest", type: "bytes", internalType: "bytes" },
              { name: "nonce", type: "uint64", internalType: "uint64" },
              { name: "from", type: "bytes", internalType: "bytes" },
              { name: "to", type: "bytes", internalType: "bytes" },
              {
                name: "timeoutTimestamp",
                type: "uint64",
                internalType: "uint64",
              },
              { name: "body", type: "bytes", internalType: "bytes" },
            ],
          },
          { name: "response", type: "bytes", internalType: "bytes" },
          { name: "timeout", type: "uint64", internalType: "uint64" },
          { name: "fee", type: "uint256", internalType: "uint256" },
          { name: "payer", type: "address", internalType: "address" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quoteNative",
    inputs: [
      {
        name: "request",
        type: "tuple",
        internalType: "struct DispatchPost",
        components: [
          { name: "dest", type: "bytes", internalType: "bytes" },
          { name: "to", type: "bytes", internalType: "bytes" },
          { name: "body", type: "bytes", internalType: "bytes" },
          { name: "timeout", type: "uint64", internalType: "uint64" },
          { name: "fee", type: "uint256", internalType: "uint256" },
          { name: "payer", type: "address", internalType: "address" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quoteNative",
    inputs: [
      {
        name: "request",
        type: "tuple",
        internalType: "struct DispatchPostResponse",
        components: [
          {
            name: "request",
            type: "tuple",
            internalType: "struct PostRequest",
            components: [
              { name: "source", type: "bytes", internalType: "bytes" },
              { name: "dest", type: "bytes", internalType: "bytes" },
              { name: "nonce", type: "uint64", internalType: "uint64" },
              { name: "from", type: "bytes", internalType: "bytes" },
              { name: "to", type: "bytes", internalType: "bytes" },
              {
                name: "timeoutTimestamp",
                type: "uint64",
                internalType: "uint64",
              },
              { name: "body", type: "bytes", internalType: "bytes" },
            ],
          },
          { name: "response", type: "bytes", internalType: "bytes" },
          { name: "timeout", type: "uint64", internalType: "uint64" },
          { name: "fee", type: "uint256", internalType: "uint256" },
          { name: "payer", type: "address", internalType: "address" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "quoteNative",
    inputs: [
      {
        name: "request",
        type: "tuple",
        internalType: "struct DispatchGet",
        components: [
          { name: "dest", type: "bytes", internalType: "bytes" },
          { name: "height", type: "uint64", internalType: "uint64" },
          { name: "keys", type: "bytes[]", internalType: "bytes[]" },
          { name: "timeout", type: "uint64", internalType: "uint64" },
          { name: "fee", type: "uint256", internalType: "uint256" },
          { name: "context", type: "bytes", internalType: "bytes" },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "StorageQueryDispatched",
    inputs: [
      {
        name: "commitment",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "slot",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "StorageQueryReceived",
    inputs: [
      {
        name: "commitment",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "key",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "value",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
  { type: "error", name: "UnauthorizedCall", inputs: [] },
  { type: "error", name: "UnexpectedCall", inputs: [] },
] as const;
