import {
  LAMPORTS_PER_SOL,        // 1 sol = 1_000_000_000 lamports (smallest unit)
  SystemProgram,           // built-in program to handle basic actions like transfers
  Transaction,             // used to create a transaction and add instructions to it
  sendAndConfirmTransaction, // sends the transaction and waits for confirmation
  Keypair,                 // to generate public/private keypairs (accounts)
  Connection               // connects to a solana rpc node (e.g. local or devnet)
} from "@solana/web3.js";

// connect to local validator
const connection = new Connection("http://localhost:8899", "confirmed");

// generate a new keypair for sender and recipient
const sender = Keypair.generate();
const recipient = new Keypair();

// airdrop 1 sol to sender
const airdropSignature = await connection.requestAirdrop(
  sender.publicKey,
  LAMPORTS_PER_SOL
);

// wait for airdrop to confirm
await connection.confirmTransaction(airdropSignature, "confirmed");

// check balances before transfer
const preBalance1 = await connection.getBalance(sender.publicKey);
const preBalance2 = await connection.getBalance(recipient.publicKey);

// set transfer amount
const transferAmount = 0.01;

// create instruction to transfer sol
const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient.publicKey,
  lamports: transferAmount * LAMPORTS_PER_SOL
});

// create a transaction and add the instruction
const transaction = new Transaction().add(transferInstruction);

// send and confirm the transaction
const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [sender]
);

// check balances after transfer
const postBalance1 = await connection.getBalance(sender.publicKey);
const postBalance2 = await connection.getBalance(recipient.publicKey);

// log balances and transaction signature
console.log("sender pre:", preBalance1 / LAMPORTS_PER_SOL);
console.log("recipient pre:", preBalance2 / LAMPORTS_PER_SOL);
console.log("sender post:", postBalance1 / LAMPORTS_PER_SOL);
console.log("recipient post:", postBalance2 / LAMPORTS_PER_SOL);
console.log("signature:", transactionSignature);

