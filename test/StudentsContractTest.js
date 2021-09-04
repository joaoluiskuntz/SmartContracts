// const assert = require('assert');
// const Web3 = require('web3');

// const {abiJSON,bytecode} = require('../scripts/compile.js');

// const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
// const web3 = new Web3(provider);

// let accounts;
// let account_1;
// let account_2;
// let studentsContract;

// beforeEach(async()=>{
//     accounts = await web3.eth.getAccounts();
//     account_1 = accounts[0];
//     account_2 = accounts[1];
//     studentsContract = await new web3.eth.Contract(abiJSON)
//     .deploy({data: "0x"+bytecode})
//     .send({from: account_1, gas: 1000000});
// });

// describe('Students Contract', async() => {
//     it('Should deploy', () => {
//         assert.ok(studentsContract.options.address);
//     });

//     it('Should include a valid student', async () =>{
//         let name = 'Joao Kuntz';
//         let age = 36;
//         await studentsContract.methods.enrollStudent(name, age)
//             .send({from: account_1, gas: 1000000})
//     });

//     it('Should return a valid student', async () =>{
//         let name = 'Joao Kuntz';
//         let age = 36;
//         await studentsContract.methods
//             .enrollStudent(name, age)
//             .send({from: account_1, gas: 1000000})

//         let student = await studentsContract.methods
//             .getEnrolledStudentByAddress(account_1)
//             .call();

//         assert.strictEqual(student[0], name);
//         assert.strictEqual(student[1], age.toString());        
//     });

//     it('Should return the default values when the student is not found', async () =>{
//         let student = await studentsContract.methods
//             .getEnrolledStudentByAddress(account_2)
//             .call();

//         assert.strictEqual(student[0], '');
//         assert.strictEqual(student[1], '0');         
//     });

//     it('Should not include a student with an invalid name', async () =>{
//         let name = '';
//         let age = 36;
//         try{
//             await studentsContract.methods.enrollStudent(name, age)
//                 .send({from: account_1, gas: 1000000})
//             assert.fail('Must have thrown an exception');
//         }
//         catch(e){
//         }
//     });

//     it('Should not include a student with an invalid age', async () =>{
//         let name = 'Joao Kuntz';
//         let age = 0;
//         try{
//             await studentsContract.methods.enrollStudent(name, age)
//                 .send({from: account_1, gas: 1000000})
//             assert.fail('Must have thrown an exception');
//         }
//         catch(exception){
//         }
//     });

//     it('Should include more than one user from different addresses', async () =>{
//         let name1 = 'Joao Kuntz';
//         let age1 = 36;

//         let name2 = 'Maria Kuntz';
//         let age2 = 63;
//         try{  
//             await studentsContract.methods.enrollStudent(name1, age1)
//                 .send({from: account_1, gas: 1000000});

//             await studentsContract.methods.enrollStudent(name2, age2)
//                 .send({from: account_2, gas: 1000000})
//         }
//         catch(e){
//             assert.fail('Must not have thrown an exception');
//         }
//     });

//     it('Should not include more than one user from the same address', async () =>{
//         let name1 = 'Joao Kuntz';
//         let age1 = 36;

//         let name2 = 'Maria Kuntz';
//         let age2 = 63;

//         try{
//             await studentsContract.methods.enrollStudent(name1, age1)
//                 .send({from: account_1, gas: 1000000});

//             await studentsContract.methods.enrollStudent(name2, age2)
//                 .send({from: account_2, gas: 1000000})
                
//             assert.fail('Must have thrown an exception');
//         }
//         catch(exception){
//         }
//     });
// });

