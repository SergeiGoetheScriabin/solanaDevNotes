pub struct Instruction {
    /// pubkey of the program that executes this instruction
    pub program_id: Pubkey,
    
    /// metadata describing accounts that should be passed to the program.
    pub accounts: Vec<AccountMeta>,

    /// opaque data passed to the program for its own interpretation.

    pub data: Vec<u8>,
}
