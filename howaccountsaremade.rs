/// a solana account holds lamports, optional program data, and metadata
pub struct Account {
    /// number of lamports (1 sol = 1_000_000_000 lamports)
    pub lamports: u64,

    /// raw account data, used by programs to store state
    /// if serde is enabled, this will serialize as raw bytes instead of a number array
    #[cfg_attr(feature = "serde", serde(with = "serde_bytes"))]
    pub data: Vec<u8>,

    /// public key of the program that owns this account
    /// if the account is executable, this program can run the code in `data`
    pub owner: Pubkey,

    /// true if this account holds executable code
    /// once marked executable, the account becomes read-only
    pub executable: bool,

    /// the period when this account will next owe rent
    pub rent_epoch: Epoch,
}

