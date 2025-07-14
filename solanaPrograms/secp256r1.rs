struct Secp256r1SignatureOffsets {
    signature_offset: u16,             // offset to compact secp256r1 signature of 64 bytes
    signature_instruction_index: u16,  // instruction index to find signature
    public_key_offset: u16,            // offset to compressed public key of 33 bytes
    public_key_instruction_index: u16, // instruction index to find public key
    message_data_offset: u16,          // offset to start of message data
    message_data_size: u16,            // size of message data
    message_instruction_index: u16,    // index of instruction data to get message data
}


/// psuedo code for signature verification

/*
process_instruction() {
    if data.len() < SIGNATURE_OFFSETS_START {
        return Error
    }

    num_signatures = data[0] as usize
    if num_signatures == 0 || num_signatures > 8 {
        return Error
    }

    expected_data_size = num_signatures * SIGNATURE_OFFSETS_SERIALIZED_SIZE + SIGNATURE_OFFSETS_START
    if data.len() < expected_data_size {
        return Error
    }

    for i in 0..num_signatures {
        offsets = parse_signature_offsets(data, i)

        signature = get_data_slice(data, instruction_datas, offsets.signature_instruction_index, offsets.signature_offset, SIGNATURE_SERIALIZED_SIZE)

        if s > half_curve_order {
            return Error
        }

        pubkey = get_data_slice(data, instruction_datas, offsets.public_key_instruction_index, offsets.public_key_offset, COMPRESSED_PUBKEY_SERIALIZED_SIZE)

        message = get_data_slice(data, instruction_datas, offsets.message_instruction_index, offsets.message_data_offset, offsets.message_data_size)

        if !verify_signature(signature, pubkey, message) {
            return Error
        }
    }

    return Success
}
*/
