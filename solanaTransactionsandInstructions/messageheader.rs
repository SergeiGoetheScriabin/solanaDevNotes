pub struct MessageHeader {
    /// The # of signatures needed for a method to be considered valid...
    /// The signers of those signatures must match the first 'num_required_signatures' of [`Message::account_keys`].

    pub num_required_signatures: u8,

    /// The last `num_read_only_signed_accounts` of the signed keys are read only accounts.

    pub num_readonly_signed_accounts: u8,

    /// The last `num_readonly_unsigned_accounts` of the unsigned keys are read-only accounts

    pub num_readonly_unsigned_accounts: u8,
}
