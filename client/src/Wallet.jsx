import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { sha256 } from "ethereum-cryptography/sha256";

function Wallet({ address, setAddress, balance, setBalance, hashedKey, setHashedKey }) {
  async function onChange(evt) {
    let hashedKey = evt.target.value;
    setHashedKey(hashedKey);

    const PRIVATE_KEYS = [
      // hash 649140ac608bba19b2917b0afa45f7ced7004d3673213dbc45280fdfcaaf4bb1
      "7cc18af139bc37d8ead847eaa0838017953501a8474319f56e570dae168255b3",
      // hash 9bec6eb2b5211ef447b90e27c4acb766371835438b4cd1cbedd50ce690e00460
      "a15e54dbfe2e6e8f273fdc78bd975315a7981a2ccf6a18a5aa75d1b7a3c9700f",
      // hash 660a70395638115aa0b00717bd9df63f9ce6e5857d596f4e4b35bbeed68a9dcb
      "c72ebe9da22f1e0e763d8cbb51cef2fe1c4642433d7f493ae4ddd115767496d1"
    ];
    
    const privateKey = PRIVATE_KEYS.find(x => toHex(sha256(utf8ToBytes(x))) === hashedKey);

    // takes public key, hex and slice to make short address
    const address = "0x" + toHex(secp.getPublicKey(privateKey).slice(1).slice(-20));
    setAddress(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Hashed Key
        <input placeholder="Type your HASHED private key" value={hashedKey} onChange={onChange}></input>
      </label>

      <label>
        Wallet Address: {address}
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;