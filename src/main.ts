import "./style.css";

import {
  ProxyProvider,
  NetworkConfig,
  SmartContract,
  Address,
  ContractFunction,
  AddressValue,
} from "@elrondnetwork/erdjs/out-browser/erdjs";

import BigNumber from "bignumber.js";
import { Buffer } from "buffer";

const test = async () => {
  let provider = new ProxyProvider("https://devnet-gateway.elrond.com");
  await NetworkConfig.getDefault().sync(provider);

  const minGasPrice = NetworkConfig.getDefault().MinGasPrice.valueOf();
  const chainId = NetworkConfig.getDefault().ChainID.valueOf();

  // Custom query for tests, the smart contract actually exists on the devnet
  const contract = new SmartContract({
    address: new Address(
      "erd1qqqqqqqqqqqqqpgqn8u7897v7jydzyr6fg65g9sadu9q5nz0p4xsf0hjnw"
    ),
  });

  // Query for getLockTime value for specific address
  const result = await contract.runQuery(provider, {
    func: new ContractFunction("getLockTime"), // gets lock time in unix timestamp number
    args: [
      new AddressValue(
        new Address(
          "erd1ckzzcajascg53x709ut9ld7kaf4jwz25y7w046467hectc7zp0zqymjlmf"
        )
      ),
    ],
  });

  const hexVal = Buffer.from(result?.returnData?.[0], "base64").toString("hex");
  const number = new BigNumber(hexVal, 16).toNumber();
  const lockDate = new Date(number * 1000);

  return {
    minGasPrice,
    chainId,
    lockDate,
  };
};

test().then(({ minGasPrice, chainId, lockDate }) => {
  const app = document.querySelector<HTMLDivElement>("#app")!;

  app.innerHTML = `
  <h1>Hello Vite!</h1>
  <p>Some test data from <a href="https://elven-piggy-bank.netlify.app/">elven-piggy-bank.netlify.app</a> smart contract:</p>
  <p>Min gas price: <strong>${minGasPrice}</strong> | Chain Id: <strong>${chainId}</strong></p>
  <p>Lock date: <strong>${lockDate}</strong></p>
`;
});
