import { PublicKey } from "@solana/web3.js";

const programId = new PublicKey("11111111111111111111111111111111");
const optionalSeed = "helloWorld";

// Loop through all bump seeds (255 down to 0)
for (let bump = 255; bump >= 0; bump--) {
  try {
    const PDA = PublicKey.createProgramAddressSync(
      [Buffer.from(optionalSeed), Buffer.from([bump])],
      programId
    );
    console.log("bump " + bump + ": " + PDA);
  } catch (error) {
    console.log("bump " + bump + ": " + error);
  }
}


/*
bump 255: Error: Invalid seeds, address must fall off the curve
bump 254: 46GZzzetjCURsdFPb7rcnspbEMnCBXe9kpjrsZAkKb6X
bump 253: GBNWBGxKmdcd7JrMnBdZke9Fumj9sir4rpbruwEGmR4y
bump 252: THfBMgduMonjaNsCisKa7Qz2cBoG1VCUYHyso7UXYHH
bump 251: EuRrNqJAofo7y3Jy6MGvF7eZAYegqYTwH2dnLCwDDGdP
bump 250: Error: Invalid seeds, address must fall off the curve
...
// remaining bump outputs
*/ // expected output ^^^^^^^^
