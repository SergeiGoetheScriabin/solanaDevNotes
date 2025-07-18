import {
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    Keypair
} from "@solana/web3.js";


const sender = Keypair.generate();
const recipient = new Keypair();

const transferAmount = 0.01; // 0.01 SOL


const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient.publicKey,
    lamports: transferAmount * LAMPORTS_PER_SOL
    });

console.log(JSON.stringify(transferInstruction, null, 2));
