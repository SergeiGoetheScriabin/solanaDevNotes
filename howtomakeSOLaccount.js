
import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

// generate a new keypair (public + secret key)
const keypair = Keypair.generate();
console.log(`public key: ${keypair.publicKey}`);

// connect to the local solana cluster (usually a local validator)
const connection = new Connection("http://localhost:8899", "confirmed");

// request an airdrop of 1 SOL to the new public key
// this also creates the account on-chain if it doesn't exist
const signature = await connection.requestAirdrop(
  keypair.publicKey,
  LAMPORTS_PER_SOL
);

// wait for the transaction to be confirmed
await connection.confirmTransaction(signature, "confirmed");

// fetch account info to verify the account was created and funded
const accountInfo = await connection.getAccountInfo(keypair.publicKey);
console.log(JSON.stringify(accountInfo, null, 2));

