import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [secretMessage, setSecretMessage] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        signature={signature}
        setSignature={setSignature}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        secretMessage={secretMessage}
        setSecretMessage={setSecretMessage}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
