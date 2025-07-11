import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";

import {
  createInitializeMintInstruction,
  TOKEN_2022_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint
} from "@solana/spl-token";

// connect to local validator
const connection = new Connection("http://localhost:8899", "confirmed");

// get recent blockhash for transaction
const recentBlockhash = await connection.getLatestBlockhash();

// generate a new keypair to pay for the transaction and be mint authority
const feePayer = Keypair.generate();

// airdrop 1 SOL to fee payer
const airdropSignature = await connection.requestAirdrop(
  feePayer.publicKey,
  LAMPORTS_PER_SOL
);
await connection.confirmTransaction(airdropSignature, "confirmed");

// generate a keypair for the mint account
const mint = Keypair.generate();

// create instruction to allocate space and fund the mint account
const createAccountInstruction = SystemProgram.createAccount({
  fromPubkey: feePayer.publicKey,
  newAccountPubkey: mint.publicKey,
  space: MINT_SIZE,
  lamports: await getMinimumBalanceForRentExemptMint(connection),
  programId: TOKEN_2022_PROGRAM_ID
});

// create instruction to initialize the mint (9 decimals, feePayer is mint & freeze authority)
const initializeMintInstruction = createInitializeMintInstruction(
  mint.publicKey,
  9, // decimals
  feePayer.publicKey, // mint authority
  feePayer.publicKey, // freeze authority
  TOKEN_2022_PROGRAM_ID
);

// build transaction with both instructions
const transaction = new Transaction().add(
  createAccountInstruction,
  initializeMintInstruction
);

// send transaction, signed by feePayer and mint account (since mint is being created)
const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [feePayer, mint]
);

// log the mint address and transaction signature
console.log("mint address:", mint.publicKey.toBase58());
console.log("transaction signature:", transactionSignature);

// fetch and print account info for the new mint (truncate data for readability)
const accountInfo = await connection.getAccountInfo(mint.publicKey);
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

