const assert = require('assert');
const { ENGINE_METHOD_CIPHERS } = require('constants');
const Web3 = require('web3');

const {abiJSON,bytecode} = require('../scripts/compile.js');

const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
const web3 = new Web3(provider);

let accounts;
let account_1;
let account_2;
let companyContract;

beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();
    account_1 = accounts[0];
    account_2 = accounts[1];
    companyContract = await new web3.eth.Contract(abiJSON)
    .deploy({data: "0x"+bytecode})
    .send({from: account_1, gas: 1000000});
});

describe('Cell Phone Company Contract', async() => {
    // it('Should deploy', () => {
    //     assert.ok(companyContract.options.address);
    // });

    // it('Should include a valid customer', async () =>{
    //     let name = 'Joao Kuntz';
    //     try{
    //     await companyContract.methods.enrollCustomer(name)
    //         .send({from: account_1, gas: 1000000})
    //     }
    //     catch(e){
    //         console.log(e);
    //     }
    // });

    // it('Should return a valid customer', async () =>{
    //     let name = 'Joao Kuntz';
    //     await companyContract.methods
    //         .enrollCustomer(name)
    //         .send({from: account_1, gas: 1000000})

    //     let customer = await companyContract.methods
    //         .getEnrolledCustomerByAddress(account_1)
    //         .call();

    //     assert.strictEqual(customer[0], name);       
    // });

    // it('Should return the default values when the customer is not found', async () =>{
    //     let customer = await companyContract.methods
    //         .getEnrolledCustomerByAddress(account_2)
    //         .call();

    //     assert.strictEqual(customer[0], '');
    //     assert.strictEqual(customer[1], '0');         
    // });

    // it('Should not include a customer with an invalid name', async () =>{
    //     let name = '';
    //     try{
    //         await companyContract.methods.enrollCustomer(name)
    //             .send({from: account_1, gas: 1000000})
    //         assert.fail('Must have thrown an exception');
    //     }
    //     catch(e){
    //     }
    // });

    // it('Should include more than one user from different addresses', async () =>{
    //     let name1 = 'Joao Kuntz';

    //     let name2 = 'Maria Kuntz';

    //     try{  
    //         await companyContract.methods.enrollCustomer(name1)
    //             .send({from: account_1, gas: 1000000});

    //         await companyContract.methods.enrollCustomer(name2)
    //             .send({from: account_2, gas: 1000000})
    //     }
    //     catch(e){
    //         assert.fail('Must not have thrown an exception');
    //     }
    // });

    // it('Should not include more than one customer from the same address', async () =>{
    //     let name1 = 'Joao Kuntz';

    //     let name2 = 'Maria Kuntz';

    //     try{
    //         await companyContract.methods.enrollCustomer(name1)
    //             .send({from: account_1, gas: 1000000});

    //         await companyContract.methods.enrollCustomer(name2)
    //             .send({from: account_2, gas: 1000000})
                
    //         assert.fail('Must have thrown an exception');
    //     }
    //     catch(exception){
    //     }
    // });


    // it('Should pay the monthly bill and earn a loyalty point', async () =>{
    //     let name = 'Joao Kuntz';
    //     let accountTotal = 2;
        
    //     await companyContract.methods.enrollCustomer(name)
    //         .send({from: account_1, gas: 1000000});

    //     await companyContract.methods
    //         .payMonthlyBilling(accountTotal)
    //         .send({from: account_1, gas: 1000000, value: 2});

    //     await companyContract.methods
    //         .payMonthlyBilling(accountTotal)
    //         .send({from: account_1, gas: 1000000, value: 2});

    //     await companyContract.methods
    //         .payMonthlyBilling(accountTotal)
    //         .send({from: account_1, gas: 1000000, value: 2});

    //     let customer = await companyContract.methods
    //         .getEnrolledCustomerByAddress(account_1)
    //         .call();

    //     assert.strictEqual(customer[1], '3');

    // });

    // it('Should pay the monthly bill and change contract balance', async () =>{
    //     let name = 'Joao Kuntz';
    //     let accountTotal = 2;
        
    //     await companyContract.methods.enrollCustomer(name)
    //         .send({from: account_1, gas: 1000000});

    //     await companyContract.methods
    //         .payMonthlyBilling(accountTotal)
    //         .send({from: account_1, gas: 1000000, value: 2});

    //     await companyContract.methods
    //         .payMonthlyBilling(accountTotal)
    //         .send({from: account_1, gas: 1000000, value: 2});

    //     await companyContract.methods
    //         .payMonthlyBilling(accountTotal)
    //         .send({from: account_1, gas: 1000000, value: 2});

    //     let totalBalance = await companyContract.methods
    //         .getContractBalance()
    //         .call({from: account_1, gas: 1000000});
        
    //     assert.strictEqual(totalBalance,'6');

    // });

    // it('Method should not be executed by a third party', async () =>{
    //    try {
    //         let name = 'Joao Kuntz';
    //         let accountTotal = 2;
            
    //         await companyContract.methods.enrollCustomer(name)
    //             .send({from: account_1, gas: 1000000});

    //         await companyContract.methods
    //             .payMonthlyBilling(accountTotal)
    //             .send({from: account_1, gas: 1000000, value: 2});

    //         let totalBalance = await companyContract.methods
    //             .getContractBalance()
    //             .call({from: account_2, gas: 1000000});
            
    //         assert.fail("Must have thrown an exception");
    //    }
    //    catch(exception){
           
    //    }
    // });

    // it('Should exchange points by goods', async () =>{
    //     let name = 'Joao Kuntz';
    //     let accountTotal = 2;
             
    //     await companyContract.methods.enrollCustomer(name)
    //         .send({from: account_1, gas: 1000000});

    //     await companyContract.methods
    //         .payMonthlyBilling(accountTotal)
    //         .send({from: account_1, gas: 1000000, value: 2});
            
    //     await companyContract.methods
    //         .payMonthlyBilling(accountTotal)
    //         .send({from: account_1, gas: 1000000, value: 2});

    //     await companyContract.methods
    //         .payMonthlyBilling(accountTotal)
    //         .send({from: account_1, gas: 1000000, value: 2});
       
    //     await companyContract.methods
    //         .exchangeCustomerPointsByProduct(0)
    //         .send({from: account_1, gas: 1000000});
        
    //     let customer = await companyContract.methods
    //         .getEnrolledCustomerByAddress(account_1)
    //         .call();

    //     assert.strictEqual(customer[1], '1');
    // }); 
    
    // it('Should thrown an error when exchanging points by goods of higher value', async () =>{
    //     try{
    //         let name = 'Joao Kuntz';
    //         let accountTotal = 2;
                
    //         await companyContract.methods.enrollCustomer(name)
    //             .send({from: account_1, gas: 1000000});

    //         await companyContract.methods
    //             .payMonthlyBilling(accountTotal)
    //             .send({from: account_1, gas: 1000000, value: 2});
                
    //         await companyContract.methods
    //             .payMonthlyBilling(accountTotal)
    //             .send({from: account_1, gas: 1000000, value: 2});

    //         await companyContract.methods
    //             .payMonthlyBilling(accountTotal)
    //             .send({from: account_1, gas: 1000000, value: 2});
        
    //         await companyContract.methods
    //             .exchangeCustomerPointsByProduct(2)
    //             .send({from: account_1, gas: 1000000});
            
    //         assert.fail("Must have thrown an exception");
    //     }
    //     catch(exception){
    //     }
    // });

    it('Should transfer money to another address', async () =>{
        try{
            let name1 = 'Joao Kuntz';
            let name2 = 'Maria Kuntz'
            let accountTotal = 2;
                
            await companyContract.methods.enrollCustomer(name1)
                .send({from: account_1, gas: 1000000});

            await companyContract.methods.enrollCustomer(name2)
                .send({from: account_2, gas: 1000000});

            await companyContract.methods
                .payMonthlyBilling(accountTotal)
                .send({from: account_1, gas: 1000000, value: 2});
                
            await companyContract.methods
                .payMonthlyBilling(accountTotal)
                .send({from: account_1, gas: 1000000, value: 2});

            await companyContract.methods
                .transferToAccount(account_1, 4)
                .send({from: account_1, gas: 1000000, value:10});
        }
        catch(exception){
            console.log(exception)
        }
    });
});
