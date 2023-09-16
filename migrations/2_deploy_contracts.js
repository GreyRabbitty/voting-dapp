const DappStateContract = artifacts.require("DappState.sol");
const DappContract = artifacts.require("../contracts/Election.sol");
const fs = require('fs');

module.exports = function (deployer) {

    deployer
        .deploy(DappStateContract)
        .then(() => {
            return deployer.deploy(DappContract, DappStateContract.address);
        });
}
