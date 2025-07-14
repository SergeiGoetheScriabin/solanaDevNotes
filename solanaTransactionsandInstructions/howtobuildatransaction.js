import {
  LAMPORTS_PER_SOL,         // smallest unit of sol (1 sol = 1_000_000_000 lamports)
  SystemProgram,            // built-in program to handle basic instructions like transfer
  Transaction,              // used to build a transaction with instructions
  Keypair,                  // to generate public/private keypairs (accounts)
  Connection                // connects to a solana validator
} from "@solana/web3.js";


const connection = new Connection("http://localhost:8899", "confirmed"); // connect to local validator
const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash(); // get recent block info


const sender = Keypair.generate();     // make keypair for sender
const recipient = new Keypair();       // make keypair for recipient

const transferAmount = 0.01            // 0.01 SOL


// create transfer instruction from sender to recipient
const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient.publicKey,
  lamports: transferAmount * LAMPORTS_PER_SOL
});


// build transaction with block info, fee payer, and the instruction
const transaction = new Transaction({
  blockhash,
  lastValidBlockHeight,
  feePayer: sender.publicKey
}).add(transferInstruction);

transaction.sign(sender); // sign with sender’s key


// compile the message (ready for serialization / sending)
const compiledMessage = transaction.compileMessage();
console.log("compiled message object:");
console.log(JSON.stringify(compiledMessage, null, 2)); // show the full compiled message

// breakdown of what’s inside
console.log("\n--- breakdown ---");
console.log("recent blockhash:", compiledMessage.recentBlockhash);
console.log("account keys:");
compiledMessage.accountKeys.forEach((key, i) => {
  console.log(`  [${i}] ${key.toBase58()}`);
});

console.log("\ninstructions:");
compiledMessage.instructions.forEach((ix, i) => {
  console.log(`  instruction [${i}]`);
  console.log("    program id index:", ix.programIdIndex);
  console.log("    accounts indexes:", ix.accounts);
  console.log("    raw data (base64):", ix.data.toString("base64"));
});

