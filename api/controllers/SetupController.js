const Utilities = require('../Utilities')
const StudentController = require('./StudentController')
const SurveyController = require('./SurveyController')
const SmartContractController = require('./SmartContractController')
const algosdk = require('algosdk');
require('dotenv').config()

const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';

const token = {
    'X-API-Key': process.env.PURESTAKE_API_KEY
}
const client = new algosdk.Algodv2(token, baseServer, port);


class SetupController {



    async reset(req, res) {
        try {
            await StudentController.deleteAllStudents();
            await SurveyController.deleteAllSurveys();
            await SurveyController.seedSurvey();
            await StudentController.seedStudents();

            console.log("---------------")
            console.log("About to craw SC data")
            const state = await SmartContractController.getActiveSurvey();
            console.log("received state:")
            console.log(state)

            Utilities.apiResponse(res, 200, 'Application refreshed!')
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    /* 
        async resetSmartContractState(req, res) {
            //UPDATE
            // create unsigned transaction
            const update = async (sender, index, approvalProgram, clearProgram) => {
                try {
                    let params = await client.getTransactionParams().do()
                    params.fee = 1000;
                    params.flatFee = true;
    
                    let txn = algosdk.makeApplicationUpdateTxn(OWNER_ADDRESS, params, APP_ID, approvalProgram, clearProgram);
                    // sign, send, await
                    let txId = txn.txID().toString();
                    // Sign the transaction
                    let signedTxn = txn.signTxn(creatorAccount.sk);
                    console.log("Signed transaction with txID: %s", txId);
    
                    // Submit the transaction
                    await client.sendRawTransaction(signedTxn).do()
                    // Wait for transaction to be confirmed
                    const confirmedTxn = await algosdk.waitForConfirmation(client, txId, 4);
                    console.log("confirmed" + confirmedTxn)
    
                    //Get the completed Transaction
                    console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    
                    // display results
                    let transactionResponse = await client.pendingTransactionInformation(txId).do();
                    let appId = transactionResponse['txn']['txn'].apid;
                    console.log("Updated app-id: ", appId);
                } catch (err) {
                    console.log(err)
                }
            } 
    
        }*/
}

module.exports = new SetupController();