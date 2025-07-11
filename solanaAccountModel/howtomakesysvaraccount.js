import { Connection, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";

// connect to solana mainnet
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// fetch the clock sysvar account — this contains network time info
const accountInfo = await connection.getAccountInfo(SYSVAR_CLOCK_PUBKEY);

// print the account info, but truncate large binary data
console.log(
  JSON.stringify(
    accountInfo,
    (key, value) => {
      if (key === "data" && value && value.length > 1) {
        return [
          value[0],
          `...truncated, total bytes: ${value.length}...`,
          value[value.length - 1],
        ];
      }
      return value;
    },
    2
  )
);

