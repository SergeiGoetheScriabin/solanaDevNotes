import { PublicKey } from "@solana/web3.js";

// program id to derive address with (using system program here as example)
const programAddress = new PublicKey("11111111111111111111111111111111");

// optional seed — using another public key as the seed
const optionalSeedAddress = new PublicKey(
  "B9Lf9z5BfNPT4d5KMeaBFx8x1G4CULZYR1jA2kmxRDka"
);

// convert seed to buffer for pda generation
const seeds = [optionalSeedAddress.toBuffer()];

// find the pda and bump for this seed + program combo
const [pda, bump] = PublicKey.findProgramAddressSync(seeds, programAddress);

console.log(`pda: ${pda}`);
console.log(`bump: ${bump}`);

