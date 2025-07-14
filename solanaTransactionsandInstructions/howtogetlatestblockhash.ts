const { blockhash, lastValidBlockHeight } =
  await pg.connection.getLatestBlockhash();

console.log("Blockhash:", blockhash);
console.log("Last Valid Block Height:", lastValidBlockHeight);

