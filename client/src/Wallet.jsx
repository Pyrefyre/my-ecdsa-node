import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"
import { hexToBytes, utf8ToBytes, toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak";

function hashMessage(message) {
  const theBytes = utf8ToBytes(message);
  const theHash = keccak256(theBytes);
  return theHash;
}

async function recoverKey(message, signature, recoveryBit) {
  const theHash = hashMessage(message);
  const thePublicKey = secp.recoverPublicKey(theHash, signature, recoveryBit);
  return thePublicKey;
}

function Wallet({ address, setAddress, signature, setSignature, balance, setBalance, secretMessage, setSecretMessage }) {
  async function onChange(evt) {
    if(!secretMessage) return;
    console.log("secretMessage is: ", secretMessage)
    const sigText = evt.target.value;
    setSignature(sigText);
    const recoveryBit = hexToBytes(evt.target.value)[hexToBytes(evt.target.value).length - 1];
    const sig = hexToBytes(evt.target.value).slice(0, hexToBytes(evt.target.value).length - 1);
    const address = toHex(await recoverKey(secretMessage, sig, recoveryBit));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onChangeSecretMessage(evt) {
    setSecretMessage(evt.target.value);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Secret Message:
        <input placeholder="Your secret message if any..." value={secretMessage} onChange={onChangeSecretMessage} />
      </label>

      <label>
        EDCSA Signature
        <input placeholder="Give your signature string" value={signature} onChange={onChange}></input>
      </label>

      <div>
        Address: {address.slice(0, 10)}...
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
