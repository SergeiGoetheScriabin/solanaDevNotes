// ed25519 is a fast and secure signature system used by solana for account keypairs
// it provides small keys, quick verification, and strong resistance to side-channel attacks

import { Keypair } from "@solana/web3.js";

// generate a new keypair (includes a public and secret key)
const keypair = Keypair.generate();

// print the public key (used to identify an account on solana)
console.log(`public key: ${keypair.publicKey}`);

// print the secret key (used to sign transactions — keep this private)
console.log(`secret key: ${keypair.secretKey}`);

