const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname,'../contracts', 'StudentsContract.sol');
const source = fs.readFileSync(contractPath, 'utf8');

let compilerInput = {
    language: 'Solidity',
    sources:
    {
        'StudentsContract.sol': 
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

const contractEVM = output
                    .contracts['StudentsContract.sol']
                    .Students;

const abiJSON = contractEVM['abi'];
const bytecode = contractEVM['evm']['bytecode']['object'];

module.exports = {abiJSON,bytecode};