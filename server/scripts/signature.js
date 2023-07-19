const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex, hexToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { private_key } = require("../index");

function hashMessage(message) {
  const theBytes = utf8ToBytes(message);
  const theHash = keccak256(theBytes);
  return theHash;
}

async function signMessage(msg, private_key) {
  const theHash = hashMessage(msg);
  const signature = await secp.sign(theHash, private_key, { recovered: true });
  return signature;
}

async function main() {
  const msg = "sth";
  const privateKey = "a30f792ec9873d4877e9e54e7093c5875310ab66dfdbbe9e568d542e238e3603";
  const [signature, recoveryBit] = await signMessage(msg, private_key["2"]);
  const specialSig = Uint8Array.from([...signature, recoveryBit]);
  console.log("specialSig: ", toHex(specialSig));
  process.exit(0);
}

main();
