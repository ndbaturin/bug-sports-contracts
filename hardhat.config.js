require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const MNEMONIC = process.env.MNEMONIC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ACCOUNTS = MNEMONIC ? { "mnemonic": MNEMONIC } : [PRIVATE_KEY];

task("deploy-test", "Deploys Bugs contract for testing")
  .addParam("uri", "The metadata URI all tokens will share")
  .setAction(async (taskArgs) => {
    await hre.run('compile');

    const uri = taskArgs.uri;

    const Bugs = await ethers.getContractFactory("Bugs");
    const bugs = await Bugs.deploy(uri);
    await bugs.deployTransaction.wait()

    console.log("Bugs deployed to:", bugs.address);
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      url: process.env.GOERLI_URL || "none",
      accounts: ACCOUNTS,
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
