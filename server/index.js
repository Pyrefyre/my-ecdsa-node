const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const privateKey = {
  1: "a30f792ec9873d4877e9e54e7093c5875310ab66dfdbbe9e568d542e238e3603",
  2: "df6d68f52ba64864bd1eb88b00fdb246dba3e008cf2fc87888084de390340668",
  3: "80827a92f1d09d3f454534f3d30bfbdee04b4b9f58a2d9e0f17053dea5b29037",
};

const balances = {
  "0448a38d5c1651562265e5d7806b2305868efb2c789933a701628cabcaf305e03aef26f03371e5e85a7f77cac6ce6a431deee5db3e384703e288bd3c528ad628d7": 100,
  "04ca4ce815797e085b399fb1912bd353c2e86464f8e6a641181979b7cc563a30ef8aca4ced390903513799d2bd607417915e34a4ae6976675a599bc1717b06c1d0": 50,
  "0413aa9036e58628ec1ba68da917321d2ae1a16dddb5a854c307b8b5b3fbab32c47557f22b75ddc34704d6d3340137aa31bc2fea77720e3278acc611ada88a54cc": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //TODO: get a signature from the client-side application
  // recover the public address from the signature

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

module.exports = {
  private_key: privateKey,
};
