require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

const {ALCHEMY_API_KEY, RINKEBY_PRIVATE_KEY} = process.env;

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    },
  },
};