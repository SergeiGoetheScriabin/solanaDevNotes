import {
  LAMPORTS_PER_SOL,           // smallest unit of sol
  SystemProgram,              // for basic instructions like transfer
  Transaction,                // to build a transaction
  Keypair,                    // to generate sender/recipient keypairs
  Connection,                 // connect to rpc (validator)
  ComputeBudgetProgram,       // to set compute limits and price
  sendAndConfirmTransaction   // to send and wait for confirmation
} from "@solana/web3.js";


const connection = new Connection("http://localhost:8899", "confirmed"); // connect to local validator

const sender = Keypair.generate();     // make sender keypair
const recipient = new Keypair();       // make recipient keypair

const airdropSignature = await connection.requestAirdrop(
  sender.publicKey,
  LAMPORTS_PER_SOL
); // give sender 1 sol

await connection.confirmTransaction(airdropSignature, "confirmed"); // wait for airdrop

// set max compute units allowed (budget cap)
const limitInstruction = ComputeBudgetProgram.setComputeUnitLimit({
  units: 300_00
});

// set how much to pay per unit (priority fee)
const priceInstruction = ComputeBudgetProgram.setComputeUnitPrice({
  microLamports: 1
});

// build transfer instruction (send 0.01 sol)
const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient.publicKey,
  lamports: 0.01 * LAMPORTS_PER_SOL
});

// add everything to transaction
const transaction = new Transaction()
  .add(limitInstruction)
  .add(priceInstruction)
  .add(transferInstruction);

// send transaction and wait for confirmation
const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log("transaction signature:", signature);

