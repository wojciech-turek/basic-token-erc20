const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "contract", "BasicToken.sol");

const source = fs.readFileSync(contractPath, "utf-8");

let input = {
  language: "Solidity",
  sources: {
    "BasicToken.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const tokenContract = output.contracts["BasicToken.sol"]["BasicToken"];
const dirName = "bin";

const contractByteCodePath = path.join(dirName, "BasicToken.bin");
fs.writeFileSync(contractByteCodePath, tokenContract.evm.bytecode.object);

const contractAbiPath = path.join(dirName, "BasicToken.abi");
fs.writeFileSync(contractAbiPath, JSON.stringify(tokenContract.abi));
