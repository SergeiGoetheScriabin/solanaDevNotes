pub struct AccountMeta {
    pub pubkey: Pubkey, /// account public key
    pub is_signer: bool, /// True if an instruction rquires a transaction with the sig matching 'pubkey'
    pub is_writable: bool, /// True if the account data or meta data may be mutated during the program execution.
}
