import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [hashedKey, setHashedKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        hashedKey={hashedKey}
        setHashedKey={setHashedKey}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} hashedKey={hashedKey} />
    </div>
  );
}

export default App;
