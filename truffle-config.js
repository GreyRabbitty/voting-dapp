// const path = require("path");
// const HDWallentProvider = require("@truffle/hdwallet-provider");
// require("dotenv").config();

// module.exports = {
//   // See <http://truffleframework.com/docs/advanced/configuration>
//   // to customize your Truffle configuration!
//   //contracts_build_directory: path.join(__dirname, "client/contracts-deployment"),
//   contracts_build_directory: path.join(__dirname, "client/src/contracts"),

//   networks: {
//     develop: {
//       port: 7545
//     },
//     rinkeby: {
//       provider: () =>
//         new HDWallentProvider(
//           process.env.MNEMONIC,
//           `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
//         ),
//       network_id: 4
//     }
//   }
// };

// To test Ganache

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Ganache's default host
      port: 7545,        // Ganache's default port
      network_id: "*",   // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.7", // Specify your desired Solidity compiler version
    },
  },
};
