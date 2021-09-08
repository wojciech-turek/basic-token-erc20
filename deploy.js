const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const path = require("path");
const fs = require("fs");
const { exit } = require("process");

const ENDPOINT_INFURA =
  "https://rinkeby.infura.io/v3/9c38c0f8900e4335a68282d4a29af940";

const provider = new HDWalletProvider(
  "hawk nephew cactus cement vague sample matrix face tragic spread mind much",
  ENDPOINT_INFURA
);

const web3 = new Web3(provider);

const abiPath = path.resolve(__dirname, "bin", "BasicToken.abi");
const abi = fs.readFileSync(abiPath, "utf-8");

const bytecodePath = path.resolve(__dirname, "bin", "BasicToken.bin");
const bytecode = fs.readFileSync(bytecodePath, "utf-8");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying from: ", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({
      data: bytecode,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
  console.log("Contract deployed to address: ", result.options.address);
  exit(0);
};

deploy();
