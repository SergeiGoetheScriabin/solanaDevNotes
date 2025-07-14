import { PublicKey } from "@solana/web3.js";

// the program we’re deriving the pda for
const programAddress = new PublicKey("11111111111111111111111111111111");

// extra seed data (can be any string)
const optionalSeedString = "helloWorld";

// using a public key as a second seed
const optionalSeedAddress = new PublicKey(
  "B9Lf9z5BfNPT4d5KMeaBFx8x1G4CULZYR1jA2kmxRDka"
);

// both seeds need to be buffers
const seeds = [
  Buffer.from(optionalSeedString),
  optionalSeedAddress.toBuffer()
];

// generate the pda from seeds + program
const [pda, bump] = PublicKey.findProgramAddressSync(seeds, programAddress);

console.log(`pda: ${pda}`);
console.log(`bump: ${bump}`);

