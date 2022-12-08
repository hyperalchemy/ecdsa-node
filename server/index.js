const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

// Test keys generated with scripts/generate.js
const balances = {
    // Private Key:  7cc18af139bc37d8ead847eaa0838017953501a8474319f56e570dae168255b3
    // Public Key: 0486d15a9eddf0cf31842d0276c636c881bb1057ba433a16fb10b44b0be68e7a3c0fc888ff6ab80f8beb933e884b00ac92a6de744d7b9b35ee849d095b3089b6a8
    "0x4b00ac92a6de744d7b9b35ee849d095b3089b6a8": 100,
    // Private Key:  a15e54dbfe2e6e8f273fdc78bd975315a7981a2ccf6a18a5aa75d1b7a3c9700f
    // Public Key: 04978981ccfcfae76c178cf3290869716bf4f6c54605c7f7ca8c16b69f15b77081898508786ce30d956e2a2932817eca1e7043c2411ae41c405db17b59d82f9922
    "0x817eca1e7043c2411ae41c405db17b59d82f9922": 50,
    // Private Key:  c72ebe9da22f1e0e763d8cbb51cef2fe1c4642433d7f493ae4ddd115767496d1
    // Publich Key: 047fe1ba6ed195cd9a032abbd3aa162a3dc418b288bf9dc4e493bc8578d8674d7c097b677c6ea761bd1760eba1fdcdf2e7141889845e8a9d207046c6b9fcbf4447
    "0xfdcdf2e7141889845e8a9d207046c6b9fcbf4447": 75,
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
        return;
    }

    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}