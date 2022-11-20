const Utilities = require('../Utilities')
const StudentController = require('./StudentController')
const SurveyController = require('./SurveyController')
const algosdk = require('algosdk');
require('dotenv').config()


const OWNER_ADDRESS = "Y4RBOOROTIOQIFQ3EMZE2HHRZBEIWZS7D4UZKWE4L5QCUEFVIGZYKSDAGE"
const OWNER_PASSPHRASE = "birth cram relief rival box anchor rude voice film main upon film route impact goose dial cheese assist rotate melt fatigue cry genre absent dismiss"


const LOGGED_IN_STUDENT = "FMSO6KDA5MNQ4GOG5TP2SFU2XJY6G2VTW5Y5IBOMX2AGU73EHZBTTTU2XA"
const CREATOR_ACCOUNT = algosdk.mnemonicToSecretKey("river witness cover under please demise car record multiply skirt eight gossip flee law castle depend paddle sponsor force good quote toss barely above glance");


//const APP_ID = 124002380
const APP_ID = 124052787 // counter


const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';

const token = {
    'X-API-Key': process.env.PURESTAKE_API_KEY
}
const client = new algosdk.Algodv2(token, baseServer, port);


class SmartContractController {
    // READ GLOBAL STATE
    async getActiveSurvey(req, res) {

        try {
            let applicationInfoResponse = await client.getApplicationByID(APP_ID).do();
            let globalState = {}
            for (let n = 0; n < applicationInfoResponse['params']['global-state'].length; n++) {
                let var_name = Buffer.from(applicationInfoResponse['params']['global-state'][n]["key"], "base64").toString();
                let type = applicationInfoResponse['params']['global-state'][n]["value"]["type"]
                if (type == 1) {
                    globalState[var_name] = Buffer.from(applicationInfoResponse['params']['global-state'][n]["value"]["bytes"], "base64").toString()
                } else if (type == 2) {
                    globalState[var_name] = applicationInfoResponse['params']['global-state'][n]["value"]["uint"]
                }
            }
            return globalState;
        } catch (err) {
            console.log(err)
        }
    }


    async call_vote(req, res) {
        try {
            let answer = req.body.answer
            let params = await client.getTransactionParams().do();
            params.fee = 5000;
            params.flatFee = true;

            let method = ""
            if (answer == "yes") {
                method = "inc"
            } else if (answer == "no") {
                method = "dec"
            }

            //let appArgs = [new Uint8Array(Buffer.from("vote")), new Uint8Array(Buffer.from("yes"))];
            let appArgs = [new Uint8Array(Buffer.from(method))];
            let appCallTxn = algosdk.makeApplicationNoOpTxn(LOGGED_IN_STUDENT, params, APP_ID, appArgs);
            let txId = appCallTxn.txID().toString();

            // sign, send, await
            // Sign the transaction
            let signedTxn = appCallTxn.signTxn(CREATOR_ACCOUNT.sk);
            console.log("Signed transaction with txID: %s", txId);


            // Submit the transaction
            await client.sendRawTransaction(signedTxn).do();
            return txId

            // Wait for transaction to be confirmed
            // const confirmedTxn = await algosdk.waitForConfirmation(client, txId, 4);
            // Utilities.apiResponse(res, 200, "Still waiting for confirmation.", confirmedTxn)

            /*   //Get the completed Transaction
            console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);


            // display results
            console.log("Calling transaction vote on SC")
            let transactionResponse = await client.pendingTransactionInformation(appCallTxn).do();
            console.log("Called vote")

            console.log("Called app-id:", transactionResponse['txn']['txn']['apid'])
            if (transactionResponse['global-state-delta'] !== undefined) {
                console.log("Global State updated:", transactionResponse['global-state-delta']);
            }
            if (transactionResponse['local-state-delta'] !== undefined) {
                console.log("Local State updated:", transactionResponse['local-state-delta']);
            } */
        } catch (err) {
            console.log(err)
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

module.exports = new SmartContractController();