const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractName = 'CellPhoneCompanyContract.sol';
const contractPath = path.resolve(__dirname,'../contracts', contractName);
const source = fs.readFileSync(contractPath, 'utf8');

const compilerInput = {
    language: 'Solidity',
    sources:
    {
        'CellPhoneCompanyContract.sol': 
        {
            content: source
        }
    },
    settings:
    {
        optimizer:
        {
            enabled: true
        },
        outputSelection:
        {
            '*':{
                '*':['*']
            }
        },
    }
};

const inputString = JSON.stringify(compilerInput);

const output = JSON.parse(
        solc.compile(inputString)
    );

// const contractEVM = output
//                     .contracts[contractName]
//                     .Students;

const contractEVM = output
                    .contracts[contractName]
                    .CellPhoneCompanyContract;

const abiJSON = contractEVM['abi'];
const bytecode = contractEVM['evm']['bytecode']['object'];

module.exports = {abiJSON,bytecode};