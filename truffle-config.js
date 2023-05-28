require('dotenv').config();
//const { MNEMONIC, PROJECT_ID } = process.env;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  networks: {

    // development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
    //  network_id: "*",       // Any network (default: none)
    // },
    
    sepolia: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "wss://eth-sepolia.g.alchemy.com/v2/C9Tf7MZL90IAwLu97ZIIoS2uHiFLa4Kw"),
      network_id: 11155111,       // Sepolia's id
      chain_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      networkCheckTimeout: 10000,
      timeOutBlocks: 200,
      skipDryRun: true
    },

      goerli: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "wss://eth-goerli.g.alchemy.com/v2/0c2g8SypQOv-P0eNvKs4dsn_aktXBm9U"),
      network_id: 5,
      gas: 5500000,
      confirmations: 2,
      networkCheckTimeout: 10000,
      timeOutBlocks: 200,
      skipDryRun: true
    }
    
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
     timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
       }
    }
  },

  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
