struct Ed25519SignatureOffsets {
    signature_offset: u16,             // offset to ed25519 signature of 64 bytes
    signature_instruction_index: u16,  // instruction index to find signature
    public_key_offset: u16,            // offset to public key of 32 bytes
    public_key_instruction_index: u16, // instruction index to find public key
    message_data_offset: u16,          // offset to start of message data
    message_data_size: u16,            // size of message data
    message_instruction_index: u16,    // index of instruction data to get message data
}


/// psuedo code of the signature verification


/*
process_instruction() {
    for i in 0..count {
        // i'th index values referenced:
        instructions = &transaction.message().instructions
        instruction_index = ed25519_signature_instruction_index != u16::MAX ? ed25519_signature_instruction_index : current_instruction;
        signature = instructions[instruction_index].data[ed25519_signature_offset..ed25519_signature_offset + 64]
        instruction_index = ed25519_pubkey_instruction_index != u16::MAX ? ed25519_pubkey_instruction_index : current_instruction;
        pubkey = instructions[instruction_index].data[ed25519_pubkey_offset..ed25519_pubkey_offset + 32]
        instruction_index = ed25519_message_instruction_index != u16::MAX ? ed25519_message_instruction_index : current_instruction;
        message = instructions[instruction_index].data[ed25519_message_data_offset..ed25519_message_data_offset + ed25519_message_data_size]
        if pubkey.verify(signature, message) != Success {
            return Error
        }
    }
    return Success
}
*/
