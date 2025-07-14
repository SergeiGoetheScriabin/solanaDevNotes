import { PublicKey } from "@solana/web3.js";

// system program (built-in) — used here just as an example program
const programAddress = new PublicKey("11111111111111111111111111111111");

// seed for generating the pda (can be anything, buffer format)
const seeds = [Buffer.from("helloWorld")];

// find the pda using seed + program address
const [pda, bump] = PublicKey.findProgramAddressSync(seeds, programAddress);

console.log(`pda: ${pda}`);
console.log(`bump: ${bump}`);




