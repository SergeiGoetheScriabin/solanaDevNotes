// program derived addresses (pdas) are special solana addresses
// that programs can deterministically generate from a program id and seeds
// unlike regular public keys, pdas do not have private keys
// only the program that owns the pda can sign transactions for it

// a bump is an extra number used to create a valid pda
// think of a pda as an address plus a bump value, for example:
//    abcd, 255
//    abcd, 252
// both share the same address prefix but differ by the bump number
// this bump helps avoid collisions with real accounts (which have private keys)
// the findProgramAddress function tries bumps starting from 255 down to 0
// until it finds a valid pda that doesn't collide with any real account
// without the bump, the pda would be incomplete and ambiguous
// to learn more you can go to this link:
// https://solana.stackexchange.com/questions/2271/what-is-the-bump-in-a-program-derived-address

import { PublicKey } from "@solana/web3.js";

// example program id — this is solana's system program here for demo purposes
const programAddress = new PublicKey("11111111111111111111111111111111");

// seeds are extra input data used to create unique pdas
// seeds can be buffers, strings, or public keys
const seeds = [Buffer.from("helloWorld")];

// findProgramAddressSync returns the valid pda and the bump used
const [pda, bump] = PublicKey.findProgramAddressSync(seeds, programAddress);

// log the pda (program derived address)
console.log(`pda: ${pda}`);

// log the bump (the number used to find a valid pda)
console.log(`bump: ${bump}`);
