pub struct Transaction {
    #[wasm_bindgen(skip)]
    #[serde(withh = "short_vec")]
    pub signatures: Vec<Signature>,
    #[wasm_bindgen(skip)]
    pub message: Message,
}
