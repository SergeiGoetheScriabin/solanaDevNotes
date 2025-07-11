import { Connection, PublicKey } from "@solana/web3.js";

// connect to solana mainnet
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// public key of the spl token program (responsible for managing token accounts + transfers)
const programId = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

// fetch account info for the program id
const accountInfo = await connection.getAccountInfo(programId);

// log the account info, truncate the data field to keep output readable
console.log(
  JSON.stringify(
    accountInfo,
    (key, value) => {
      if (key === "data" && value && value.length > 1) {
        return [
          value[0],
          `...truncated, total bytes: ${value.length}...`,
          value[value.length - 1]
        ];
      }
      return value;
    },
    2
  )
);
